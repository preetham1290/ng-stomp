(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Rx')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Rx'], factory) :
	(factory((global['ng2-stomp'] = global['ng2-stomp'] || {}),global.ng.core,global.rxjs_Rx));
}(this, (function (exports,_angular_core,rxjs_Rx) { 'use strict';

var Ng2StompService = (function () {
    function Ng2StompService() {
        this.stompClient = null;
        this.connectionAnnouncedSource = new rxjs_Rx.Subject();
        this.connectionAnnounced$ = this.connectionAnnouncedSource.asObservable();
    }
    Ng2StompService.prototype.announceconnection = function (connection) {
        this.connectionAnnouncedSource.next(connection);
    };
    Ng2StompService.prototype.setUsedSubscription = function (subscrObj) {
        this.stompClient.usedSubscriptions[subscrObj.id] = subscrObj;
    };
    Ng2StompService.prototype.getStompClient = function (url) {
        var cl = Stomp.over(new SockJS(url, null, { transports: [], }));
        cl['usedSubscriptions'] = {};
        this.stompClient = cl;
        return rxjs_Rx.Observable.of(cl);
    };
    Ng2StompService.prototype.getConnection = function (configHeaders) {
        var _this = this;
        if (!this.stompClient || this.stompClient === null) {
            throw new Error('stompClient cannot be null');
        }
        return rxjs_Rx.Observable.of(this.stompClient.connect(configHeaders, function () {
            _this.announceconnection(_this.stompClient);
        }));
    };
    //Returns subscription Obj if needed to unSubscribe
    Ng2StompService.prototype.subscribeToTopic = function (topic, callback, header) {
        if (header && this.stompClient) {
            if (this.stompClient.subscriptions[header.id]) {
                return rxjs_Rx.Observable.of(this.stompClient.usedSubscriptions[header.id]);
            }
        }
        if (!this.stompClient || this.stompClient === null) {
            throw new Error('stompClient cannot be null');
        }
        return rxjs_Rx.Observable.of(this.stompClient.subscribe(topic, function (message) {
            if (callback) {
                callback(JSON.parse(message['body']));
            }
        }, header));
    };
    Ng2StompService.prototype.unSubscribe = function (subscriptionId) {
        this.stompClient.usedSubscriptions[subscriptionId].unsubscribe();
        delete this.stompClient.usedSubscriptions[subscriptionId];
    };
    Ng2StompService.prototype.sendMessage = function (destination, body, headers) {
        return rxjs_Rx.Observable.of(this.stompClient.send(destination, headers, body));
    };
    Ng2StompService.prototype.disconnect = function () {
        rxjs_Rx.Observable.of(this.stompClient.disconnect(function () { }));
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
