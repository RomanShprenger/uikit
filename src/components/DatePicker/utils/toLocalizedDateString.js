import moment from 'moment';

import toMomentObject from './toMomentObject';

export default function toLocalizedDateString(date, currentFormat) {
  const dateObj = moment.isMoment(date) ? date : toMomentObject(date, currentFormat);
  if (!dateObj) return null;

  return dateObj.format('L');
}
