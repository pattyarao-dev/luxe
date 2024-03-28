interface WeeklySales {
    [key: string]: number
}

// HELPER FUNCTIONS
function getWeekNumber(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1)
    return Math.ceil(
        ((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) /
            7
    )
}

function getMonthName(date: Date): string {
    const months: string[] = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]
    return months[date.getMonth()]
}

export function DateGrouper(sales: string[]): WeeklySales {
    const weeklySales: WeeklySales = {}
    sales.forEach((sale) => {
        const date = new Date(sale)
        const year = date.getFullYear()
        const month = getMonthName(date)
        const weekNumber = getWeekNumber(date)
        const key = `${year}-${month}-Week${weekNumber
            .toString()
            .padStart(2, "0")}`
        if (!weeklySales[key]) {
            weeklySales[key] = 1
        } else {
            weeklySales[key]++
        }
    })
    return weeklySales
}
