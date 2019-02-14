import {clone, getOn, getOnOr, setOn} from '../../src/objectstruct';
import {compose} from "../../src/composition";

describe('setOn', () => {


    // takeOrMake

    // it('takeOrMake makes', () => {
    //
    //     const obj: any = { };
    //     expect(takeOrMake(obj, 'a.b.c', [])).toEqual([]);
    //     expect(obj['a']['b']['c']).toEqual([]);
    // });
    //
    //
    // it('takeOrMake takes', () =>
    //     expect(

            // takeOrMake({a:{ b: { c: 'a'}}}, 'a.b.c', []))

            // .toEqual('a'));
    //


    it('setOn', () => {

        const r = setOn({a: 'b'}, 'a')('d');
        expect(r['a']).toBe('d');
    });


    it('setOn - create path', () => {

        const r = setOn({},'a')('d');
        expect(r['a']).toBe('d');
    });


    it('setOn - nested', () => {

        const r = setOn({a: {b: 'c'}}, 'a.b')('d');
        expect(r['a']['b']).toBe('d');
    });


    it('setOn - nested - create path', () => {

        const r = setOn({}, 'a.b')('d');
        expect(r['a']['b']).toBe('d');
    });


    it('reimplement takeOrMake', () => {

        const o1: any = {a: {b: {c: 'd'}}};

        const takeOrMake = (path: string, alternative: any) => <T>(o: T) =>
            compose(getOnOr(path , alternative), setOn(clone(o), path))(o);

        const r1 = takeOrMake('a.b.c', undefined)(o1); // take
        expect(r1['a']['b']['c']).toBe('d');
        expect(r1).not.toBe(o1);

        const o2: any = {a: {b: {c: undefined}}};

        const r2 = takeOrMake('a.b.c', 'd')(o2); // make
        expect(r2['a']['b']['c']).toBe('d');
    });
});