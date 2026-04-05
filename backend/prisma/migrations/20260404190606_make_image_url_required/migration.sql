/*
  Warnings:

  - Made the column `imageUrl` on table `ClothingItem` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClothingItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ClothingItem" ("category", "color", "createdAt", "id", "imageUrl", "name") SELECT "category", "color", "createdAt", "id", "imageUrl", "name" FROM "ClothingItem";
DROP TABLE "ClothingItem";
ALTER TABLE "new_ClothingItem" RENAME TO "ClothingItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
