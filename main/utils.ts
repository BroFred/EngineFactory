import { baseDefinitionItem } from '@example/definition';
import {
  dropWhile, startsWith, replace, split,
} from 'ramda';
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
export const getRemoteModule = (enginePath: string) => {
  const [name, module, url] = split(
    ' ', replace('@remote ', '', enginePath),
  );
  return { name, module, url };
};

export const myScope = Symbol();

const loadScript = async (url) => {
  const isLoad = new Promise((resolve, reject) => {
    const element = document.createElement('script');

    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = () => {
      document.head.removeChild(element);
      resolve(`Dynamic Script Loaded: ${url}`);
    };

    element.onerror = () => {
      reject(new Error(`Dynamic Script Error: ${url}`));
    };

    document.head.appendChild(element);
  });
  return isLoad;
};

export function loadComponent(url) {
  return async (scope, module) => {
    let container = window[scope]; // or get the container somewhere else
    console.log('start load script');
    if (!container) {
      console.log('need load new script');
      await loadScript(url);
      container = window[scope];
    }

    // Initializes the shared scope. Fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
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
