const SHEET_NAME = "Buku Tamu";
const SECRET = "GANTI_DENGAN_KODE_RAHASIA_PANJANG"; // Opsional untuk membatasi API POST.

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || "";
  if (action === "list") return json({ok:true, data:listGuests_()});
  if (action === "stats") return json({ok:true, stats:getStats_()});
  return json({ok:true, service:"Buku Tamu Digital KUA Sesayap"});
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    if (!body.nama || !body.hp || !body.alamat || !body.keperluan) throw new Error("Data wajib belum lengkap.");
    const sh = getSheet_();
    sh.appendRow([new Date(), body.nama, body.hp, body.alamat, body.keperluan, body.bertemu || "", body.keterangan || ""]);
    return json({ok:true, stats:getStats_()});
  } catch(err) {
    return json({ok:false, message:String(err.message || err)});
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(["Timestamp","Nama","No. HP","Alamat","Keperluan","Bertemu Dengan","Keterangan"]);
    sh.setFrozenRows(1);
    sh.getRange(1,1,1,7).setFontWeight("bold");
  }
  return sh;
}

function listGuests_() {
  const sh = getSheet_(), values = sh.getDataRange().getValues();
  if (values.length <= 1) return [];
  return values.slice(1).reverse().map(r => ({
    timestamp: Utilities.formatDate(new Date(r[0]), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss"),
    nama:r[1], hp:r[2], alamat:r[3], keperluan:r[4], bertemu:r[5], keterangan:r[6]
  }));
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}


function getStats_() {
  const sh = getSheet_();
  const values = sh.getDataRange().getValues();
  if (values.length <= 1) return {total:0, byKeperluan:[]};
  const counts = {};
  values.slice(1).forEach(r => {
    const key = String(r[4] || "Lainnya").trim() || "Lainnya";
    counts[key] = (counts[key] || 0) + 1;
  });
  const total = values.length - 1;
  const byKeperluan = Object.entries(counts)
    .map(([keperluan, jumlah]) => ({keperluan, jumlah, persentase: total ? Math.round((jumlah / total) * 1000) / 10 : 0}))
    .sort((a,b) => b.jumlah - a.jumlah);
  return {total, byKeperluan};
}
