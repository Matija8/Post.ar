import { Injectable } from '@angular/core';

import { pki, util, cipher, md as forgeMd } from 'node-forge';

import PrivateKey from 'src/keys/private.json';
import PublicKey from 'src/keys/public.json';

@Injectable({
  providedIn: 'root'
})
export class SecretarService {

  constructor() { }

  private readonly key = 'c1a43b1211a152874b90e51964da011a73a370be0599f31773220b831e83e61b';
  private readonly iv  = 'df20508a1626a997fa3e3510d74bb596';

  decryptAndVerify(data: string, secret: string, hash: string) {
    try {
      const pk = pki.decryptRsaPrivateKey(PrivateKey.key, PrivateKey.passphrase);
      const key = JSON.parse(pk.decrypt(util.hexToBytes(secret), 'RSA-OAEP'));

      const decipher = cipher.createDecipher('AES-CFB', util.hexToBytes(key.key));
      decipher.start({ iv: util.hexToBytes(key.iv) });
      decipher.update(util.createBuffer(util.hexToBytes(data)));
      decipher.finish();
      const decrypted = JSON.parse(decipher.output.toString());

      const publicKey = pki.publicKeyFromPem(PublicKey.key);

      const md = forgeMd.sha256.create();
      md.update(decipher.output.toString());

      const result = publicKey.verify(
        md.digest().getBytes(),
        util.hexToBytes(hash)
      );

      return result ? decrypted : undefined;
    } catch (err) {
      return undefined;
    }
  }

  encryptMessage(message: any): string | undefined {
    try {
      message = JSON.stringify(message);

      const mesageCipher = cipher.createCipher('AES-CFB', util.hexToBytes(this.key));
      mesageCipher.start({ iv: util.hexToBytes(this.iv) });
      mesageCipher.update(util.createBuffer(message));
      mesageCipher.finish();

      return mesageCipher.output.toHex();
    } catch (err) {
      return undefined;
    }
  }

  decryptMessage(message: string): string | undefined {
    try {
      const messageDecipher = cipher.createDecipher('AES-CFB', util.hexToBytes(this.key));
      messageDecipher.start({ iv: util.hexToBytes(this.iv) } );
      messageDecipher.update(util.createBuffer(util.hexToBytes(message)));

      return messageDecipher.output.toString();
    } catch (err) {
      return undefined;
    }
  }

}
