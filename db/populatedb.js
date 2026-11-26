#! /usr/bin/env node

const { Client } = require("pg");

const path = require("node:path");
process.loadEnvFile(path.resolve(__dirname, "../.env"));

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    text TEXT NOT NULL,
    username VARCHAR(50) NOT NULL,
    added TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO messages (text, username) 
VALUES 
    ('Hi there!', 'Amando'),
    ('Hello World!', 'Charles');
`

async function main() {
    console.log("connecting...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    });
    await client.connect();
    
    console.log("seeding...");
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
