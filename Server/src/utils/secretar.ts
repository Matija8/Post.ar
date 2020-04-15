import { KeyStore } from "./key-store";
import { Logger } from "./logger";

const crypto = require("crypto");

class SecretarModel {

    private logger = new Logger("secretar");

    encrypt(data: any) {
        try {
            data = JSON.stringify(data);

            const secret = crypto.randomBytes(16).toString("hex");
                
            const cipher = crypto.createCipher("aes256", secret);
            let encrypted = cipher.update(data, "utf8", "hex");
            encrypted += cipher.final("hex");
    
            // encrypt secret
            const superSecret = crypto.publicEncrypt(KeyStore.publicKey, Buffer.from(secret))
                                      .toString("hex");
            
            // create signature
            const sign = crypto.createSign("RSA-SHA256");
            sign.update(data);
            const signature = sign.sign(KeyStore.privateKey, "hex");

            return { data: encrypted, secret: superSecret, hash: signature };
        } catch (err) {
            this.logger.fatal(err);
            return undefined;
        }
    }

    decrypt(data: string, secret: string, hash: string) {
        let aesSecret = crypto.privateDecrypt(KeyStore.privateKey, Buffer.from(secret, "hex")).toString();

        const decipher = crypto.createDecipher("aes256", aesSecret);
        let decrypted = decipher.update(data, "hex", "utf8");
        decrypted += decipher.final("utf8");

        const verifier = crypto.createVerify("SHA256");
        verifier.update(data);
        verifier.end();

        try {
            decrypted = JSON.parse(decrypted);
        } catch (err) {
            this.logger.fatal(err);
            return undefined;
        }

        return verifier.verify(KeyStore.publicKey, hash, "hex") ? decrypted : undefined;
    }

}

export const secretar = new SecretarModel();
