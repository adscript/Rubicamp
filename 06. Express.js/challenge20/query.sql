CREATE TABLE databaru(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   string     TEXT       NOT NULL, 
   integer    INTEGER    NOT NULL,
   float      REAL       NOT NULL,
   date       TEXT       NOT NULL,
   bool       VARCHAR(5) NOT NULL
);

INSERT INTO databaru(string, integer, float, date, bool)
VALUES ('Adnano', 27, 10.5, '15/04/1997', 'true');