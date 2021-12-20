var express = require('express');
var router = express.Router();

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


const userController = require('../controllers/userController')
const pajakController = require('../controllers/pajakController')
const stnk5Controller = require('../controllers/stnk5Controller')
const duplikatController = require('../controllers/duplikatController')
const cabut_berkasController = require('../controllers/cabut_berkasController')
const mutasi_masukController = require('../controllers/mutasi_masukController')
const mutasi_lokalController = require('../controllers/mutasi_lokalController')
const perpanjangan_kirController = require('../controllers/perpanjangan_kirController')
const cabut_kirController = require('../controllers/cabut_kirController')
const sj_poldaController = require('../controllers/sj_poldaController')
const buka_blokir_leasingController = require('../controllers/buka_blokir_leasingController')
const buka_blokir_poldaController = require('../controllers/buka_blokir_poldaController')
const absah_bpkbController = require('../controllers/absah_bpkbController')
const absah_blokir_bpkbController = require('../controllers/absah_blokir_bpkbController')

// USER ========================================================================================
router.get('/', userController.login_page)
router.post('/login', userController.login)
router.get('/register_page', userController.register_page)
router.post('/register', userController.register)
router.get('/logout', userController.logout);
router.get('/users', userController.sessionChecker, userController.users);
router.post('/tambah_user', userController.tambah_user)
router.get('/edit_users/:id', userController.sessionChecker, userController.edit_users);
router.post('/update_user/:id', userController.update_user);
// =============================================================================================

// DASHBOARD ===================================================================================
router.get('/dashboard', userController.dashboard)
// =============================================================================================


// PAJAK TAHUNAN LENGKAP =======================================================================
router.get('/pt_lengkap', pajakController.pt_lengkap)
router.get('/pt_lengkap_form', pajakController.pt_lengkap_form)
// /PAJAK TAHUNAN LENGKAP ======================================================================

// PAJAK TAHUNAN ACC KTP =======================================================================
router.get('/pt_accktp', pajakController.pt_accktp)
router.get('/pt_accktp_form', pajakController.pt_accktp_form)
// /PAJAK TAHUNAN ACC KTP ======================================================================




// STNK 5 TAHUNAN LENGKAP =======================================================================
router.get('/stnk5_lengkap', stnk5Controller.stnk5_lengkap)
router.get('/stnk5_lengkap_form', stnk5Controller.stnk5_lengkap_form)
// /stnk5 TAHUNAN LENGKAP ======================================================================

// STNK 5 TAHUNAN ACC KTP =======================================================================
router.get('/stnk5_accktp', stnk5Controller.stnk5_accktp)
router.get('/stnk5_accktp_form', stnk5Controller.stnk5_accktp_form)
// /STNK 5 TAHUNAN ACC KTP ======================================================================



// DUPLIKAT STNK LENGKAP =======================================================================
router.get('/duplikat_lengkap', duplikatController.duplikat_lengkap)
router.get('/duplikat_lengkap_form', duplikatController.duplikat_lengkap_form)
// /DUPLIKAT STNK LENGKAP ======================================================================

// DUPLIKAT STNK ACC KTP =======================================================================
router.get('/duplikat_accktp', duplikatController.duplikat_accktp)
router.get('/duplikat_accktp_form', duplikatController.duplikat_accktp_form)
// /DUPLIKAT STNK ACC KTP ======================================================================



// CABUT BERKAS =======================================================================
router.get('/cabut_berkas', cabut_berkasController.cabut_berkas)
router.get('/cabut_berkas_form', cabut_berkasController.cabut_berkas_form)
// /CABUT BERKAS ======================================================================



// MUTASI MASUK =======================================================================
router.get('/mutasi_masuk', mutasi_masukController.mutasi_masuk)
router.get('/mutasi_masuk_form', mutasi_masukController.mutasi_masuk_form)
// /MUTASI MASUK ======================================================================



// MUTASI LOKAL =======================================================================
router.get('/mutasi_lokal', mutasi_lokalController.mutasi_lokal)
router.get('/mutasi_lokal_form', mutasi_lokalController.mutasi_lokal_form)
// /MUTASI LOKAL ======================================================================



// PERPANJANGAN KIR=======================================================================
router.get('/perpanjangan_kir', perpanjangan_kirController.perpanjangan_kir)
router.get('/perpanjangan_kir_form', perpanjangan_kirController.perpanjangan_kir_form)
// /PERPANJANGAN KIR======================================================================



// CABUT KIR=======================================================================
router.get('/cabut_kir', cabut_kirController.cabut_kir)
router.get('/cabut_kir_form', cabut_kirController.cabut_kir_form)
// /CABUT KIR======================================================================




// SURAT JALAN POLDA=======================================================================
router.get('/sj_polda_form', sj_poldaController.sj_polda_form)
// /SURAT JALAN POLDA======================================================================



