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
            }
        });
    });
}