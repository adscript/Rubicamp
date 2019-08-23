CREATE TABLE mahasiswa(
   nim    CHAR(8) PRIMARY KEY,
   nama           VARCHAR(20)  NOT NULL,
   umur           INTEGER NOT NULL,
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
   sks        INTEGER  NOT NULL
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

CREATE TABLE admin(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   username       VARCHAR(18) NOT NULL,
   pass           VARCHAR(18) NOT NULL
);

INSERT INTO admin(username,pass)
VALUES ( 'adnanradjam', 'adminbaru');

INSERT INTO mahasiswa(nim,nama,umur,alamat,idJurusan)
VALUES ( '10115110', 'Adnan Radja Maulana',15, 'Ujungberung', 1 );

INSERT INTO mahasiswa(nim,nama,umur,alamat,idJurusan)
VALUES ( '10115032', 'Romario',20,'Bandung', 1 );

INSERT INTO mahasiswa(nim,nama,umur,alamat,idJurusan)
VALUES ( '10115054', 'Rendy',20,'Bandung', 1 );

INSERT INTO mahasiswa(nim,nama,umur,alamat,idJurusan)
VALUES ( '10115022', 'CUPUS',19,'Banten', 2 );

INSERT INTO jurusan(nama_jurusan)
VALUES ('MATEMATIKA');
INSERT INTO jurusan(nama_jurusan)
VALUES ('MESIN');
INSERT INTO jurusan(nama_jurusan)
VALUES ('MINYAK');
INSERT INTO jurusan(nama_jurusan)
VALUES ('DATA MINING');

INSERT INTO dosen(NIP, nama_dosen)
VALUES ('132049212301','Warsoma');
INSERT INTO dosen(NIP, nama_dosen)
VALUES ('132049212302','Denny');
INSERT INTO dosen(NIP, nama_dosen)
VALUES ('132049212303','Aditya');

INSERT INTO matakuliah(nama_mk,sks)
VALUES ('ANALISIS DATA', 4);
INSERT INTO matakuliah(nama_mk,sks)
VALUES ('TERMODINAMIKA', 4);
INSERT INTO matakuliah(nama_mk,sks)
VALUES ('AGAMA', 4);
INSERT INTO matakuliah(nama_mk,sks)
VALUES ('DATA MINING', 4);

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
INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('B', 3, '10115022', '132049212303');
INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('A', 1, '10115022', '132049212301');
INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('A', 4, '10115110', '132049212301');
INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('B', 4, '10115032', '132049212301');
INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('C', 4, '10115022', '132049212301');
INSERT INTO kontrak(nilai, idMatkul, nim, NIP)
VALUES ('D', 4, '10115054', '132049212301');

-- NO 1
SELECT mahasiswa.nim,mahasiswa.nama,mahasiswa.umur,mahasiswa.alamat,jurusan.nama_jurusan FROM mahasiswa INNER JOIN jurusan
   ON mahasiswa.idJurusan = jurusan.idJurusan;

-- NO 2
SELECT * FROM mahasiswa
WHERE umur < 20;

-- NO 3
SELECT DISTINCT mahasiswa.nim, mahasiswa.nama FROM mahasiswa
INNER JOIN kontrak ON kontrak.nim = mahasiswa.nim 
WHERE kontrak.nilai <= 'B';

-- NO 4
SELECT mahasiswa.nama, kontrak.nim, SUM(sks) FROM kontrak
JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
JOIN matakuliah ON matakuliah.idMatkul = kontrak.idMatkul
GROUP BY kontrak.nim
HAVING SUM(sks)>10;

-- NO 5
SELECT mahasiswa.nama, kontrak.nim, matakuliah.nama_mk FROM kontrak
JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
JOIN matakuliah ON matakuliah.idMatkul = kontrak.idMatkul
WHERE matakuliah.nama_mk = "DATA MINING";

-- NO 6
SELECT dosen.nama_dosen, kontrak.NIP, count(mahasiswa.nama) FROM kontrak
INNER JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
INNER JOIN dosen ON dosen.NIP = kontrak.NIP
GROUP BY kontrak.NIP;

-- NO 7
SELECT * FROM mahasiswa ORDER BY umur ASC;

-- NO 8
SELECT mahasiswa.nim, mahasiswa.nama, kontrak.nilai, matakuliah.nama_mk, jurusan.nama_jurusan, dosen.nama_dosen FROM kontrak
INNER JOIN mahasiswa ON mahasiswa.nim = kontrak.nim
INNER JOIN matakuliah ON matakuliah.idMatkul = kontrak.idMatkul
INNER JOIN dosen ON dosen.NIP = kontrak.NIP
INNER JOIN jurusan ON jurusan.idJurusan = mahasiswa.idJurusan
WHERE kontrak.nilai > "C" ORDER BY mahasiswa.nama ASC;


