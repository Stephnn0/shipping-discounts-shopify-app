-- CreateTable
CREATE TABLE "ShopifyStore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shop" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DiscountRules" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "shopifyStoreId" TEXT,
    CONSTRAINT "DiscountRules_shopifyStoreId_fkey" FOREIGN KEY ("shopifyStoreId") REFERENCES "ShopifyStore" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
