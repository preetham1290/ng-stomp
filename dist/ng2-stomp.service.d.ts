import { Observable } from 'rxjs/Rx';
export declare class Ng2StompService {
    constructor();
    getStompClient(url: string): Observable<any>;
    getConnection(stompClient: any, configHeaders?: any): Observable<any>;
    subscribeToTopic(stompClient: any, topic: string, callback: any): Observable<any>;
    unSubscribe(subscription: any): void;
    sendMessage(stompClient: any, destination: any, body: any, headers?: any): Observable<any>;
}
