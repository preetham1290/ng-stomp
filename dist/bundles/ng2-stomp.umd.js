(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Rx')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Rx'], factory) :
	(factory((global['ng2-stomp'] = global['ng2-stomp'] || {}),global.ng.core,global.rxjs_Rx));
}(this, (function (exports,_angular_core,rxjs_Rx) { 'use strict';

var Ng2StompService = (function () {
    function Ng2StompService() {
    }
    Ng2StompService.prototype.getStompClient = function (url) {
        return rxjs_Rx.Observable.of(Stomp.over(new SockJS(url, null, { transports: [], })));
    };
    Ng2StompService.prototype.getConnection = function (stompClient, configHeaders) {
        if (!stompClient || stompClient === null) {
            throw new Error('stompClient cannot be null');
        }
        return rxjs_Rx.Observable.of(stompClient.connect(configHeaders, function () { }));
    };
    //Returns subscription Obj if needed to unSubscribe
    Ng2StompService.prototype.subscribeToTopic = function (stompClient, topic, callback) {
        if (!stompClient || stompClient === null) {
            throw new Error('stompClient cannot be null');
        }
        return rxjs_Rx.Observable.of(stompClient.subscribe(topic, function (message) {
            callback(JSON.parse(message['body']));
        }));
    };
    Ng2StompService.prototype.unSubscribe = function (subscription) {
        subscription.unsubscribe();
    };
    Ng2StompService.prototype.sendMessage = function (stompClient, destination, body, headers) {
        return rxjs_Rx.Observable.of(stompClient.send(destination, headers, body));
    };
    Ng2StompService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    Ng2StompService.ctorParameters = function () { return []; };
    return Ng2StompService;
}());

var Ng2StompModule = (function () {
    function Ng2StompModule(parentModule) {
        if (parentModule) {
            throw new Error('Ng2StompModule is already loaded. Import it in the AppModule only');
        }
    }
    Ng2StompModule.forRoot = function () {
        return {
            ngModule: Ng2StompModule,
            providers: [Ng2StompService]
        };
    };
    Ng2StompModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [],
                    providers: []
                },] },
    ];
    /** @nocollapse */
    Ng2StompModule.ctorParameters = function () { return [
        { type: Ng2StompModule, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.SkipSelf },] },
    ]; };
    return Ng2StompModule;
}());

exports.Ng2StompModule = Ng2StompModule;
exports.Ng2StompService = Ng2StompService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
