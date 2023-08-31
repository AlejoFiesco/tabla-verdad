export class Validators{
    static checkCharacters(query){
        query = query.replace(/\s+/g, '');
        let exp = /([p-r]|\(|\)|\&|\||(->)|(<->)|!)*/;
        let expected = exp.exec(query)[0];
        
        return {
            isValid : expected === query,
            expression: query
        };
    }

    static checkParenthesis(query){
        let exp = /(\(|\))/g
        let parenthesisArray = query.match(/(\(|\))/g);
        let indexes = []
        if(parenthesisArray === null) return {
            isValid : true,
            expression: query,
            parenthesisArray: []
        }
        // parenthesisArray = parenthesisArray.filter(c => c!== '')
        let queue = []
        for(let parenthesis of parenthesisArray) {
            if(parenthesis === '(') queue.push(parenthesis)
            if(parenthesis === ')') {
                if(queue.length === 0) return {
                    isValid : false,
                    expression: query
                }
                queue.pop()
            }
        }

        for(let i = 0; i < query.length; i++){
            if(query.charAt(i) === '(' || query.charAt(i) === ')') indexes.push({char: query.charAt(i), index: i})
        }
        return{
            isValid : queue.length === 0,
            expression: query,
            parenthesisIndexes: indexes
        }
    }

    static validateVariables(query){
        let variables = []
        if(query.includes('p')) variables.push('p')
        if(query.includes('q')) variables.push('q')
        if(query.includes('r')) variables.push('r')
        return variables
    }

    static replaceOperators(query){
        query = query.replace('<->', '==')
        if(query.includes('->')){
            query = '!'+query;
            query = query.replace('->', '|')
        }
        return query
    }

    
    static validateQuery(query){
        let validatedCharacters = Validators.checkCharacters(query)
        if(!validatedCharacters.isValid) return {message:'La expresión contiene caracteres incorrectos', isValid: false}
        let validatedParenthesis = Validators.checkParenthesis(validatedCharacters.expression)
        if(!validatedParenthesis.isValid) return {message: 'Verifique los paréntesis de la expresión', isValid: false}
        let returningObject = {
            isValid: true, 
            parenthesisIndexes: validatedParenthesis.parenthesisIndexes, 
            expression: validatedParenthesis.expression,
            replacedVariablesExpression: Validators.replaceOperators(validatedParenthesis.expression),
            variables: Validators.validateVariables(validatedParenthesis.expression)
        }
        return returningObject
    }
    
}