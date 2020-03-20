## postar - server

### Docker scripts

``` bash
    ./init.sh      # initialize docker data, start containers
    ./start.sh     # start containers
    ./restart.sh   # restart containers
    ./stop.sh      # stop and delete containers
```

### Node build and start

```bash
    npm install
    npm start
```

### Important notes
  * Generate public private key pair and store private key in *src/keys/private.pem*

### Optional parameters

```javascript
    // swich typeorm logging, in ormconfig.json
    "logging": false
```
