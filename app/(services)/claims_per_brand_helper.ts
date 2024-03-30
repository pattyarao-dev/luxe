interface Transaction {
    claimed_by: string;
    processed_by: string;
    sales_count: number;
    sales_value: number;
    _id: string;
    timestamp: string;
}

interface BrandTransaction {
    brand_name: string;
    transactions: Transaction[];
}

interface BrandData {
    brand_name: string;
    claims: number;
    total_sales: number;
}

interface MonthlyData {
    month: string;
    brands_data: BrandData[];
}

interface OutputData {
    id: number;
    date_created: string;
    year: string;
    monthly_data: MonthlyData[];
}

export function ClaimsPerBrandHelper(brandTransactions: BrandTransaction[]): OutputData {
    const months: { [key: string]: BrandData[] } = {};
    const brands: { [key: string]: BrandData } = {};

    // Initialize brands with zero claims and total sales
    brandTransactions.forEach(brand => {
        brands[brand.brand_name] = { brand_name: brand.brand_name, claims: 0, total_sales: 0 };
    });

    // Initialize months for the entire year
    const year = new Date().getFullYear();
    const monthNames = getMonthNames();
    monthNames.forEach(monthYear => {
        months[monthYear] = Object.values(brands).map(brandData => ({
            ...brandData,
            claims: 0,
            total_sales: 0
        }));
    });

    brandTransactions.forEach(brand => {
        const brandName = brand.brand_name;
        const transactions = brand.transactions;

        transactions.forEach((transaction: any) => {
            const date = new Date(transaction.timestamp);
            const monthYear = `${date.toLocaleString('en-us', { month: 'short' })}`;

            // Update claims and total sales for the corresponding brand and month
            months[monthYear].forEach(brandData => {
                if (brandData.brand_name === brandName) {
                    brandData.claims++;
                    brandData.total_sales += transaction.sales_value;
                }
            });
        });
    });

    const monthlyData: MonthlyData[] = [];
    for (const monthYear in months) {
        monthlyData.push({
            month: monthYear,
            brands_data: months[monthYear]
        });
    }

    return {
        id: 1,
        date_created: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
        year: year.toString(),
        monthly_data: monthlyData
    };
}

function getMonthNames(): string[] {
    const months: string[] = [];
    for (let month = 0; month < 12; month++) {
        const date = new Date();
        date.setFullYear(date.getFullYear(), month, 1);
        months.push(`${date.toLocaleString('en-us', { month: 'short' })}`);
    }
    return months;
}
