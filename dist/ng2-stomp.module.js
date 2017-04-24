import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Ng2StompService } from './ng2-stomp.service';
export var Ng2StompModule = (function () {
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
        { type: NgModule, args: [{
                    imports: [],
                    providers: []
                },] },
    ];
    /** @nocollapse */
    Ng2StompModule.ctorParameters = function () { return [
        { type: Ng2StompModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
    ]; };
    return Ng2StompModule;
}());
//# sourceMappingURL=ng2-stomp.module.js.map