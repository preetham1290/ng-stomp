import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { Ng2StompService } from './ng2-stomp.service';

@NgModule({
	imports: [],
	providers: [
	]
})
export class Ng2StompModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: Ng2StompModule,
			providers: [Ng2StompService]
		}
	}
	constructor( @Optional() @SkipSelf() parentModule: Ng2StompModule) {
		if (parentModule) {
			throw new Error(
				'Ng2StompModule is already loaded. Import it in the AppModule only');
		}
	}
}