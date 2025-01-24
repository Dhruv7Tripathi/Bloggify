/*
  Warnings:

  - You are about to drop the column `dislikes` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "dislikes",
DROP COLUMN "likes";
