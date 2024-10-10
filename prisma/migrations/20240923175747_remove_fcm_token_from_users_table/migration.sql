/*
  Warnings:

  - You are about to drop the column `fcm_token` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "image_url" TEXT,
    "clerk_user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("clerk_user_id", "created_at", "email", "first_name", "id", "image_url", "last_name", "updated_at") SELECT "clerk_user_id", "created_at", "email", "first_name", "id", "image_url", "last_name", "updated_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_clerk_user_id_key" ON "User"("clerk_user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
