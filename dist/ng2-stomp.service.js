import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
export var Ng2StompService = (function () {
    function Ng2StompService() {
    }
    Ng2StompService.prototype.getStompClient = function (url) {
        return Observable.of(Stomp.over(new SockJS(url, null, { transports: [], })));
    };
    Ng2StompService.prototype.getConnection = function (stompClient, configHeaders, callback) {
        if (!stompClient || stompClient === null) {
            throw new Error('stompClient cannot be null');
        }
        return Observable.of(stompClient.connect(configHeaders, callback));
    };
    //Returns subscription Obj if needed to unSubscribe
    Ng2StompService.prototype.subscribeToTopic = function (stompClient, topic, callback) {
        if (!stompClient || stompClient === null) {
            throw new Error('stompClient cannot be null');
        }
        return Observable.of(stompClient.subscribe(topic, function (message) {
            callback(JSON.parse(message['body']));
        }));
    };
    Ng2StompService.prototype.unSubscribe = function (subscription) {
        subscription.unsubscribe();
    };
    Ng2StompService.prototype.sendMessage = function (stompClient, destination, body, headers) {
        return Observable.of(stompClient.send(destination, headers, body));
    };
    Ng2StompService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Ng2StompService.ctorParameters = function () { return []; };
    return Ng2StompService;
}());
//# sourceMappingURL=ng2-stomp.service.js.map