import { Injectable } from '@angular/core';

import * as forge from 'node-forge';

import PrivateKey from 'src/keys/private.json';
import PublicKey from 'src/keys/public.json';

@Injectable({
  providedIn: 'root'
})
export class SecretarService {

	constructor() { }

	decrypt(data: string, secret: string, hash: string) {
		try {
			const pk = forge.pki.decryptRsaPrivateKey(PrivateKey.key, PrivateKey.passphrase);
		
			let key = pk.decrypt(forge.util.hexToBytes(secret), 'RSA-OAEP');
			key = JSON.parse(key);

			const decipher = forge.cipher.createDecipher('AES-CBC', forge.util.hexToBytes(key.key));
      decipher.start({iv: forge.util.hexToBytes(key.iv)});
      decipher.update(forge.util.createBuffer(forge.util.hexToBytes(data)));
      decipher.finish();
			const decrypted = JSON.parse(decipher.output.toString());

      const publicKey = forge.pki.publicKeyFromPem(PublicKey.key);

      const md = forge.md.sha256.create();
      md.update(decipher.output.toString());
      
      const result = publicKey.verify(
        md.digest().getBytes(),
        forge.util.hexToBytes(hash)
      );
      
			return result ? decrypted : undefined;
		} catch (err) {
      console.log(err);
			return undefined;
		}
	}
}
