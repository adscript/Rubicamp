const Table = require('cli-table');
const readline = require('readline');
const sqlite3 = require('sqlite3').verbose();

//koneksi db
const dbFile = __dirname + "/university.db";
let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function loginMenu() {
    console.log("===========================================================");
    console.log("Welcome to Institut Teknologi Bandung");
    console.log("Jl Ganeca No 10");
    console.log("===========================================================");
    rl.question("username: ", (username) => {
        console.log("==========================================================");
        rl.question("password: ", (password) => {
            console.log("==========================================================");
            db.serialize( () => {
                let sql = `SELECT * FROM user WHERE user.username="${username}" AND user.pass = "${password}"`;
                db.get(sql, (err, rows) => {
                    if (err) throw err;
                    if (rows) {
                        console.log(`Welcome, ${rows.username}. Your access level is: ${rows.userrole}`);
                        console.log("==========================================================");
                        mainMenu();                    
                    } else {
                        console.log("tidak ada user terdaftar");
                        loginMenu();
                    }
                });
            });
        })
    })
}

function mainMenu() {
    console.log("===========================================================");
    console.log("silahkan pilih opsi dibawah ini");
    console.log("[1] Mahasiswa");
    console.log("[2] Jurusan");
    console.log("[3] Dosen");
    console.log("[4] Matakuliah");
    console.log("[5] Kontrak");
    console.log("[6] Keluar");
    console.log("===========================================================");
    rl.question("Masukkan salah satu no. dari opsi diatas:",(num) => {
        switch(num){
            case "1":
                menuMahasiswa();
                break;
            case "2":
                menuJurusan();
                break;
            case "3":
                menuDosen();
                break;
            case "4":
                menuMatakuliah();
                break;
            case "5":
                menuKontrak();
                break;
            case "6":
                logout();
                break;
            default:
                console.log("Tidak ada pilihan");
                mainMenu();
                break;
        }
    })
}

function menuMahasiswa() {
    console.log("===========================================================");
    console.log("silahkan pilih opsi dibawah ini");
    console.log("[1] daftar mahasiswa");
    console.log("[2] cari mahasiswa");
    console.log("[3] tambah mahasiswa");
    console.log("[4] hapus mahasiswa");
    console.log("[5] kembali");
    console.log("===========================================================");
    rl.question("Masukkan salah satu no. dari opsi diatas:",(num) => {
        switch(num){
            case "1":
                listMahasiswa();
                break;
            case "2":
                cariMahasiswa();
                break;
            case "3":
                addMahasiswa();
                break;
            case "4":
                hapusMahasiswa();
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Tidak ada pilihan");
                menuMahasiswa();
                break;
        }
    })
}

function menuJurusan() {
    console.log("===========================================================");
    console.log("silahkan pilih opsi dibawah ini");
    console.log("[1] daftar jurusan");
    console.log("[2] cari jurusan");
    console.log("[3] tambah jurusan");
    console.log("[4] hapus jurusan");
    console.log("[5] kembali");
    console.log("===========================================================");
    rl.question("Masukkan salah satu no. dari opsi diatas:",(num) => {
        switch(num){
            case "1":
                listJurusan();
                break;
            case "2":
                cariJurusan();
                break;
            case "3":
                addJurusan();
                break;
            case "4":
                hapusJurusan();
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Tidak ada pilihan");
                menuJurusan();
                break;
        }
    })
}

function menuDosen() {
    console.log("===========================================================");
    console.log("silahkan pilih opsi dibawah ini");
    console.log("[1] daftar dosen");
    console.log("[2] cari dosen");
    console.log("[3] tambah dosen");
    console.log("[4] hapus dosen");
    console.log("[5] kembali");
    console.log("===========================================================");
    rl.question("Masukkan salah satu no. dari opsi diatas:",(num) => {
        switch(num){
            case "1":
                listDosen();
                break;
            case "2":
                cariDosen();
                break;
            case "3":
                addDosen();
                break;
            case "4":
                hapusDosen();
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Tidak ada pilihan");
                menuDosen();
                break;
        }
    })
}

function menuMatakuliah() {
    console.log("===========================================================");
    console.log("silahkan pilih opsi dibawah ini");
    console.log("[1] daftar matakuliah");
    console.log("[2] cari matakuliah");
    console.log("[3] tambah matakuliah");
    console.log("[4] hapus matakuliah");
    console.log("[5] kembali");
    console.log("===========================================================");
    rl.question("Masukkan salah satu no. dari opsi diatas:",(num) => {
        switch(num){
            case "1":
                listMatakuliah();
                break;
            case "2":
                cariMatakuliah();
                break;
            case "3":
                addMatakuliah();
                break;
            case "4":
                hapusMatakuliah();
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Tidak ada pilihan");
                menuMatakuliah();
                break;
        }
    })
}

