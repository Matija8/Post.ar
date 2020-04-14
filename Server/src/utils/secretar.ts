import { KeyStore } from "./key-store";
import { Logger } from "./logger";

const crypto = require("crypto");

class SecretarModel {

    private logger = new Logger("secretar");

    crypt(data: any) {
        try {
            const secret = crypto.randomBytes(16).toString("hex");
                
            const cipher = crypto.createCipher("aes256", secret);
            let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
            encrypted += cipher.final("hex");
    
            // encrypt secret
            const superSecret = crypto.publicEncrypt(KeyStore.publicKey, Buffer.from(secret))
                                      .toString("hex");
            
            // create signature
            const sign = crypto.createSign("RSA-SHA256");
            sign.update(JSON.stringify(data));
            const signature = sign.sign(KeyStore.privateKey, "hex");
    
            return { data: encrypted, hash: signature, secret: superSecret };
        } catch (err) {
            this.logger.fatal(err);
            return undefined;
        }
    }

}

export const secretar = new SecretarModel();
