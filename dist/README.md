# ng2-stomp

Steps to use:
```html
1.  npm install sockjs-client --save
    npm install stompjs --save
    npm install ng2-stomp --save
```
step 1 will list all the peer dependencies need(will be fixed in later version)
```html
2. npm install "above-listed-dependencies" to your angular project
```
```html
3. include "node_modules/sockjs-client/dist/sockjs.min.js" 
    and "node_modules/stompjs/lib/stomp.min.js" to index.html
    or to angualar-cli.json file if you are using angular-cli
```
In app.module.ts
```html
4. import {Ng2StompModule} from 'ng2-stomp';
    include to your module's imports Ng2StompModule.forRoot()
```
