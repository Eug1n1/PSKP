-- CreateTable
CREATE TABLE "Faculty" (
    "faculty" TEXT NOT NULL PRIMARY KEY,
    "facultyName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pulpit" (
    "pulpit" TEXT NOT NULL PRIMARY KEY,
    "pulpitName" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,
    CONSTRAINT "Pulpit_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty" ("faculty") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subject" (
    "subject" TEXT NOT NULL PRIMARY KEY,
    "subjectName" TEXT NOT NULL,
    "PulpitId" TEXT NOT NULL,
    CONSTRAINT "Subject_PulpitId_fkey" FOREIGN KEY ("PulpitId") REFERENCES "Pulpit" ("pulpit") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Teacher" (
    "teacher" TEXT NOT NULL PRIMARY KEY,
    "teacherName" TEXT NOT NULL,
    "PulpitId" TEXT NOT NULL,
    CONSTRAINT "Teacher_PulpitId_fkey" FOREIGN KEY ("PulpitId") REFERENCES "Pulpit" ("pulpit") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditoriumType" (
    "auditoriumType" TEXT NOT NULL PRIMARY KEY,
    "auditoriumTypeName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Auditorium" (
    "auditorium" TEXT NOT NULL PRIMARY KEY,
    "auditoriumName" TEXT NOT NULL,
    "auditoriumCapacity" INTEGER NOT NULL,
    "auditoriumTypeId" TEXT NOT NULL,
    CONSTRAINT "Auditorium_auditoriumTypeId_fkey" FOREIGN KEY ("auditoriumTypeId") REFERENCES "AuditoriumType" ("auditoriumType") ON DELETE RESTRICT ON UPDATE CASCADE
);
