CREATE TABLE PECAS(
    ID INTEGER PRIMARY KEY,
    NOME_PECA TEXT NOT NULL,
    COD_PECA_DATASUL INT NOT NULL,
    PART_NUMBER TEXT NOT NULL,
    FABRICANTE TEXT,
    ACTIVE BOOLEAN
);

CREATE TABLE USUARIOS(
    ID INTEGER PRIMARY KEY,
    USERNAME TEXT NOT NULL UNIQUE,
    PASSWORD TEXT NOT NULL,
    ROLE TEXT NOT NULL
);

CREATE SEQUENCE usuarios_seq START 1;

CREATE SEQUENCE pecas_seq START 1;