function menuKontrak() {
    console.log("===========================================================");
    console.log("silahkan pilih opsi dibawah ini");
    console.log("[1] daftar kontrak");
    console.log("[2] cari kontrak");
    console.log("[3] tambah kontrak");
    console.log("[4] hapus kontrak");
    console.log("[5] kembali");
    console.log("===========================================================");
    rl.question("Masukkan salah satu no. dari opsi diatas:",(num) => {
        switch(num){
            case "1":
                listKontrak();
                break;
            case "2":
                cariKontrak();
                break;
            case "3":
                addKontrak();
                break;
            case "4":
                hapusKontrak();
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Tidak ada pilihan");
                menuKontrak();
                break;
        }
    })
}

function logout() {
    console.log("===========================================================");
    console.log("kamu telah keluar.");
    loginMenu();
}

function listMahasiswa() {
    db.serialize( () => {
        let sql = "SELECT * FROM mahasiswa";
        db.all(sql, (err, rows) => {
            if (err) throw err;
            if (rows) {
                // cetak isi rows
                let table = new Table({
                    head: ['NIM', 'Nama', 'Alamat', 'Jurusan'],
                    colWidths: [10, 25, 20, 10]
                });
                rows.forEach( (mahasiswa) => {
                    table.push(
                        [`${mahasiswa.nim}`, `${mahasiswa.nama}`, `${mahasiswa.alamat}`, `${mahasiswa.idJurusan}`]
                    );
                });
                console.log(table.toString());
                menuMahasiswa();
            } else {
                console.log("tidak ada mahasiswa terdaftar");
                menuMahasiswa();
            }
        });
    });
}

function listJurusan() {
    db.serialize( () => {
        let sql = "SELECT * FROM jurusan";
        db.all(sql, (err, rows) => {
            if (err) throw err;
            if (rows) {
                // cetak isi rows
                let table = new Table({
                    head: ['No', 'Nama Jurusan'],
                    colWidths: [10, 25]
                });
                rows.forEach( (jurusan, idx) => {
                    table.push(
                        [`${idx}`, `${jurusan.nama_jurusan}`]
                    );
                });
                console.log(table.toString());
                menuJurusan();
            } else {
                console.log("tidak ada jurusan terdaftar");
                menuJurusan();
            }
        });
    });
}

function listDosen() {
    db.serialize( () => {
        let sql = "SELECT * FROM dosen";
        db.all(sql, (err, rows) => {
            if (err) throw err;
            if (rows) {
                // cetak isi rows
                let table = new Table({
                    head: ['NIP', 'Nama Dosen'],
                    colWidths: [15, 25]
                });
                rows.forEach( (dosen) => {
                    table.push(
                        [`${dosen.NIP}`, `${dosen.nama_dosen}`]
                    );
                });
                console.log(table.toString());
                menuDosen();
            } else {
                console.log("tidak ada dosen terdaftar");
                menuDosen();
            }
        });
    });
}

function listMatakuliah() {
    db.serialize( () => {
        let sql = "SELECT * FROM matakuliah";
        db.all(sql, (err, rows) => {
            if (err) throw err;
            if (rows) {
                // cetak isi rows
                let table = new Table({
                    head: ['ID', 'Nama Matakuliah', 'SKS'],
                    colWidths: [10, 30, 10, 10]
                });
                rows.forEach( (matkul) => {
                    table.push(
                        [`${matkul.idMatkul}`, `${matkul.nama_mk}`, `${matkul.sks}`]
                    );
                });
                console.log(table.toString());
                menuMatakuliah();
            } else {
                console.log("tidak ada matakuliah terdaftar");
            }
        });
    });
}

function listKontrak() {
    db.serialize( () => {
        let sql = "SELECT * FROM kontrak";
        db.all(sql, (err, rows) => {
            if (err) throw err;
            if (rows) {
                // cetak isi rows
                let table = new Table({
                    head: ['ID', 'Nilai', 'Matakuliah', 'NIM', 'NIP'],
                    colWidths: [10, 25, 10, 10, 15]
                });
                rows.forEach( (kontrak) => {
                    table.push(
                        [`${kontrak.id}`, `${kontrak.nilai}`, `${kontrak.idMatkul}`, `${kontrak.nim}`, `${kontrak.NIP}`]
                    );
                });
                console.log(table.toString());
                menuKontrak();
            } else {
                console.log("tidak ada mahasiswa terdaftar");
            }
        });
    });
}

