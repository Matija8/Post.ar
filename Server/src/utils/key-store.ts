import * as fs from "fs";
require("dotenv").config();

class KeyStoreModel {

    public privateKey = {
        key: fs.readFileSync("./src/keys/private.pem").toString(),
        passphrase: process.env.PRIVATE_SECRET
    };

    public publicKey = {
        key: fs.readFileSync("./src/keys/public.pem").toString(),
        passphrase: process.env.PUBLIC_SECRET
    }

}

export const KeyStore = new KeyStoreModel();
