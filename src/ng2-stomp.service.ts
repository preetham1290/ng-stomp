import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
declare var Stomp: any;
declare var SockJS: any;
declare var Client: any;
@Injectable()
export class Ng2StompService {

    constructor() { }

    getStompClient(): Observable<any> {
        return Observable.of(Stomp.over(new SockJS('http://localhost:8080/auth/connectsocket', null,
            { transports: [], })));
    }

    getConnection(stompClient: any, configHeaders?: any): Observable<any> {
        if (!stompClient || stompClient === null) {
            throw new Error('stompClient cannot be null');
        }
        return Observable.of(stompClient.connect(configHeaders, () => { }));
    }

    //Returns subscription Obj if needed to unSubscribe
    subscribeToTopic(stompClient: any, topic: string, callback: any): Observable<any> {
        if (!stompClient || stompClient === null) {
            throw new Error('stompClient cannot be null');
        }
        return Observable.of(stompClient.subscribe(topic, (message: any) => {
            callback(JSON.parse(message['body']));
        }));
    }

    unSubscribe(subscription: any) {
        subscription.unsubscribe();
    }

    sendMessage(stompClient: any, destination: any, body: any, headers?: any): Observable<any> {
        return Observable.of(stompClient.send(destination, headers, body));
    }
}