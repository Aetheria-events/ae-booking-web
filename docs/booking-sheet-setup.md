# Booking sheet

The website's booking form writes each request into the Google Sheet below. The
form stays on the site: visitors fill it in, press **Send booking request**, and
the row appears in the sheet, no copy and paste, no second tab.

Sheet: `1jUrvnfI1MtEY83iVdLOZKxxQUbCtou1F-yf1ABUqYqQ`

## One-time setup

A static site cannot write to a Google Sheet by itself, Google does not allow
anonymous writes. The bridge is a small Apps Script that lives inside the sheet.

1. Open the sheet, then **Extensions → Apps Script**.
2. Delete the `myFunction` stub and paste the contents of
   [`docs/booking-sheet.gs`](./booking-sheet.gs).
3. **Save**, then **Deploy → New deployment → Web app**.
   - Description: `Booking receiver`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Authorise when Google asks. The permission it needs is "edit your
   spreadsheets", nothing else.
5. Copy the deployment URL. It looks like
   `https://script.google.com/macros/s/AKfy…/exec`.
6. The `/exec` URL is already wired into `brand.bookingEndpoint` in
   `src/data/site.js`. If the deployment ever moves, paste the new URL there,
   rebuild, and submit one test booking from `/booking`.

Opening that URL in a browser should answer
`{"ok":true,"service":"Aetheria Events booking receiver"}`. That means the
receiver is live.

## What happens on submit

- The browser posts one JSON object (reference, package, prices, event details,
  contact details, notes) to the deployment URL.
- The script takes a script lock, appends one row in the column order above and
  releases the lock, so two people booking at the same moment cannot overwrite
  each other.
- The visitor sees the confirmation screen with their reference number and the
  date already saved.
- If the deployment URL is empty or unreachable, the site falls back to the
  previous behaviour: the row is put on the clipboard (or downloaded) with a
  link to the sheet, and the confirmation screen says one step is left.

## Changing the sheet

Edit `SHEET_ID` in the script, redeploy, and update the link in
`brand.bookingSheet`. Reordering `COLUMNS` in both the script and
`SHEET_COLUMNS` in `src/pages/Booking.jsx` keeps the header and the values in
step.
