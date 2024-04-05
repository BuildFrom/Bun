CREATE DATABASE IF NOT EXISTS bundb;

USE bundb;

CREATE TABLE
    IF NOT EXISTS Users (
        userId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT 'user',
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        createdAt TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            bio TEXT,
            contactInfo VARCHAR(255),
            CONSTRAINT role_check CHECK (role IN ('user', 'admin', 'moderator'))
    );

-- Password Reset
CREATE TABLE
    IF NOT EXISTS Recoveries (
        recoveryId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        userId INTEGER NOT NULL,
        token VARCHAR(64) NOT NULL,
        createdAt TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES Users (userId) ON DELETE CASCADE
    );

-- Blacklist
CREATE TABLE
    IF NOT EXISTS Blacklist (
        tokenId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        token VARCHAR(64) NOT NULL,
        createdAt TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- Tokens
CREATE TABLE
    IF NOT EXISTS Tokens (
        tokenId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        userId INTEGER NOT NULL,
        token VARCHAR(64) NOT NULL,
        createdAt TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES Users (userId) ON DELETE CASCADE
    );



    -- SELECT datname FROM pg_database
    
    -- SELECT tablename, tableowner FROM pg_tables WHERE schemaname = 'public';