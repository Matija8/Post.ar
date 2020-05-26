# postar server

## Docker scripts

``` bash
    ./init.sh      # initialize docker data, start containers
    ./start.sh     # start containers
    ./restart.sh   # restart containers
    ./stop.sh      # stop and delete containers
```

## Node build and start

```bash
    npm install
    npm start
```

## Optional parameters

```javascript
    // swich typeorm logging, in ormconfig.json
    logging: false
```
## To generate documentation run from server's root directory:

```bash
    apidoc -i doc/src/ -o doc/apidoc/
```

### After generating documentation open ``doc/apidoc/index.html`` in your browser

## To install apidoc run:

```bash
    npm install apidoc -g
```
