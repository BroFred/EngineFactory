import { BehaviorSubject, interval, take, scan } from "rxjs";
const subjectMap = new Map();



const cleanUp = (id) =>{
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
    const results = new BehaviorSubject([]);
    const source = interval(1000).pipe(take(data.length),scan((acc, curr) => [...acc, data[curr]], []));
    const sub = source.subscribe(results);
    subjectMap.set(id, [sub, results]);

    return [(fn) => results.subscribe(fn),  ()=>cleanUp(id)];
}

export default stream;

