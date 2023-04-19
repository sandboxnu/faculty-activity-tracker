-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "dateModified" SET DEFAULT extract(epoch from now())::bigint;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dateModified" BIGINT NOT NULL DEFAULT extract(epoch from now())::bigint;
