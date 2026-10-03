/*
  Warnings:

  - You are about to drop the `_TenantToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TenantToUser" DROP CONSTRAINT "_TenantToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TenantToUser" DROP CONSTRAINT "_TenantToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "tenantId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_TenantToUser";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
