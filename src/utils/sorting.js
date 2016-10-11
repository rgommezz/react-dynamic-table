import moment from 'moment';

/**
 * Comparator functions
 * They use currying to pass the object key to perform the comparison against
 */

const sortAlphabetically = (key) => (a, b) => a[key].localeCompare(b[key]);
const sortNumerically = (key) => (a, b) => a[key] - b[key];
const sortByDate = (key) => (a, b) => moment(a[key]).valueOf() - moment(b[key]).valueOf();

/**
 * Helper to associate table header with sorting criteria
 */

export const getSortableModel = () => ({
  id: sortNumerically,
  username: sortAlphabetically,
  title: sortAlphabetically,
  views: sortNumerically,
  likes: sortNumerically,
  createdAt: sortByDate,
});
