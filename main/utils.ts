import { baseDefinitionItem } from '@example/definition';
import { dropWhile, startsWith, replace } from 'ramda';
import { Observable } from 'rxjs';
import Worker from 'Platform/commonWorker';
import serialize from 'serialize-javascript';
import { finalize } from 'rxjs/operators';

export const removeItem = (idx:string, items:baseDefinitionItem[])
:baseDefinitionItem[] => dropWhile(({ id }) => id === idx, items);
export const addItem = ({ id, options, enginePath }:baseDefinitionItem,
  items:baseDefinitionItem[])
:baseDefinitionItem[] => [{ id, options, enginePath }, ...items];

export const isRemoteHost = (enginePath: string) => startsWith('@remote', enginePath);
export const getRemoteModule = (enginePath: string) => replace('@remote/', '', enginePath);
export const myScope = Symbol();

export function loadComponent(scope, module) {
  return async () => {
    // Initializes the shared scope. Fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

export const woker$ = ({ trans, input$ }) => {
  const worker = new Worker();
  const sub = input$.subscribe((data) => {
    worker.postMessage({
      transform: serialize({
        trans: (data) => data,
      }),
      data,
    });
  });

  const data$ = new Observable(((subscriber) => {
    worker.onmessage = ({ data }) => {
      subscriber.next(data);
    };
  }));

  return data$.pipe(
    finalize(() => {
      console.log('closed');
      worker.terminate();
      sub.unsubscribe();
    }),
  );
};
