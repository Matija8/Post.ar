import { KeyStore } from "./key-store";
import { Logger } from "./logger";

const crypto = require("crypto");

class SecretarModel {

    private logger = new Logger("secretar");

    private messageKey = "479454858e441ebac5d1c584034ed36be0cc2ebe6cd1ce35d43fec6f32dc0eb8";
    private messageIv = "fdd9db491f504b48f0be56b21872293b";

    private cipherAlgorithm = "aes-256-cfb";
    private hashAlgorithm = "RSA-SHA256";

    encryptResponseData(data: any) {
        try {
            data = JSON.stringify(data);

            const key = crypto.randomBytes(32);
            const iv = crypto.randomBytes(16);
                
            const cipher = crypto.createCipheriv(this.cipherAlgorithm, key, iv);
            let encrypted = cipher.update(data, "utf8", "hex");
            encrypted += cipher.final("hex");
    
            // encrypt key
            const keyData = JSON.stringify({
                key: key.toString("hex"),
                iv: iv.toString("hex") 
            });

            const superSecret = crypto.publicEncrypt(KeyStore.publicKey, Buffer.from(keyData))
                                      .toString("hex");
            
            // hash message
            const hash = crypto.createHash(this.hashAlgorithm);
            hash.update(data);
            
            const hashedData = hash.digest("hex");
            
            // sign message hash
            const sign = crypto.createSign(this.hashAlgorithm);
            sign.update(hashedData);
            const signature = sign.sign(KeyStore.privateKey, "hex");

            return { data: encrypted, secret: superSecret, hash: signature };
        } catch (err) {
            this.logger.fatal("failed to encrypt response data", err);
            return undefined;
        }
    }

    encryptMessage(message: string): string | undefined {
        try {
            const key = Buffer.from(this.messageKey, "hex");
            const iv = Buffer.from(this.messageIv, "hex");

            const cipher = crypto.createCipheriv(this.cipherAlgorithm, key, iv);
            let encrypted = cipher.update(message, "utf8", "base64");
            encrypted += cipher.final("base64");
                    
            console.log(encrypted);

            const decipher = crypto.createDecipheriv(this.cipherAlgorithm, key, iv);
            let decrypted = decipher.update(encrypted, "base64", "utf8");
            decrypted += decipher.final("utf8");

            console.log(decrypted);

            return encrypted;
        } catch (err) {
            this.logger.fatal("failed to encrypt message", err);
            return undefined;
        }
    }

    decryptMessage(message: string): string | undefined {
        try {
            const key = Buffer.from(this.messageKey, "hex");
            const iv = Buffer.from(this.messageIv, "hex");
            
            const decipher = crypto.createDecipheriv(this.cipherAlgorithm, key, iv);
            let decrypted = decipher.update(message, "base64", "utf8");
            decrypted += decipher.final("utf8");

            return decrypted;
        } catch (err) {
            this.logger.fatal("failed to decrypt message", err);
            return undefined;
        }
    }
}

export const secretar = new SecretarModel();
