import { parseISO, format } from 'date-fns'
import { useEffect } from 'react';

const Date = ({ dateString }: { dateString: string }) => {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}

export default Date;