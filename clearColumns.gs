/**
 * @author u/IAmMoonie <https://www.reddit.com/user/IAmMoonie/>
 * @desc The script removes all content underneath the header.
 * @license MIT
 * @version 1.2
 */

/* A constant variable that stores the spreadsheet ID. */
const SPREADSHEET_ID = "your spreadsheetID goes here";

/**
 * Defining a constant variable that stores the columns to clear.
 * @example
 * // passes 1 column to clear
 * const COLUMNS_TO_CLEAR = "A"
 * @example
 * // passes multiple columns to clear
 * const COLUMNS_TO_CLEAR = "A, D, G"
 * @example
 * // passes a range columns to clear
 * const COLUMNS_TO_CLEAR = "A:J"
 */
const COLUMNS_TO_CLEAR = "J";

/* The row number where the script will start clearing the content. */
const START_AT_ROW = 2;

/* Check to see if the column to clear is a range or multiple columns. */
const rangeRegex = /^[A-Z]+:[A-Z]+$/;
const multiRegex = /^[A-Z]+(,[A-Z]+)*$/;


/**
 * Opens the spreadsheet by the ID, checks to see if the column to clear is a single range, multiple
 * columns or a single column, and then clears the content of the range.
 */
const clearSheet = () => {
  /* Opening the spreadsheet by the ID. */
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  /* Checking to see if the column to clear is a single range, multiple columns or a single column. */
  if (rangeRegex.test(COLUMNS_TO_CLEAR)) {
    /* Splitting the range into two parts, the start and end columns and then clearing the content of the range */
    const [startColumn, endColumn] = COLUMNS_TO_CLEAR.split(":");
    const range = sheet.getRangeByName(
      `${startColumn}${START_AT_ROW}:${endColumn}${sheet.getLastRow()}`
    );
    range.clearContent();
  } else if (multiRegex.test(COLUMNS_TO_CLEAR)) {
    /* Splitting the columns to clear by the comma and then clearing the content of the columns. */
    const columns = COLUMNS_TO_CLEAR.split(",");
    columns.forEach((column) => {
      const range = sheet.getRangeByName(
        `${column.trim()}${START_AT_ROW}:${column.trim()}${sheet.getLastRow()}`
      );
      range.clearContent();
    });
  } else {
    /* Clearing the content of the single column range. */
    const range = sheet.getRangeByName(
      `${COLUMNS_TO_CLEAR}${START_AT_ROW}:${COLUMNS_TO_CLEAR}${sheet.getLastRow()}`
    );
    range.clearContent();
  }
};
