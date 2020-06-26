import { KeyStore } from "./key-store";
import { Logger } from "./logger";

const crypto = require("crypto");

class SecretarModel {

    private logger = new Logger("secretar");

    private messageKey = "";
    private messageIv = "";

    encrypt(data: any) {
        try {
            data = JSON.stringify(data);

            const key = crypto.randomBytes(32);
            const iv = crypto.randomBytes(16);
                
            const cipher = crypto.createCipheriv("aes-256-cfb", key, iv);
            let encrypted = cipher.update(data, "utf8", "hex");
            encrypted += cipher.final("hex");
    
            // encrypt key
            const keyData = JSON.stringify({
                key: key.toString("hex"),
                iv:  iv.toString("hex") 
            });
            const superSecret = crypto.publicEncrypt(KeyStore.publicKey, Buffer.from(keyData))
                                      .toString("hex");
            
            // hash message
            const hash = crypto.createHash("sha256");
            hash.update(data);
            
            const hashedData = hash.digest("hex");
            
            // sign message hash
            const sign = crypto.createSign("RSA-SHA256");
            sign.update(hashedData);
            const signature = sign.sign(KeyStore.privateKey, "hex");

            return { data: encrypted, secret: superSecret, hash: signature };
        } catch (err) {
            this.logger.fatal("failed to encrypt data", err);
            return undefined;
        }
    }

}

export const secretar = new SecretarModel();