function addMahasiswa(){
    console.log("Lengkapi data di bawah ini: ");
    rl.question("NIM:",(nim) => {
        rl.question("Nama:",(nama) => {
            rl.question("jurusan:", (jur) => {
                rl.question("alamat:", (alamat) => {
                    db.serialize(() => {
                        let sql = `INSERT INTO mahasiswa (nim, nama, umur, alamat, idJurusan) VALUES ("${nim}", "${nama}", 17, "${alamat}", "${jur}")`;
                        db.run(sql, (err) => {
                            if(err) throw err;
                            listMahasiswa();
                        });
                    
                    });
                })
            })
        })
    })
}
function addJurusan(){
    console.log("Lengkapi data di bawah ini: ");
    rl.question("Jurusan:",(jur) => {
                    db.serialize(() => {
                        let sql = `INSERT INTO jurusan (nama_jurusan) VALUES ("${jur}")`;
                        db.run(sql, (err) => {
                            if(err) throw err;
                            listJurusan();
                        });                    
                    });
            });
}

function addDosen(){
    console.log("Lengkapi data di bawah ini: ");
    rl.question("NIP:",(nip) => {
        rl.question("Nama Dosen:",(nama) => {
                    db.serialize(() => {
                        let sql = `INSERT INTO dosen (NIP, nama_dosen) VALUES ("${nip}", "${nama}")`;
                        db.run(sql, (err) => {
                            if(err) throw err;
                            listDosen();
                        });                    
                    });
            });
    });
}

function addMatakuliah(){
    console.log("Lengkapi data di bawah ini: ");
    rl.question("Nama Matakuliah:",(nama) => {
        rl.question("SKS:",(sks) => {
                    db.serialize(() => {
                        let sql = `INSERT INTO matakuliah (nama_mk, sks) VALUES ("${nama}", "${sks}")`;
                        db.run(sql, (err) => {
                            if(err) throw err;
                            listMatakuliah();
                        });                    
                    });
            });
    });
}

function addKontrak(){
    console.log("Lengkapi data di bawah ini: ");
    rl.question("Nilai:",(nilai) => {
        rl.question("Matakuliah:",(matkul) => {
            rl.question("NIM:",(nim) => {
                rl.question("NIP:",(nip) => {
                    db.serialize(() => {
                        let sql = `INSERT INTO kontrak (nilai, idMatkul, nim, NIP) VALUES ("${nilai}", "${matkul}", "${nim}", "${nip}")`;
                        db.run(sql, (err) => {
                            if(err) throw err;
                            listMatakuliah();
                        });                    
                    });
                });
            });
        });
    });
}



function cariMahasiswa(){
    console.log("===========================================================");
    rl.question("Masukkan NIM: ",(nim) => {
        console.log("===========================================================");
        db.serialize(() => {

            let sql = "SELECT * FROM mahasiswa WHERE nim=?";
        
            db.get(sql, [nim], (err, mahasiswa) => {
                if (err) throw err;

                if(mahasiswa){
                    // cetak isi row
                    console.log("nim          : " + nim);
                    console.log("nama         : " + mahasiswa.nama); 
                    console.log("alamat       : " + mahasiswa.alamat);
                    console.log("jurusan      : " + mahasiswa.idJurusan);
                } else 
                    console.log("Tidak ada data/hasil");
                menuMahasiswa();
            });
        
        });
    })
}

function cariJurusan(){
    console.log("===========================================================");
    rl.question("Masukkan Nama Jurusan: ",(nama) => {
        console.log("===========================================================");
        db.serialize(() => {

            let sql = "SELECT * FROM jurusan WHERE nama_jurusan=?";
        
            db.get(sql, [nama], (err, jurusan) => {
                if (err) throw err;

                if(jurusan){
                    // cetak isi row
                    console.log("id           : " + jurusan.idJurusan);
                    console.log("nama jurusan : " + jurusan.nama_jurusan); 
                } else 
                    console.log("Tidak ada data/hasil");
                menuJurusan();
            });
        
        });
    })
}

