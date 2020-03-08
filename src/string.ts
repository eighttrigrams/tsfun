export function split(pattern: any) {

    return (content: string) => content.split(pattern);
}


export function join(pattern: any) {

    return <A>(content: Array<A>): string => content.join(pattern);
}


export function toLowerCase(s: string) {

    return s.toLowerCase();
}


export function toUpperCase(s: string) {

    return s.toUpperCase();
}