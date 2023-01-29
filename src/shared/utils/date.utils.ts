export const createDateFromString = (date: string) : Date | null => {
    const newDate: Date = new Date(date);
    if (newDate.toString() === 'Invalid Date') {
        return null;
    }
    return newDate;
};