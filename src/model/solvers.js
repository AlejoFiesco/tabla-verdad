export class Solvers{
    static operators = {
        '^': (a,b) => a && b,
        '|': (a,b) => a || b,
        '~': (a) => !a,
        '->': (a,b) => !a || b,
        '<->': (a,b) => (a && b) || (!a && !b)
    }
}