/*
  Warnings:

  - Added the required column `datePosted` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateClosed` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "datePosted" TEXT NOT NULL,
ADD COLUMN     "dateClosed" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[];
