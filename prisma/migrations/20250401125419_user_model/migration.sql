-- CreateEnum
CREATE TYPE "accountType" AS ENUM ('SAVING', 'CURRENT');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" BIGINT NOT NULL,
    "password" TEXT NOT NULL,
    "bankAccountNo" TEXT,
    "ifscCode" TEXT,
    "accountType" "accountType" NOT NULL DEFAULT 'SAVING',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "razorPayCustomerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_bankAccountNo_key" ON "User"("bankAccountNo");
