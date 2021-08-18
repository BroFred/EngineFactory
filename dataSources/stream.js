import { interval, scan } from "rxjs";

const stream = async ({data}) => {
    const source = interval(1000).pipe(scan((acc, curr) => data[curr] ? [...acc, data[curr]] : acc, []));
    return source;
}

export default stream;

