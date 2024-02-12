interface SalesInfo {
    sales_total: number, 
    sales_count: number
}

interface Item {
    qty: number;
    price: number;
}


export function salesCounter(items: Item[]): SalesInfo {

    let sales_info : SalesInfo = {
        sales_total: 0, 
        sales_count: 0
    }

    for (let item of items) {
        sales_info.sales_count += item.qty
        sales_info.sales_total += item.qty * item.price
    }

    return sales_info;
}