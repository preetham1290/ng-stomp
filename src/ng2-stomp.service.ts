import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

declare var Stomp: any;
declare var SockJS: any;
declare var Client: any;
@Injectable()
export class Ng2StompService {
    private stompClient: any = null;
    private connectionAnnouncedSource = new Subject<any>();
    connectionAnnounced$ = this.connectionAnnouncedSource.asObservable();

    constructor() { }

    announceconnection(connection: any) {
        this.connectionAnnouncedSource.next(connection);
    }

    setUsedSubscription(subscrObj: any) {
        this.stompClient.usedSubscriptions[subscrObj.id] = subscrObj;
    }

    getStompClient(url: string): Observable<any> {
        let cl = Stomp.over(new SockJS(url, null, { transports: [], }));
        cl['usedSubscriptions'] = {};
        this.stompClient = cl;
        return Observable.of(cl);
    }

    getConnection(configHeaders?: any): Observable<any> {
        if (!this.stompClient || this.stompClient === null) {
            throw new Error('stompClient cannot be null');
        }
        return Observable.of(this.stompClient.connect(configHeaders, () => {
            this.announceconnection(this.stompClient);
        }));
    }

    //Returns subscription Obj if needed to unSubscribe
    subscribeToTopic(topic: string, callback?: Function, header?: { 'id': string }): Observable<any> {
        if (header && this.stompClient) {
            if (this.stompClient.usedSubscriptions[header.id]) {
                return Observable.of(this.stompClient.usedSubscriptions[header.id]);
            }
        }
        if (!this.stompClient || this.stompClient === null) {
            throw new Error('stompClient cannot be null');
        }
        return Observable.of(this.stompClient.subscribe(topic, (message: any) => {
            if (callback) {
                callback(JSON.parse(message['body']));
            }
        }, header));
    }

    unSubscribe(subscriptionId: string) {
        this.stompClient.usedSubscriptions[subscriptionId].unsubscribe();
    }

    sendMessage(destination: any, body: any, headers?: any): Observable<any> {
        return Observable.of(this.stompClient.send(destination, headers, body));
    }

    disconnect() {
        Observable.of(this.stompClient.disconnect(() => { }));
    }
}