/*
  Warnings:

  - You are about to drop the column `passwords` on the `admin` table. All the data in the column will be lost.
  - Added the required column `password` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin" DROP COLUMN "passwords",
ADD COLUMN     "password" TEXT NOT NULL;
