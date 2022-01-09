import { parseISO, format, toDate } from 'date-fns'
import { useEffect } from 'react';

const Date = ({ dateString }: { dateString: string }) => {
    const date = parseISO(dateString);
    useEffect(() => { console.log(dateString) }, [dateString])
    return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}

export default Date;