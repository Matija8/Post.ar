import { KeyStore } from "./KeyStore";

const crypto = require("crypto");

class SecretarModel {

    crypt(data: any) {
        const secret = crypto.randomBytes(16).toString("hex");
            
        const cipher = crypto.createCipher("aes256", secret);
        let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
        encrypted += cipher.final("hex");

        // Encrypt secret
        const superSecret = crypto.publicEncrypt(KeyStore.publicKey, Buffer.from(secret))
                                  .toString("hex");
        
        // Create signature
        const sign = crypto.createSign("RSA-SHA256");
        sign.update(JSON.stringify(data));
        const signature = sign.sign(KeyStore.privateKey, "hex");

        return { data: encrypted, hash: signature, secret: superSecret };
    }

}

export const secretar = new SecretarModel();