// BUKA BLOKIR LEASING=======================================================================
router.get('/buka_blokir_leasing', buka_blokir_leasingController.buka_blokir_leasing)
router.get('/buka_blokir_leasing_form', buka_blokir_leasingController.buka_blokir_leasing_form)
// /BUKA BLOKIR LEASING======================================================================



// BUKA BLOKIR POLDA=======================================================================
router.get('/buka_blokir_polda', buka_blokir_poldaController.buka_blokir_polda)
router.get('/buka_blokir_polda_form', buka_blokir_poldaController.buka_blokir_polda_form)
// /BUKA BLOKIR POLDA======================================================================



// ABSAH BPKB=======================================================================
router.get('/absah_bpkb', absah_bpkbController.absah_bpkb)
router.get('/absah_bpkb_form', absah_bpkbController.absah_bpkb_form)
// /ABSAH BPKB======================================================================



// ABSAH BLOKIR BPKB=======================================================================
router.get('/absah_blokir_bpkb', absah_blokir_bpkbController.absah_blokir_bpkb)
router.get('/absah_blokir_bpkb_form', absah_blokir_bpkbController.absah_blokir_bpkb_form)
// /ABSAH BLOKIR BPKB======================================================================





router.get('/testing', (req, res) => {
  let response = {
    err: false,
    message: '',
    data: null
  }
  req.getConnection((err, conn) => {
    conn.query(`select * from tes`, (err, tes) => {
      if (err) {
        response.err = err;
        response.message = "error when query to database";
        return res.json(response);
      }
      response.data = {
        tes: tes,
      };
      res.json(response);
    })
  })
  
});

router.get('/testing/:id', (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`select * from tes where id = '${req.params.id}'`, (err, data) => {
      res.send(data)
    })
  })
})

router.put('/edit/:id', (req, res) => {
  req.getConnection((err, conn) => {
    let newData = req.body;
    conn.query(`update tes set ? where id = '${req.params.id}'`, [newData], (err, results) => {
      res.send(newData)
    })
  })
})


router.get('/tes', (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`select * from tes`, (err, data) => {
      res.render('tes', {
        title:"tes",
        data:data,
        userData:req.session.user
      })
    })
  })
})

router.post('/tes', (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`insert into tes(id,nama,alamat)values(null,'${req.body.nama}','${req.body.alamat}')`, (err, result) => {
      res.send({
        success: true,
        message: "Insert new customer successfully...."
      })
    })
  })
})


router.get('/pajaktahunan', (req, res) => {
  let response = {
    err: false,
    message: '',
    data: null
  }
  req.getConnection((err, conn) => {
    conn.query(`select * from pajaktahunan`, (err, pt) => {
      if (err) {
        response.err = err;
        response.message = "error when query to database";
        return res.json(response);
      }
      response.data = {
        pt: pt,
      };
      res.json(response);
    })
  })
  
});

router.post('/pt_jabar_r2_lengkap', (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`insert into pajaktahunan(id,id_klien,provinsi,jenis_jasa,tanggal,nopol,atas_nama,save_kontak,catatan,
      id_biaya,biaya,id_bank,tgl_trf,created_user)values(null,${req.body.id_klien},'${req.body.provinsi}','${req.body.jenis_jasa}',
  '${req.body.tanggal}','${req.body.nopol}','${req.body.atas_nama}','${req.body.save_kontak}','${req.body.catatan}','${req.body.id_biaya}',
  ${req.body.biaya},${req.body.id_bank},'${req.body.tgl_trf}','${req.body.created_user}')`, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send({
      success: true,
      message: "Insert new customer successfully...."
    })
  })
  })
})


router.delete('/delete/:id', (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`delete from tes where id = '${req.params.id}'`, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send({
        success: true,
        message: "Delete  successfully...."
      })
    })
  })
})

// TES ===============================================================================================

const axios = require('axios');
const config = {
  baseURL: "https://api.rajaongkir.com",
  headers: {
    "key": 'd750abceafbfb8e29e2662fca50517d8'
  }
};

router.post('/', function(req, res, next) {
  axios.post('/starter/cost', {
    origin: req.body.origin,
    destination: req.body.destination,
    weight: req.body.weight,
    courier: req.body.courier
  }, config)
  .then(function (response) {
    // handle success
    res.status(200).json(response.data.rajaongkir);
  })
  .catch(function (err) {
    // handle error
    res.status(500).json(err)
  });
});



router.get('/province', function(req, res, next) {
  axios.get('/starter/province', config)
  .then(function (response) {
    // handle success
    res.status(200).json(response.data.rajaongkir.results);
  })
  .catch(function (err) {
    // handle error
    res.status(500).json(err)
  });
});

router.get('/city', function(req, res, next) {
  let province = req.query.province ? `?province=${req.query.province}` : '';
  axios.get(`/starter/city/${province}`, config)
  .then(function (response) {
    // handle success
    res.status(200).json(response.data.rajaongkir.results);
  })
  .catch(function (err) {
    // handle error
    res.status(500).json(err)
  });
});
module.exports = router;
