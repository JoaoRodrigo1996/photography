-- CreateTable
CREATE TABLE "follows" (
    "followed_by_id" TEXT NOT NULL,
    "following_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("following_id", "followed_by_id"),
    CONSTRAINT "follows_followed_by_id_fkey" FOREIGN KEY ("followed_by_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
