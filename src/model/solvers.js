export class Solvers{
    static variables = ['p', 'q', 'r']
    static operators = {
        '^': (a,b) => a && b,
        '|': (a,b) => a || b,
        '~': (a) => !a,
        '->': (a,b) => !a || b,
        '<->': (a,b) => (a && b) || (!a && !b)
    }
}