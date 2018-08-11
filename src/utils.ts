export const doWhen = (when: Function, do_: Function) =>
    (other: any) => { if (when(other)) do_() };