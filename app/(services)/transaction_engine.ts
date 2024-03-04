interface SalesInfo {
    sales_total: number, 
    sales_count: number
}

interface booleanCondition {
    question_description: String, 
    value: Boolean
}

interface valueCondition {
    question_description: String, 
    operator: String,
    value: number
}



function booleanConditionHelper(boolean_conditions: booleanCondition[], boolean_input: boolean[]
    ){

    for (let i = 0; i < boolean_conditions.length; i++) {
        
        if(boolean_conditions[i].value !== boolean_input[i]){
            return false;
        }
        
    }

    return true;
}


function valueConditionHelper(value_conditions: valueCondition[], value_input: number[]): boolean {
    for (let i = 0; i < value_conditions.length; i++) {
        let condition = value_conditions[i];
        let inputValue = value_input[i];
        switch (condition.operator) {
            case '<=':
                if (!(inputValue <= condition.value)) return false;
                break;
            case '<':
                if (!(inputValue < condition.value)) return false;
                break;
            case '>=':
                if (!(inputValue >= condition.value)) return false;
                break;
            case '>':
                if (!(inputValue > condition.value)) return false;
                break;
            case '=':
                if (!(inputValue === condition.value)) return false;
                break;
            default:
                throw new Error("Invalid operator");
        }
    }
    return true;
}


export function transactionEngine( 
    sales_data: SalesInfo, 
    claim_type: String[], 
    min_spent: number | null, 
    min_items: number | null,
    boolean_conditions: booleanCondition[], 
    value_conditions: valueCondition[], 
    boolean_input: boolean[], 
    value_input: number[]): boolean {

    if (claim_type.includes('PURCHASE_VALUE') && claim_type.includes('ITEM_QTY') ){
        if (sales_data.sales_total >= min_spent! && sales_data.sales_count >= min_items!){
            return true;
        }
    }
    else if (claim_type.includes('PURCHASE_VALUE')){
        if (sales_data.sales_total >= min_spent!){
            return true;
        }
    }
    else if (claim_type.includes('ITEM_QTY')){
        if (sales_data.sales_count >= min_items!){
            return true;
        }
    }
    else if (claim_type.includes('CUSTOM')){
        
        if(min_items !== null){
            if (sales_data.sales_count <= min_items!){
                return false;
            }
        }

        if(min_spent !== null){
            if (sales_data.sales_total <= min_spent!){
                return false;
            }
        }

        if(value_conditions !== null){
            console.log(valueConditionHelper(value_conditions, value_input))
            if (!valueConditionHelper(value_conditions, value_input)){
                return false;
            }
        }

        if(boolean_conditions !== null){
            console.log(booleanConditionHelper(boolean_conditions, boolean_input))
            if (!booleanConditionHelper(boolean_conditions, boolean_input)){
                return false;
            }
        }

        return true;
    }
    

    return false;
}