export function DateChecker(scheduled_date: string): boolean {
    // Returns true if the scheduled_date has passed


    // Create a Date object from the scheduled_date string
    const scheduledDate: Date = new Date(scheduled_date);

    // Get the current date and time
    const currentDate: Date = new Date();

    console.log(scheduledDate >= currentDate)

    if(scheduledDate <= currentDate){
        return true
    }

    // Compare scheduledDate with currentDate
    return false;
}