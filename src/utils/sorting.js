import moment from 'moment';

/**
 * Utility containing compare functions for sorting purposes
 */

export const sortAlphabetically = (a, b) => a.localeCompare(b);
export const sortNumerically = (a, b) => a - b;
export const sortByDate = (a, b) => moment(a).valueOf() - moment(b).valueOf();
