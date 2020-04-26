import * as fs from "fs";
import * as path from "path";

require("dotenv").config();

class KeyStoreModel {

    public privateKey = {
        key: fs.readFileSync(path.join(process.cwd(), "src", "keys", "private.pem")).toString(),
        passphrase: process.env.SECRET
    };

    public publicKey = {
        key: fs.readFileSync(path.join(process.cwd(), "src", "keys", "public.pem")).toString()
    }

}

export const KeyStore = new KeyStoreModel();
