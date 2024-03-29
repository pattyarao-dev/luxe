import React from 'react'

interface BrandData {
    brand_name: string;
    claims: number;
    total_sales: number;
}

interface MonthlyData {
    month: string;
    brands_data: BrandData[];
}

interface SampleReport {
    id: number;
    date_created: string;
    year: string;
    monthly_data: MonthlyData[];
}

export const TotalRewardClaimsPerBrand = () => {

    const BRANDS = ["Louis Vuitton", "Rimowa", "Balenciaga"]
    const SAMPLE_REPORT: SampleReport = {
        id: 1,
        date_created: "June 31, 2024",
        year: "2024",
        monthly_data: [
            {
                month: "Jan",
                brands_data: [
                    {
                        brand_name: "Louis Vuitton",
                        claims: 100,
                        total_sales: 500000.00
                    },
                    {
                        brand_name: "Rimowa",
                        claims: 100,
                        total_sales: 500000.00
                    },
                    {
                        brand_name: "Balenciaga",
                        claims: 100,
                        total_sales: 500000.00
                    }
                ]
            },
             {
                month: "Feb",
                brands_data: [
                   {
                        brand_name: "Louis Vuitton",
                        claims: 100,
                        total_sales: 500000.00
                    },
                    {
                        brand_name: "Rimowa",
                        claims: 100,
                        total_sales: 500000.00
                    },
                    {
                        brand_name: "Balenciaga",
                        claims: 100,
                        total_sales: 500000.00
                    }
                ]
            },
             {
                month: "Mar",
                brands_data: [
                   {
                        brand_name: "Louis Vuitton",
                        claims: 100,
                        total_sales: 500000.00
                    },
                    {
                        brand_name: "Rimowa",
                        claims: 100,
                        total_sales: 500000.00
                    },
                    {
                        brand_name: "Balenciaga",
                        claims: 100,
                        total_sales: 500000.00
                    }
                ]
            },
             {
                month: "Apr",
                brands_data: [
                    {
                        brand_name: "Louis Vuitton",
                        claims: 100,
                        total_sales: 500000.00
                    },
                    {
                        brand_name: "Rimowa",
                        claims: 100,
                        total_sales: 500000.00
                    },
                    {
                        brand_name: "Balenciaga",
                        claims: 100,
                        total_sales: 500000.00
                    }
                ]
            },
             {
                month: "May",
                brands_data: [
                    {
                        brand_name: "Louis Vuitton",
                        claims: 100,
                        total_sales: 500000.00
                    },
                    {
                        brand_name: "Rimowa",
                        claims: 100,
                        total_sales: 500000.00
                    },
                    {
                        brand_name: "Balenciaga",
                        claims: 100,
                        total_sales: 500000.00
                    }
                ]
            },
             {
                month: "Jun",
                brands_data: [
                    {
                        brand_name: "Louis Vuitton",
                        claims: 100,
                        total_sales: 500000.00
                    },
                    {
                        brand_name: "Rimowa",
                        claims: 100,
                        total_sales: 500000.00
                    },
                    {
                        brand_name: "Balenciaga",
                        claims: 100,
                        total_sales: 500000.00
                    }
                ]
            },
        ]
    }

    // Function to calculate total claims for a given month
const calculateTotalClaims = (brandsData: BrandData[]) => {
    let totalClaims = 0;
    brandsData.forEach(brand => {
        totalClaims += brand.claims;
    });
    return totalClaims;
}

// Function to calculate total sales for a given month
const calculateTotalSales = (brandsData: BrandData[]) => {
    let totalSales = 0;
    brandsData.forEach(brand => {
        totalSales += brand.total_sales;
    });
    return totalSales.toFixed(2); // Round to 2 decimal places
}
  return (
    <div className="w-full flex flex-col gap-10">
        <table className="w-full flex flex-col justify-evenly border border-neutral-400">
            {/* this row contains the main headings of the report... date, title, page num. */}
            <tr className="w-full p-4 flex flex-col border border-neutral-400">
                <div className="w-full flex justify-between">
                    <p>{SAMPLE_REPORT.date_created}</p>
                    <p>Page 1</p>
                </div>
                <p className="w-full text-center">Total Reward Claims per Brand Report</p>
            </tr>
            {/* this row contains the year heading*/}
            <tr className="w-full text-center border border-neutral-400">{SAMPLE_REPORT.year}</tr>

            {/* this row contains the months headings, mapped from the data*/}
            <tr className="w-full flex justify-evenly">
                <th className='grow border border-neutral-400'></th>
                {SAMPLE_REPORT.monthly_data.map((month, index) => (
                    <th key={index} className="w-[190px] border border-neutral-400">{month.month}</th>
                ))}
            </tr>

            {/* this row contains the headings of diff data... brand name, claims, sales. claims and sales are consistent with the indexes of the data via the map func*/}
            <tr className="w-full flex justify-evenly">
                <th className='grow border border-neutral-400'>Brand Name</th>
                {SAMPLE_REPORT.monthly_data.map((month, index) => (
                    <div key={index} className="w-[190px] flex justify-between text-xs border border-neutral-400">
                        <th className="w-1/2 text-center border-r border-neutral-400">Claims</th>
                        <th className="w-1/2 text-center">Sales</th>
                    </div>
                ))}
            </tr>

            
            <tr className="w-full flex justify-evenly">

                {/* the first column maps the different brands available*/}
               <div className="flex flex-col grow text-xs">
                {BRANDS.map((brand) => (
                <tr className='grow border border-neutral-400'>{brand}</tr>
               ))}
               </div>

               {/* the succeeding columns map out the data for the specific brands under specific months*/}
                 {SAMPLE_REPORT.monthly_data.map((month, index) => (
                   <tr>
                    {month.brands_data.map((brand, index) => (
                        <div className="w-[190px] flex justify-between text-xs border border-neutral-400">
                            <td className="w-1/2 text-center border-r border-neutral-400">{brand.claims}</td>
                            <td className="w-1/2 text-center ">{brand.total_sales}</td>
                        </div>
                    ))}
                   </tr>
                ))}
            </tr>
            <tr className="w-full flex">
                <th className='grow border border-neutral-400'>Total</th>
                {SAMPLE_REPORT.monthly_data.map((month, index) => (
                   <td className="w-[190px] flex justify-between text-xs border border-neutral-400">
                        <td className="w-1/2 text-center border-r border-neutral-400">{calculateTotalClaims(month.brands_data)}</td>
                        <td className="w-1/2 text-center ">{calculateTotalSales(month.brands_data)}</td>
                       
                   </td>
                ))}
            </tr>
        </table>
        <div className="w-full flex justify-center items-center gap-4">
            <div className="w-2/3 flex justify-center items-center gap-4">
                <hr className="grow border border-neutral-500" />
                <p className="font-black uppercase text-neutral-800">End of Report</p>
                <hr className="grow border border-neutral-500" />
            </div>
        </div>
    </div>
  )
}
