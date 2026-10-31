/**
 * Aetheria Events · booking receiver
 * ----------------------------------
 * Appends every website booking request as one row in the booking sheet.
 *
 * One-time setup (about two minutes):
 *   1. Open the booking sheet.
 *   2. Extensions → Apps Script. Delete the stub and paste this whole file.
 *   3. Save, then Deploy → New deployment → Web app.
 *        Execute as:  Me
 *        Who has access:  Anyone
 *   4. Copy the deployment URL (it ends in /exec) and paste it into
 *      brand.bookingEndpoint in src/data/site.js.
 *
 * The site posts one JSON object per submission. The COLUMNS list below is the
 * header row of the sheet and the order the values are written in, so do not
 * reorder it once rows exist.
 */

var SHEET_ID = '1jUrvnfI1MtEY83iVdLOZKxxQUbCtou1F-yf1ABUqYqQ';
var SHEET_NAME = ''; // empty string = the first tab

var COLUMNS = [
  ['Reference', 'reference'],
  ['Submitted', 'submitted'],
  ['Package', 'package'],
  ['Package price', 'packagePrice'],
  ['Rush service', 'rush'],
  ['Rush price', 'rushPrice'],
  ['Total', 'total'],
  ['Event type', 'eventType'],
  ['Event name', 'eventName'],
  ['Event date', 'eventDate'],
  ['Venue', 'venue'],
  ['Guests', 'guests'],
  ['Contact name', 'name'],
  ['Email', 'email'],
  ['Mobile', 'phone'],
  ['Notes', 'notes'],
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(25000);

    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!data.reference || !data.email) {
      throw new Error('Missing reference or email');
    }

    var sheet = openSheet_();
    writeHeader_(sheet);

    var row = COLUMNS.map(function (pair) {
      var value = data[pair[1]];
      return value === undefined || value === null ? '' : value;
    });

    sheet.appendRow(row);
    sheet.getRange(sheet.getLastRow(), 10).setNumberFormat('yyyy-mm-dd');

    return reply_({ ok: true, reference: data.reference });
  } catch (error) {
    return reply_({ ok: false, error: String(error) });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignored) {
      /* lock already released */
    }
  }
}

/** Opening the /exec URL in a browser confirms the deployment is live. */
function doGet() {
  return reply_({ ok: true, service: 'Aetheria Events booking receiver' });
}

function openSheet_() {
  var book = SpreadsheetApp.openById(SHEET_ID);
  return SHEET_NAME ? book.getSheetByName(SHEET_NAME) : book.getSheets()[0];
}

function writeHeader_(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet
    .getRange(1, 1, 1, COLUMNS.length)
    .setValues([COLUMNS.map(function (pair) { return pair[0]; })])
    .setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function reply_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
