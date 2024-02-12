interface SalesInfo {
    sales_total: number, 
    sales_count: number
}

export function transactionEngine(
    sales_data: SalesInfo, 
    claim_type: String[], 
    min_spent: number | null, 
    min_items: number | null): boolean {

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


    return false;
}