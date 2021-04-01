import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(relativeTime);

// i.e: '2 minutes ago'
export function getRelativeTimeInWords(datetime) {
  const time = dayjs().to(dayjs(dayjs.utc(datetime)));

  // change dayjs's default for recent times to 'seconds ago' to better fit text on mobile
  return time === 'a few seconds ago' ? 'seconds ago' : time;
};