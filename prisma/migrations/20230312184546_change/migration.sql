-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "dateModified" SET DEFAULT extract(epoch from now())::bigint;
