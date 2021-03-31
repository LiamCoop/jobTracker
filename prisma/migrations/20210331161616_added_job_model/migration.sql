-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "applied" BOOLEAN NOT NULL,
    "notes" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
