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
            case 1:
                menuMahasiswa();
                break;
            case 2:
                menuJurusan();
                break;
            case 3:
                menuDosen();
                break;
            case 4:
                menuMatakuliah();
                break;
            case 5:
                menuKontrak();
                break;
            case 6:
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
            case 1:
                listMahasiswa();
                break;
            case 2:
                cariMahasiswa();
                break;
            case 3:
                addMahasiswa();
                break;
            case 4:
                hapusMahasiswa();
                break;
            case 5:
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
            case 1:
                listJurusan();
                break;
            case 2:
                cariJurusan();
                break;
            case 3:
                addJurusan();
                break;
            case 4:
                hapusJurusan();
                break;
            case 5:
                mainJurusan();
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
            case 1:
                listDosen();
                break;
            case 2:
                cariDosen();
                break;
            case 3:
                addDosen();
                break;
            case 4:
                hapusDosen();
                break;
            case 5:
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
            case 1:
                listMatakuliah();
                break;
            case 2:
                cariMatakuliah();
                break;
            case 3:
                addMatakuliah();
                break;
            case 4:
                hapusMatakuliah();
                break;
            case 5:
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
            case 1:
                listKontrak();
                break;
            case 2:
                cariKontrak();
                break;
            case 3:
                addKontrak();
                break;
            case 4:
                hapusKontrak();
                break;
            case 5:
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
