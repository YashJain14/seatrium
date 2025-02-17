-- CreateTable
CREATE TABLE "SpreadsheetData" (
    "spreadsheetId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "data" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SpreadsheetData_spreadsheetId_key" ON "SpreadsheetData"("spreadsheetId");
