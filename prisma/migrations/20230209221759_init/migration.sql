/*
  Warnings:

  - Changed the type of `dateModified` on the `Activity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dateModified` on the `Narrative` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "dateModified",
ADD COLUMN     "dateModified" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Narrative" DROP COLUMN "dateModified",
ADD COLUMN     "dateModified" INTEGER NOT NULL;
