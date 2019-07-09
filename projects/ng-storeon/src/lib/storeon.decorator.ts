import { ɵɵdirectiveInject as directiveInject } from '@angular/core';
import { StoreonService } from './storeon.service';


/***
 *
 * Experimental feature, works only with Ivy renderer
 * Patches the component with keys from storeon store
 *
 */
export function UseStoreon<State, Events>(config: {
  keys: Array<keyof State>,
  dispatcher?: string
}) {
  return (cmpType) => {
    const originalFactory = cmpType.ngComponentDef.factory;
    cmpType.ngComponentDef.factory = () => {
      const cmp = originalFactory(cmpType.ngComponentDef.type);

      const storeon = directiveInject<StoreonService<State, Events>>(StoreonService );

      config.keys.forEach(key => cmp[key] = storeon.useStoreon(key));

       if (config.dispatcher) {
         cmp[config.dispatcher] = storeon.dispatch.bind(storeon);
       }

      return cmp;
    };

  };
}
