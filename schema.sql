echo-all
/* first drop test tables from previous session so we have a clean database */
/* DROP SCHEMA public cascade; http://stackoverflow.com/a/13823560/1148249 */
CREATE SCHEMA IF NOT EXISTS public;
/* DROP DATABASE IF EXISTS test; */
-- CREATE DATABASE test;
/* create the people table */
CREATE TABLE IF NOT EXISTS people (
  id SERIAL PRIMARY KEY,
  inserted_at INTEGER DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP),
  name VARCHAR(100) DEFAULT NULL,
  username VARCHAR(50) DEFAULT NULL
);
