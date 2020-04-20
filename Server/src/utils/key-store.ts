import * as fs from "fs";
require("dotenv").config();

class KeyStoreModel {

    public privateKey = {
        key: fs.readFileSync("./src/keys/private.pem").toString(),
        passphrase: process.env.SECRET
    };

    public publicKey = {
        key: fs.readFileSync("./src/keys/public.pem").toString()
    }

}

export const KeyStore = new KeyStoreModel();
