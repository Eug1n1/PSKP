BEGIN TRANSACTION;
DROP TABLE IF EXISTS "Faculties";
CREATE TABLE IF NOT EXISTS "Faculties" (
	"faculty"	VARCHAR(255),
	"facultyName"	VARCHAR(255) NOT NULL,
	PRIMARY KEY("faculty")
);
DROP TABLE IF EXISTS "Pulpits";
CREATE TABLE IF NOT EXISTS "Pulpits" (
	"pulpit"	VARCHAR(255),
	"pulpitName"	VARCHAR(255) NOT NULL,
	"faculty"	VARCHAR(255),
	FOREIGN KEY("faculty") REFERENCES "Faculties"("faculty") ON DELETE SET NULL ON UPDATE CASCADE,
	PRIMARY KEY("pulpit")
);
DROP TABLE IF EXISTS "Subjects";
CREATE TABLE IF NOT EXISTS "Subjects" (
	"subject"	VARCHAR(255),
	"subjectName"	VARCHAR(255) NOT NULL,
	"pulpit"	VARCHAR(255),
	FOREIGN KEY("pulpit") REFERENCES "Pulpits"("pulpit") ON DELETE SET NULL ON UPDATE CASCADE,
	PRIMARY KEY("subject")
);
DROP TABLE IF EXISTS "Teachers";
CREATE TABLE IF NOT EXISTS "Teachers" (
	"teacher"	VARCHAR(255),
	"teacherName"	VARCHAR(255) NOT NULL,
	"pulpit"	VARCHAR(255),
	PRIMARY KEY("teacher"),
	FOREIGN KEY("pulpit") REFERENCES "Pulpits"("pulpit") ON DELETE SET NULL ON UPDATE CASCADE
);
DROP TABLE IF EXISTS "AuditoriumTypes";
CREATE TABLE IF NOT EXISTS "AuditoriumTypes" (
	"auditoriumType"	VARCHAR(255),
	"auditoriumTypeName"	VARCHAR(255) NOT NULL,
	PRIMARY KEY("auditoriumType")
);
DROP TABLE IF EXISTS "Auditoriums";
CREATE TABLE IF NOT EXISTS "Auditoriums" (
	"auditorium"	VARCHAR(255),
	"auditoriumName"	VARCHAR(255) NOT NULL,
	"auditoriumCapacity"	NUMBER NOT NULL,
	"auditoriumType"	VARCHAR(255),
	FOREIGN KEY("auditoriumType") REFERENCES "AuditoriumTypes"("auditoriumType") ON DELETE SET NULL ON UPDATE CASCADE,
	PRIMARY KEY("auditorium")
);
INSERT INTO "Faculties" ("faculty","facultyName") VALUES ('IT','asdfadsf'),
 ('FOF','1 aksdf');
INSERT INTO "Pulpits" ("pulpit","pulpitName","faculty") VALUES ('POIT','asdfadsf','IT'),
 ('ISIT','sadfwe','IT'),
 ('FOFI','312ascdsa','FOF');
INSERT INTO "Subjects" ("subject","subjectName","pulpit") VALUES ('NODEJS','asdfadsf','POIT'),
 ('DB','asdfasdfwer','POIT'),
 ('FOFI','103saa','FOFI'),
 ('BOBER','owiqur','ISIT');
INSERT INTO "Teachers" ("teacher","teacherName","pulpit") VALUES ('NODEJS','asdfadsf','POIT');
INSERT INTO "AuditoriumTypes" ("auditoriumType","auditoriumTypeName") VALUES ('LK','asdfadsf'),
 ('LB','qwwqer');
INSERT INTO "Auditoriums" ("auditorium","auditoriumName","auditoriumCapacity","auditoriumType") VALUES ('313-1','sdfasdf',100,'LK'),
 ('200-3a','fasdfasd',180,'LK'),
 ('322-1','sadfsaddfwer',15,'LB');
COMMIT;
