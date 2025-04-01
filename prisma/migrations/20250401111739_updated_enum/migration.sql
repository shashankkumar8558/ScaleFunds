/*
  Warnings:

  - The values [INCOME,EXPENSE] on the enum `transactionsType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "transactionsType_new" AS ENUM ('SAVING', 'DEBIT', 'CREDIT');
ALTER TABLE "Transactions" ALTER COLUMN "type" TYPE "transactionsType_new" USING ("type"::text::"transactionsType_new");
ALTER TYPE "transactionsType" RENAME TO "transactionsType_old";
ALTER TYPE "transactionsType_new" RENAME TO "transactionsType";
DROP TYPE "transactionsType_old";
COMMIT;
