CREATE TABLE mahasiswa(
   nim    CHAR(8) PRIMARY KEY,
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
   NIP         CHAR(12) PRIMARY KEY ,
   nama_dosen  VARCHAR(20)  NOT NULL
);

CREATE TABLE matakuliah(
   idMatkul INTEGER PRIMARY KEY AUTOINCREMENT,
   nama_mk    VARCHAR(20)  NOT NULL,
   sks        VARCHAR(30)  NOT NULL
);

CREATE TABLE kontrak(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   nilai      CHAR(1) NOT NULL, 
   idMatkul   INTEGER NOT NULL,
   nim        CHAR(8) NOT NULL,
   NIP    CHAR(12) NOT NULL,
   FOREIGN KEY(idMatkul) references matakuliah(idMatkul),
   FOREIGN KEY(nim) references mahasiswa(nim),
   FOREIGN KEY(NIP) references dosen(NIP)
);

INSERT INTO mahasiswa(nim,nama,alamat,idJurusan)
VALUES ( '10115110', 'Adnan Radja Maulana', 'Ujungberung', 1 );

INSERT INTO mahasiswa(nim,nama,alamat,idJurusan)
VALUES ( '101151032', 'Romario', 'Bandung', 2 );

INSERT INTO mahasiswa(nim,nama,alamat,idJurusan)
VALUES ( '101151054', 'Rendy', 'Bandung', 3 );

INSERT INTO jurusan(nama_jurusan)
VALUES ('MATEMATIKA');
INSERT INTO jurusan(nama_jurusan)
VALUES ('MESIN');
INSERT INTO jurusan(nama_jurusan)
VALUES ('MINYAK');

INSERT INTO dosen(NIP, nama_dosen)
VALUES ('132049212301','Warsoma');
INSERT INTO dosen(NIP, nama_dosen)
VALUES ('132049212302','Denny');
INSERT INTO dosen(NIP, nama_dosen)
VALUES ('132049212303','Aditya');

INSERT INTO matakuliah(nama_mk,sks)
VALUES ('ANALISIS DATA', '4');
INSERT INTO matakuliah(nama_mk,sks)
VALUES ('TERMODINAMIKA', '4');
INSERT INTO matakuliah(nama_mk,sks)
VALUES ('AGAMA', '4');

INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('A', 1, '10115110', '132049212301');
INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('B', 1, '10115032', '132049212301');
INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('E', 1, '10115054', '132049212301');
INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('E', 2, '10115110', '132049212302');
INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('E', 2, '10115032', '132049212302');
INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('E', 2, '10115054', '132049212302');
INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('C', 3, '10115110', '132049212303');
INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('B', 3, '10115032', '132049212303');
INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('E', 3, '10115054', '132049212303');