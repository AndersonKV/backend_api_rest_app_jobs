-- CreateEnum
CREATE TYPE "EnumUserRole" AS ENUM ('user', 'company');

-- CreateEnum
CREATE TYPE "EnumRemote" AS ENUM ('sim', 'nao');

-- CreateEnum
CREATE TYPE "EnumTypesContract" AS ENUM ('clt', 'pj');

-- CreateEnum
CREATE TYPE "EnumSizeCompany" AS ENUM ('pequena', 'media', 'grande');

-- CreateEnum
CREATE TYPE "EnumExperienceLevel" AS ENUM ('estagio', 'junior', 'pleno', 'senior');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirm_password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "EnumUserRole" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "remote" "EnumRemote" NOT NULL,
    "name_company" TEXT NOT NULL,
    "id_author" INTEGER NOT NULL,
    "techs" TEXT NOT NULL,
    "types_contract" "EnumTypesContract" NOT NULL,
    "size_company" "EnumSizeCompany" NOT NULL,
    "experience_level" "EnumExperienceLevel" NOT NULL,
    "expired_days" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary" INTEGER NOT NULL,
    "responsibilities" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "benefits" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matchings" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_job" INTEGER NOT NULL,
    "id_author" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matchings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_id_author_fkey" FOREIGN KEY ("id_author") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matchings" ADD CONSTRAINT "matchings_id_job_fkey" FOREIGN KEY ("id_job") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matchings" ADD CONSTRAINT "matchings_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
