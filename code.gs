// Checks the dates in column A (up to line 100) and sends email if relevant
// Runs as CRON job every morning
function runFunctionOnCells() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;
  var endRow = 100;
  var column = 2;  // Column B

  for (var row = startRow; row <= endRow; row++) {
    var dayCell = sheet.getRange(row, column);
    var monthCell = sheet.getRange(row, column+1);

    if (isToday(dayCell, monthCell) == 1){
      subjectCell = sheet.getRange(row, column+3);
      bodyCell = sheet.getRange(row, column+4);

      sendEmailWithCells(subjectCell,bodyCell);
      Logger.log(dayCell.getValue());
      Logger.log(monthCell.getValue());

    }
  }
}

// Check if the date in a cell is today
function isDateToday(dateCell) {
  var today = new Date();
  var date = new Date(dateCell.getValue());
  return date.toDateString() == today.toDateString();
}

function sendEmailWithCells(subjectCell,bodyCell) {
  var recipient = "alexandre.moreillon@gmail.com";
  const subject = subjectCell.getValue();
  var body = bodyCell.getValue(); 
  MailApp.sendEmail(recipient, subject, body);
}

function isToday(dayCell, monthCell) {
  // Get the values of the day and month cells
  var day = dayCell.getValue();
  var month = monthCell.getValue();

  // Get the current date
  var now = new Date();

  // Check if the day and month from the cell values match the current day and month
  return now.getDate() === day && now.getMonth() + 1 === month;
}


