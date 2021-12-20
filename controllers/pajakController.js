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



// LENGKAP ==============================================================================================
controller.pt_lengkap = (req, res) => {
    res.render('pajak tahunan/lengkap/pt_lengkap', {
        title: `Pajak Tahunan ${req.query.jk} Lengkap`,
        today: today,
        qs:req.query,
        userData: req.session.user       
    })
}

controller.pt_lengkap_form = (req, res) => {
    conn.query(`select * from klien`, (err, klien) => {
        conn.query(`select * from pajaktahunan`, (err, data) => {
            conn.query(`select * from biaya`, (err, biaya) => {
                conn.query(`select * from bank`, (err, bank) => {
                    res.render('pajak tahunan/lengkap/pt_lengkap_form', {
                        title: `Pajak Tahunan ${req.query.jk} ${req.query.provinsi} Lengkap`,
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
// /LENGKAP =============================================================================================

// ACC KTP ==============================================================================================
controller.pt_accktp = (req, res) => {
    res.render('pajak tahunan/accktp/pt_accktp', {
        title: `Pajak Tahunan ${req.query.jk} Acc KTP`,
        today: today,
        qs:req.query,
        userData: req.session.user       
    })
}

controller.pt_accktp_form = (req, res) => {
    conn.query(`select * from klien`, (err, klien) => {
        conn.query(`select * from pajaktahunan`, (err, data) => {
            conn.query(`select * from biaya`, (err, biaya) => {
                conn.query(`select * from bank`, (err, bank) => {
                    res.render('pajak tahunan/accktp/pt_accktp_form', {
                        title: `Pajak Tahunan ${req.query.jk} ${req.query.provinsi} Acc KTP`,
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
// /ACC KTP =============================================================================================


controller.input_pt_lengkap = (req, res) => {
    conn.query(`insert into pajaktahunan(id,id_klien,provinsi,jenis_jasa,tanggal,nopol,atas_nama,save_kontak,catatan,
        id_biaya,biaya,id_bank,tgl_trf,created_user)values(null,${req.body.id_klien},'${req.body.provinsi}','${req.body.jenis_jasa}',
    '${req.body.tanggal}','${req.body.nopol}','${req.body.atas_nama}','${req.body.save_kontak}','${req.body.catatan}','${req.body.id_biaya}',
    ${req.body.biaya},${req.body.id_bank},'${req.body.tgl_trf}','${req.body.created_user}')`, (err, results) => {
        console.log('body',req.body);
        if (err) {
            console.log(err);
        }
        res.redirect('/pt_jabar_r2_lengkap')
    })
}



module.exports = controller;