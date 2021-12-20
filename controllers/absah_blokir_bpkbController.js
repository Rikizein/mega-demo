const controller = {}

const conn = require('../config/connection')

let arrbulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
let date = new Date();
let hari = date.getDay();
let tgl = date.getDate();
let bulan = date.getMonth() + 1;
let tahun = date.getFullYear();
let detik = date.getSeconds();
let menit = date.getMinutes();
let jam = date.getHours();
let x = '0';
if (bulan < 10) {
    bulan = x + bulan
}
if (tgl < 10) {
    tgl = x + tgl
}
if (jam < 10) {
    jam = x + jam
}
if (menit < 10) {
    menit = x + menit
}

let today = tahun + "-" + bulan + "-" + tgl
let now = tahun + "-" + bulan + "-" + tgl + " " + jam + ":" + menit + ":" + detik
let month = date.getMonth() + 1;

function convertDate(d) {
    const date = new Date(d);
    const year = date.getFullYear();
    let month = date.getMonth();
    month = parseInt(month) < 10 ? `0${month}` : month;

    let day = date.getDate();
    day = parseInt(day) < 10 ? `0${day}` : day;
    return day + "-" + month + "-" + year;
}



// CABUT BERKAS ==============================================================================================
controller.absah_blokir_bpkb = (req, res) => {
    res.render('absah blokir bpkb/absah_blokir_bpkb', {
        title: `Permintaan Absah Dan Blokir Buku BPKB ${req.query.kota}`,
        today: today,
        qs:req.query,
        userData: req.session.user       
    })
}

controller.absah_blokir_bpkb_form = (req, res) => {
    conn.query(`select * from klien`, (err, klien) => {
        conn.query(`select * from absah_blokir_bpkb`, (err, data) => {
            conn.query(`select * from biaya`, (err, biaya) => {
                conn.query(`select * from bank`, (err, bank) => {
                    res.render('absah blokir bpkb/absah_blokir_bpkb_form', {
                        title: `Form Permintaan Absah Dan Blokir Buku BPKB ${req.query.kota}`,
                        klien:klien,
                        data: data,
                        biaya:biaya,
                        bank:bank,
                        today: today,
                        convertDate: convertDate,
                        qs:req.query,
                        userData: req.session.user
                    })
                })
            })
        })
    })
}
// /CABUT BERKAS =============================================================================================





module.exports = controller;