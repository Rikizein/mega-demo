const controller = {}

const bcrypt = require('bcrypt');
const axios = require('axios');
const config = require('../config')

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


controller.sessionChecker = (req, res, next) => {
    if (req.session.user && req.session.user.token) {
        next()
    } else {
        req.flash("sessionMessage", "Sesi Anda sudah berakhir, silahkan login kembali !")
        res.redirect('/')
    }
}

controller.login_page = (req, res) => {
    res.render('login', {
        title: 'login',
        tahun: tahun,
        loginMessage: req.flash("loginMessage"),
        updateUser: req.flash("updateUser")
    })
}

controller.login = (req, res) => {
    if (req.body.username === 'superuser' && req.body.password === 'superuser') {
        res.redirect('/dashboard')
    }
    req.flash('loginMessage', "Username atau password yang Anda masukkan salah !")
        return res.redirect('/');
}

// controller.login = (req, res) => {
//     if (!req.body.username || !req.body.password) {
//         req.flash('loginMessage', "please fill all form input");
//         return res.redirect('/');
//     }
//     axios.post(`${config.baseurl}/users/login`, {
//         username: req.body.username,
//         password: req.body.password
//     })
//         .then(function (response) {
//             console.log('responsahh', response.data.data);
//             if (response.data.err) {
//                 req.flash('loginMessage', response.data.message);
//                 return res.redirect('/');
//             }
//             if (response.data.data) {
//                 req.session.user = response.data.data;
//                 res.redirect('/dashboard');
//             } else {
//                 req.flash('loginMessage', response.data.message);
//                 return res.redirect('/');
//             }
//         })
//         .catch(function (err) {
//             console.error(err);
//             req.flash('loginMessage', "Terjadi kesalahan, silahkan hubungi Administrator");
//             return res.redirect('/');
//         })
// }

controller.register_page = (req, res) => {
    res.render('register', {
        title: 'Register',
        tahun: tahun,
        failedMessageRegister: req.flash("failedMessageRegister"),
        successMessageRegister: req.flash("successMessageRegister"),
    })
}

controller.register = (req, res) => {
    if (req.body.password !== req.body.retypePassword) {
        req.flash('failedMessageRegister', 'password tidak sama !')
        return res.redirect('/register_page')
    }
    axios.post(`${config.baseurl}/users/register`, {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    })
        .then((response) => {
            if (response.data.err) {
                req.flash('failedMessageRegister', response.data.message);
                res.redirect('/register_page')
            } else {
                req.flash('successMessageRegister', response.data.message)
                req.session.user = response.data.data;
                res.redirect('/register_page')
            }
        })
        .catch(function (err) {
            console.error(err);
            req.flash('failedMessageRegister', "something went wrong");
            res.redirect('/register_page');
        })
}

controller.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/')
    })
}

controller.users = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query(`select * from user`, (err, user) => {
                if (err) {
                    console.log(err);
                }
                res.render('pages/users/user', {
                    title: "Data User",
                    user: user,
                    tahun: tahun,
                    successMessageRegister: req.flash('successMessageRegister'),
                    failedMessageRegister: req.flash('failedMessageRegister'),
                    deleteUserSuccess: req.flash("deleteUserSuccess"),
                    deleteUserFailed: req.flash("deleteUserFailed"),
                    userData: req.session.user
                })
        })
    })
}

controller.tambah_user = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query(`select * from user where username = '${req.body.username}'`, (err, userAccount) => {
            if (userAccount.length > 0) {
                req.flash('failedMessageRegister', `username ${req.body.username} sudah dipakai`);
                return res.redirect('/users')
            }
            if (req.body.password !== req.body.retypePassword) {
                req.flash('failedMessageRegister', 'password tidak sama !')
                return res.redirect('/users')
            }
            conn.query(`INSERT INTO user (username, password, role) VALUES
              ('${req.body.username}', '${bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8))}', 
              '${req.body.role}')`, (err, newUser) => {
                if (err) {
                    req.flash('failedMessageRegister', `Gagal menyimpan user baru`);
                    return res.redirect('/users')
                }
                req.flash('successMessageRegister', 'Register Berhasil, user baru berhasil ditambahkan')
                res.redirect('/users')
            })
        })
    })
}

controller.edit_users = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
            conn.query(`select * from user where id = ?`, [id], (err, user) => {
                if (err) {
                    console.log(err);
                }
                res.render('pages/users/edit_user', {
                    title: "Edit User",
                    user: user[0],
                    tahun: tahun,
                    userData: req.session.user
                })
            })
    })
}

controller.update_user = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query(`update user set username = '${req.body.username}', role = '${req.body.role}' 
         where id = '${req.body.id}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                req.flash("updateUser", "User berhasil di update, silahkan login kembali")
                res.redirect('/')
            })
    })
}

controller.delete_users = (req, res) => {
    const { username } = req.params;
    req.getConnection((err, conn) => {
        conn.query(`delete from user where username = ?`, [username], (err, rows) => {
            if (err) {
                console.log(err);
                req.flash("deleteUserFailed", "Gagal menghapus data")
                return res.redirect('/users')
            }
            req.flash("deleteUserSuccess", "Data berhasil dihapus")
            res.redirect('/users')
        })
    })
}

// controller.forgotPage = (req, res) => {
//     res.render('pages/users/forgot', {
//         title: "Lupa Password",
//         messageForgot: req.flash("forgotMessage")
//     })
// }

// controller.forgot = (req, res) => {
//     req.getConnection((err, conn) => {
//         conn.query(`select * from user where username = '${req.body.username}'`, (err, users) => {
//             if (users.length > 0) {
//                 console.log('ini user', users);
//                 req.session.user = users[0]
//                 res.redirect('/update_password_page')
//             } else {
//                 req.flash('forgotMessage', 'Username tidak ditemukan, silahkan masukkan username dengan benar!')
//                 return res.redirect('/forgot_page')
//             }
//         })
//     })
// }

controller.update_password_page = (req, res) => {
    console.log("Cek session admin", req.session.user.username);
    res.render('pages/users/update_password', {
        title: "Update Password",
        tahun: tahun,
        messageUpdate: req.flash("updateMessage"),
        messageUpdateFailed: req.flash("updateMessageFailed"),
        userData: req.session.user
    })
}

controller.update_password = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query(`update user set username = '${req.body.username}', password = '${bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8))}'
                 where username = '${req.body.username}'`, (err, rows) => {
            if (err) {
                console.log(err);
                req.flash('updateMessageFailed', 'Terjadi Kesalahan, Silahkan Hubungi Admin!')
                return res.redirect('/update_password_page')
            }
            req.flash('updateMessage', 'Password Anda berhasil di update, silahkan login!')
            res.redirect('/update_password_page')
        })
    })
}


controller.dashboard = (req, res) => {
    res.render('dashboard', {
        title:"Dashboard",
        qs:req.query,
        userData:req.session.user
    })
}


module.exports = controller;