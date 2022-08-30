import moment from 'moment';

export default function toMomentObject(dateString, customFormat) {
  const dateFormats = customFormat
    ? [customFormat, 'L', 'YYYY-MM-DD']
    : ['L', 'YYYY-MM-DD'];

  const date = moment(dateString, dateFormats, true);
  return date.isValid() ? date.hour(12) : null;
}
