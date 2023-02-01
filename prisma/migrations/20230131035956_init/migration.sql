-- CreateEnum
CREATE TYPE "Role" AS ENUM ('FACULTY', 'MERIT_COMMITTEE_MEMBER', 'MERIT_COMMITTEE_HEAD', 'DEAN');

-- CreateEnum
CREATE TYPE "SabbaticalOption" AS ENUM ('NO', 'SEMESTER', 'YEAR');

-- CreateEnum
CREATE TYPE "NarrativeCategory" AS ENUM ('SUMMARY', 'SERVICE', 'RESEARCH', 'TEACHING');

-- CreateEnum
CREATE TYPE "ActivityCategory" AS ENUM ('SERVICE', 'RESEARCH', 'TEACHING');

-- CreateEnum
CREATE TYPE "SignificanceLevel" AS ENUM ('MAJOR', 'SIGNIFICANT', 'MINOR');

-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('FALL', 'SPRING', 'SUMMER1', 'SUMMER2');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "preferredName" TEXT,
    "role" "Role" NOT NULL DEFAULT 'FACULTY',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessorInfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "teachingPercent" DOUBLE PRECISION NOT NULL,
    "researchPercent" DOUBLE PRECISION NOT NULL,
    "servicePercent" DOUBLE PRECISION NOT NULL,
    "sabbatical" "SabbaticalOption" NOT NULL,
    "teachingReleaseExplanation" TEXT,

    CONSTRAINT "ProfessorInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" "Semester" NOT NULL,
    "dateModified" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "ActivityCategory" NOT NULL,
    "significance" "SignificanceLevel" NOT NULL,
    "isFavorite" BOOLEAN NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Narrative" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "dateModified" TIMESTAMP(3) NOT NULL,
    "category" "NarrativeCategory" NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Narrative_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessorInfo_userId_key" ON "ProfessorInfo"("userId");

-- AddForeignKey
ALTER TABLE "ProfessorInfo" ADD CONSTRAINT "ProfessorInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Narrative" ADD CONSTRAINT "Narrative_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
