export class Validators{
    static checkCharacters(query){
        query = query.replace(/\s+/g, '');
        let exp = /([p-r]|\(|\)|\^|\||(->)|(<->)|~)*/;
        let expected = exp.exec(query)[0];
        
        return {
            isValid : expected === query,
            expression: query
        };
    }

    static checkParenthesis(query){
        let parenthesisArray = query.match(/(\(|\))/g);
        if(parenthesisArray === null) return {
            isValid : true,
            expression: query,
            parenthesisArray: []
        }
        parenthesisArray = parenthesisArray.filter(c => c!== '')
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
        return{
            isValid : queue.length === 0,
            expression: query,
            parenthesisArray: parenthesisArray
        }
    }

    
    static validateQuery(query){
        let validatedCharacters = Validators.checkCharacters(query)
        if(!validatedCharacters.isValid) return {message:'La expresión contiene caracteres incorrectos', isValid: false}
        let validatedParenthesis = Validators.checkParenthesis(validatedCharacters.expression)
        if(!validatedParenthesis.isValid) return {message: 'Verifique los paréntesis de la expresión', isValid: false}
        return {
            isValid: true, 
            parenthesisArray: validatedParenthesis.parenthesisArray, 
            expression: validatedParenthesis.expression}
    }
    
}