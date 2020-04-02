import { KeyStore } from "./KeyStore";

const crypto = require("crypto");

class SecretarModel {

    crypt(data: any) {
        const secret = crypto.randomBytes(16).toString("base64");
            
        const cipher = crypto.createCipher("aes256", secret);
        let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
        encrypted += cipher.final("base64");

        // Encrypt secret
        const superSecret = crypto.publicEncrypt(KeyStore.publicKey, Buffer.from(secret))
                                  .toString("base64");
        
        // Create signature
        const sign = crypto.createSign("RSA-SHA256");
        sign.update(JSON.stringify(data));
        const signature = sign.sign(KeyStore.privateKey, "base64");

        return { data: encrypted, hash: signature, secret: superSecret };
    }

}

export const secretar = new SecretarModel();
