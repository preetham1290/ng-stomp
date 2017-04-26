import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
export var Ng2StompService = (function () {
    function Ng2StompService() {
        this.stompClient = null;
        this.connectionAnnouncedSource = new Subject();
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
        return Observable.of(cl);
    };
    Ng2StompService.prototype.getConnection = function (configHeaders) {
        var _this = this;
        if (!this.stompClient || this.stompClient === null) {
            throw new Error('stompClient cannot be null');
        }
        return Observable.of(this.stompClient.connect(configHeaders, function () {
            _this.announceconnection(_this.stompClient);
        }));
    };
    //Returns subscription Obj if needed to unSubscribe
    Ng2StompService.prototype.subscribeToTopic = function (topic, callback, header) {
        if (header && this.stompClient) {
            if (this.stompClient.usedSubscriptions[header.id]) {
                return Observable.of(this.stompClient.usedSubscriptions[header.id]);
            }
        }
        if (!this.stompClient || this.stompClient === null) {
            throw new Error('stompClient cannot be null');
        }
        return Observable.of(this.stompClient.subscribe(topic, function (message) {
            if (callback) {
                callback(JSON.parse(message['body']));
            }
        }, header));
    };
    Ng2StompService.prototype.unSubscribe = function (subscriptionId) {
        this.stompClient.usedSubscriptions[subscriptionId].unsubscribe();
    };
    Ng2StompService.prototype.sendMessage = function (destination, body, headers) {
        return Observable.of(this.stompClient.send(destination, headers, body));
    };
    Ng2StompService.prototype.disconnect = function () {
        Observable.of(this.stompClient.disconnect(function () { }));
    };
    Ng2StompService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Ng2StompService.ctorParameters = function () { return []; };
    return Ng2StompService;
}());
//# sourceMappingURL=ng2-stomp.service.js.map