/*
  Warnings:

  - A unique constraint covering the columns `[shop]` on the table `ShopifyStore` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShopifyStore_shop_key" ON "ShopifyStore"("shop");
