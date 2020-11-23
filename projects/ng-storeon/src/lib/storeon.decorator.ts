import { ɵɵdirectiveInject as directiveInject } from '@angular/core';
import { StoreonService } from './storeon.service';
import { StoreonEvents } from 'storeon';

/***
 *
 * Experimental feature, works only with Ivy renderer
 * Patches the component with keys from storeon store
 *
 */
export function UseStoreon<State, Events extends StoreonEvents<State> = any>(config: {
	keys: Array<keyof State>,
	dispatcher?: string
}) {
	return (cmpType) => {
		const isNg11 = !!cmpType.ɵfac;
		const originalFactory = isNg11 ? cmpType.ɵfac : cmpType.ngComponentDef.factory;
		const newFactory = () => {
			const ngCompType = isNg11 ? cmpType.ɵcmp.type : cmpType.ngComponentDef.type;
			const cmp = originalFactory(ngCompType);
			const storeon = directiveInject<StoreonService<State, Events>>(StoreonService);

			config.keys.forEach(key => cmp[key] = storeon.useStoreon(key));

			if (config.dispatcher) {
				cmp[config.dispatcher] = storeon.dispatch.bind(storeon);
			}

			return cmp;
		};

		cmpType.ɵfac = newFactory;
	};
}
