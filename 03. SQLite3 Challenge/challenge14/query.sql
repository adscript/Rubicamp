CREATE TABLE mahasiswa(
   nim    CHAR(8) PRIMARY KEY  NOT NULL,
   nama           VARCHAR(20)  NOT NULL,
   alamat         VARCHAR(50)  NOT NULL,
   idJurusan      INTEGER,
   FOREIGN KEY(idJurusan) references jurusan(idJurusan)
);

CREATE TABLE jurusan(
   idJurusan INTEGER PRIMARY KEY AUTOINCREMENT,
   nama_jurusan VARCHAR(30)  NOT NULL
);

CREATE TABLE dosen(
   idDosen INTEGER PRIMARY KEY AUTOINCREMENT,
   nama_dosen  VARCHAR(20)  NOT NULL
);

CREATE TABLE matakuliah(
   idMatkul INTEGER PRIMARY KEY AUTOINCREMENT,
   nama_mk    VARCHAR(20)  NOT NULL,
   sks        VARCHAR(30)  NOT NULL
);

CREATE TABLE nilai(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   nilai      VARCHAR(10), 
   idMatkul   INTEGER,
   FOREIGN KEY(idMatkul) references matakuliah(idMatkul),
   nim        CHAR(8),
   FOREIGN KEY(nim) references mahasiswa(nim),
   idDosen    INTEGER,
   FOREIGN KEY(idDosen) references dosen(idDosen)
);

INSERT INTO mahasiswa(nim,nama,alamat,idJurusan)
VALUES ( '10115110', 'Adnan Radja Maulana', 'Ujungberung', 1 );

INSERT INTO jurusan(nama_jurusan)
VALUES ('MATEMATIKA');

INSERT INTO dosen(nama_dosen)
VALUES ('Warsoma');

INSERT INTO matakuliah(nama_mk,sks)
VALUES ('ANALISIS DATA', '4');

INSERT INTO nilai(nilai, idMatkul, nim, idDosen)
VALUES ('90', 1, 10115110, 1);