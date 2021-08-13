import { BehaviorSubject, interval, scan, Subject, takeUntil } from "rxjs";
export const subjectMap = new Map();
export const stop$ = new Subject();
export const cleanUp = (id) =>{
    if (subjectMap.has(id)) {
        const [sub, behave] = subjectMap.get(id);
        sub.unsubscribe();
        behave.complete();
        behave.next(null);
        behave.unsubscribe();
        subjectMap.delete(id);
    }
}
const stream = async ({data} , id) => {
    cleanUp(id);
    const results = new BehaviorSubject([]).pipe(takeUntil(stop$));
    const source = interval(1000).pipe(scan((acc, curr) => data[curr] ? [...acc, data[curr]] : acc, []));
    const sub = source.subscribe(results);
    subjectMap.set(id, [sub, results]);

    return [(fn) => results.subscribe(fn),  ()=>cleanUp(id)];
}

export default stream;

