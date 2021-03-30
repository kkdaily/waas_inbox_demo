import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(relativeTime);

// i.e: '2 minutes ago'
export function getRelativeTimeInWords(datetime) {
  return dayjs().to(dayjs(dayjs.utc(datetime)));
};