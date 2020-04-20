import { Injectable } from '@angular/core';

import { pki, util, cipher, md as forgeMd } from 'node-forge';

import PrivateKey from 'src/keys/private.json';
import PublicKey from 'src/keys/public.json';

@Injectable({
  providedIn: 'root'
})
export class SecretarService {

  constructor() { }

  decrypt(data: string, secret: string, hash: string) {
    try {
      const pk = pki.decryptRsaPrivateKey(PrivateKey.key, PrivateKey.passphrase);

      let key = pk.decrypt(util.hexToBytes(secret), 'RSA-OAEP');
      key = JSON.parse(key);

      const decipher = cipher.createDecipher('AES-CBC', util.hexToBytes(key.key));
      decipher.start({iv: util.hexToBytes(key.iv)});
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
      console.log(err);
      return undefined;
    }
  }
}