function cariDosen(){
    console.log("===========================================================");
    rl.question("Masukkan NIP: ",(nip) => {
        console.log("===========================================================");
        db.serialize(() => {

            let sql = "SELECT * FROM dosen WHERE NIP=?";
        
            db.get(sql, [nip], (err, dosen) => {
                if (err) throw err;

                if(dosen){
                    // cetak isi row
                    console.log("nip          : " + dosen.NIP);
                    console.log("nama         : " + dosen.nama_dosen); 
                } else 
                    console.log("Tidak ada data/hasil");
                menuDosen();
            });
        
        });
    })
}

function cariMatakuliah(){
    console.log("===========================================================");
    rl.question("Masukkan Nama Matakuliah: ",(nama) => {
        console.log("===========================================================");
        db.serialize(() => {

            let sql = "SELECT * FROM matakuliah WHERE nama_mk=?";
        
            db.get(sql, [nama], (err, matakuliah) => {
                if (err) throw err;

                if(matakuliah){
                    // cetak isi row
                    console.log("id           : " + matakuliah.id);
                    console.log("nama         : " + matakuliah.nama_mk); 
                    console.log("sks          : " + matakuliah.sks);
                } else 
                    console.log("Tidak ada data/hasil");
                menuMatakuliah();
            });
        
        });
    })
}

function cariKontrak(){
    console.log("===========================================================");
    rl.question("Masukkan id: ",(id) => {
        console.log("===========================================================");
        db.serialize(() => {

            let sql = "SELECT * FROM kontrak WHERE id=?";
        
            db.get(sql, [id], (err, kontrak) => {
                if (err) throw err;

                if(kontrak){
                    // cetak isi row
                    console.log("id           : " + id);
                    console.log("nilai        : " + kontrak.nilai); 
                    console.log("idMatkul     : " + kontrak.idMatkul);
                    console.log("NIM          : " + kontrak.nim);
                    console.log("NIP          : " + kontrak.NIP);
                } else 
                    console.log("Tidak ada data/hasil");
                menuKontrak();
            });
        
        });
    })
}

function hapusMahasiswa(){
    console.log("===========================================================");
    rl.question("Masukkan NIM mahasiswa yang akan dihapus:",(nim) => {
        db.serialize(() => {
            let sql = `DELETE FROM mahasiswa WHERE nim=?`;
            db.run(sql, [nim], (err) => {
                if (!err){ 
                    console.log(`Mahasiswa dengan NIM:${nim} telah dihapus`);
                    console.log("===========================================================");
                    listMahasiswa();
                }
            });
        });
    })
}

function hapusJurusan(){
    console.log("===========================================================");
    rl.question("Masukkan nama jurusan yang akan dihapus:",(nama) => {
        db.serialize(() => {
            let sql = `DELETE FROM jurusan WHERE nama_jurusan=?`;
            db.run(sql, [nama], (err) => {
                if (!err){ 
                    console.log(`Jurusan ${nama} telah dihapus`);
                    console.log("===========================================================");
                    listJurusan();
                }
            });
        });
    })
}

function hapusDosen(){
    console.log("===========================================================");
    rl.question("Masukkan NIP dosen yang akan dihapus:",(nip) => {
        db.serialize(() => {
            let sql = `DELETE FROM dosen WHERE NIP=?`;
            db.run(sql, [nip], (err) => {
                if (!err){ 
                    console.log(`dosen dengan NIP = ${NIP} telah dihapus`);
                    console.log("===========================================================");
                    listDosen();
                }
            });
        });
    })
}

function hapusMatakuliah(){
    console.log("===========================================================");
    rl.question("Masukkan nama matakuliah yang akan dihapus:",(nama) => {
        db.serialize(() => {
            let sql = `DELETE FROM matakuliah WHERE nama_mk=?`;
            db.run(sql, [nama], (err) => {
                if (!err){ 
                    console.log(`Matakuliah ${nama} telah dihapus`);
                    console.log("===========================================================");
                    listMatakuliah();
                }
            });
        });
    })
}

function hapusKontrak(){
    console.log("===========================================================");
    rl.question("Masukkan ID Kontrak yang akan dihapus:",(id) => {
        db.serialize(() => {
            let sql = `DELETE FROM kontrak WHERE id=?`;
            db.run(sql, [id], (err) => {
                if (!err){ 
                    console.log(`Kontrak dengan ID = ${id} telah dihapus`);
                    console.log("===========================================================");
                    listKontrak();
                }
            });
        });
    })
}

loginMenu();
