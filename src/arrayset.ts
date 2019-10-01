import {ArrayList, ArraySet} from "tsfun-core/src/type";

// ------------ @author Daniel de Oliveira -----------------



// Contributed by Thomas Kleinke
export function duplicates<A>(array: ArrayList<A>): ArraySet<A> {

    const temp: any[] = [];
    const result: any[] = [];

    for (let value of array) {
        if (temp.indexOf(value) > -1 && result.indexOf(value) == -1) {
            result.push(value);
        } else {
            temp.push(value);
        }
    }

    return result;
}


