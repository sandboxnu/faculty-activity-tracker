/*
  Warnings:

  - The values [SUMMER1,SUMMER2] on the enum `Semester` will be removed. If these variants are still used in the database, this will fail.
  - Changed the column `semester` on the `Activity` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Semester_new" AS ENUM ('FALL', 'SPRING', 'SUMMER', 'OTHER');
ALTER TABLE "Activity" ALTER COLUMN "semester" TYPE "Semester_new"[] USING ("semester"::text::"Semester_new"[]);
ALTER TYPE "Semester" RENAME TO "Semester_old";
ALTER TYPE "Semester_new" RENAME TO "Semester";
DROP TYPE "Semester_old";
COMMIT;

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "semester" SET DATA TYPE "Semester"[];
