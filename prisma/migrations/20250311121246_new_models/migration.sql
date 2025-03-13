/*
  Warnings:

  - The primary key for the `DiscountRules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `shopifyStoreId` on the `DiscountRules` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `DiscountRules` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `ShopifyStore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ShopifyStore` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DiscountRules" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ruleEnabled" BOOLEAN NOT NULL DEFAULT false,
    "automaticOrCode" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discountType" TEXT NOT NULL,
    "discountAmount" TEXT NOT NULL,
    "shippingRateOption" TEXT NOT NULL,
    "shippingRateName" TEXT,
    "startDate" TEXT NOT NULL,
    "startTime" TEXT,
    "hasEndDate" BOOLEAN NOT NULL DEFAULT false,
    "endDate" TEXT,
    "endTime" TEXT,
    "shop" TEXT,
    CONSTRAINT "DiscountRules_shop_fkey" FOREIGN KEY ("shop") REFERENCES "ShopifyStore" ("shop") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DiscountRules" ("automaticOrCode", "code", "createdAt", "discountAmount", "discountType", "endDate", "endTime", "hasEndDate", "id", "ruleEnabled", "shippingRateName", "shippingRateOption", "startDate", "startTime", "updatedAt") SELECT "automaticOrCode", "code", "createdAt", "discountAmount", "discountType", "endDate", "endTime", "hasEndDate", "id", "ruleEnabled", "shippingRateName", "shippingRateOption", "startDate", "startTime", "updatedAt" FROM "DiscountRules";
DROP TABLE "DiscountRules";
ALTER TABLE "new_DiscountRules" RENAME TO "DiscountRules";
CREATE TABLE "new_ShopifyStore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shop" TEXT NOT NULL
);
INSERT INTO "new_ShopifyStore" ("createdAt", "id", "shop", "updatedAt") SELECT "createdAt", "id", "shop", "updatedAt" FROM "ShopifyStore";
DROP TABLE "ShopifyStore";
ALTER TABLE "new_ShopifyStore" RENAME TO "ShopifyStore";
CREATE UNIQUE INDEX "ShopifyStore_shop_key" ON "ShopifyStore"("shop");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
