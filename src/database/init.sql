CREATE DATABASE IF NOT EXISTS yourdb;

USE yourdb;

CREATE TABLE
    IF NOT EXISTS Users (
        userId INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role ENUM ('user', 'admin', 'moderator') NOT NULL DEFAULT 'user',
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        bio TEXT,
        contactInfo VARCHAR(255),
        CHECK (role IN ('user', 'admin', 'moderator'))
    );

-- Password Reset
CREATE TABLE
    IF NOT EXISTS Recoveries (
        recoveryId INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        token VARCHAR(64) NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES Users (userId) ON DELETE CASCADE
    );

-- Blacklist Tokens
CREATE TABLE
    IF NOT EXISTS Tokens (
        tokenId INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        token VARCHAR(64) NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES Users (userId) ON DELETE CASCADE
    );