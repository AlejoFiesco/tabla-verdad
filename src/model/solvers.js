export class Solvers {
    static operators = {
        '&': (a, b) => a && b,
        '|': (a, b) => a || b,
        '!': (a) => !a,
        '=>': (a, b) => !a || b,
        '<=>': (a, b) => (a && b) || (!a && !b)
    }

    static createTruthTable(validatedObject) {
        // console.log(validatedObject.parenthesisIndexes);
        let resultsCopy = validatedObject;
        // console.log({"original": validatedObject, "copia": resultsCopy});
        let rowQuantity = 2 ** (resultsCopy.variables.length);
        let dict = Solvers.createDictionary(resultsCopy);
        let variables = validatedObject.variables;

        //Variables truth values are stored in the dictionary
        for (let i = 0; i < rowQuantity; i++) {

            for (let j = 0; j < variables.length; j++) {
                const variable = variables[j];
                const value = (i & (1 << (variables.length - j - 1))) !== 0 ? 1 : 0;
                dict[variable].push(value);
            }

        }
        for (let key of Object.keys(dict)) {
            if (!variables.includes(key)) {
                for (let i = 0; i < rowQuantity; i++) {
                    let preparedString = key;
                    let tempCad = key;
                    for (let j of Object.keys(dict).reverse()) {
                        if (key.includes(j) && key !== j) {
                            tempCad = tempCad.replace(j, dict[j][i]);
                        }
                    }
                    dict[key].push(eval(tempCad));
                }
            }
        }

        // console.log(dict);
        return dict;
    }
    static createDictionary(validatedObject) {
        let dict = {}
        let index = 0;
        for (let variable of validatedObject.variables) dict[variable] = [];
        if (validatedObject?.parenthesisIndexes?.length) {
            do {
                if (validatedObject?.parenthesisIndexes[index]?.char === '(' && validatedObject?.parenthesisIndexes[index + 1]?.char === ')') {
                    let substr = validatedObject.expression.substring(validatedObject.parenthesisIndexes[index].index + 1, validatedObject.parenthesisIndexes[index + 1].index)
                    dict[substr] = []
                    validatedObject.parenthesisIndexes.splice(index, 2);
                    console.log(validatedObject.parenthesisIndexes);
                    index = 0;
                } else {
                    index++;
                }
            } while (validatedObject.parenthesisIndexes?.length !== 0)
        }
        dict[validatedObject.expression] = []

        return dict;
    }
}
