const moment = require('moment');

function getNextOccurrence(task) {
  const { recurrencePattern, recurrenceInterval, startDate, endDate, specificDays, nthDayOfMonth } = task;

  // Parse startDate as the base date
  let nextDate = moment(startDate);
  
  // Stop if endDate is reached
  if (endDate && moment().isAfter(endDate)) {
    return null;  // No further occurrences
  }

  // Switch based on the recurrence pattern
  switch (recurrencePattern) {
    case 'daily':
      nextDate.add(recurrenceInterval || 1, 'days');
      break;
      
    case 'weekly':
      if (specificDays && specificDays.length > 0) {
        // Find the next matching day in the specified weekdays
        const todayIndex = nextDate.day();
        const nextDay = specificDays.find(day => day > todayIndex) || specificDays[0];
        const daysToAdd = nextDay >= todayIndex ? nextDay - todayIndex : 7 - (todayIndex - nextDay);
        nextDate.add(daysToAdd, 'days');
      } else {
        nextDate.add(recurrenceInterval || 1, 'weeks');
      }
      break;

    case 'monthly':
      if (nthDayOfMonth) {
        nextDate = moment(startDate).add(recurrenceInterval || 1, 'months').day(nthDayOfMonth);
      } else {
        nextDate.add(recurrenceInterval || 1, 'months');
      }
      break;

    case 'yearly':
      nextDate.add(recurrenceInterval || 1, 'years');
      break;

    default:
      throw new Error(`Unsupported recurrence pattern: ${recurrencePattern}`);
  }

  // Check if the calculated date is after the end date (if specified)
  if (endDate && nextDate.isAfter(endDate)) {
    return null;
  }

  return nextDate.format('YYYY-MM-DD');
}

module.exports = { getNextOccurrence };

  