import { Observable } from 'rxjs/Rx';
export declare class Ng2StompService {
    private stompClient;
    private connectionAnnouncedSource;
    connectionAnnounced$: Observable<any>;
    constructor();
    announceconnection(connection: any): void;
    setUsedSubscription(subscrObj: any): void;
    getStompClient(url: string): Observable<any>;
    getConnection(configHeaders?: any): Observable<any>;
    subscribeToTopic(topic: string, callback?: Function, header?: {
        'id': string;
    }): Observable<any>;
    unSubscribe(subscriptionId: string): void;
    sendMessage(destination: any, body: any, headers?: any): Observable<any>;
    disconnect(): void;
}
