--echo-all
/* first drop test tables from previous session so we have a clean database */
/* DROP SCHEMA public cascade; http://stackoverflow.com/a/13823560/1148249 */
CREATE SCHEMA IF NOT EXISTS public;
/* DROP DATABASE IF EXISTS test; */
-- CREATE DATABASE test;
/* create the people table */
CREATE TABLE IF NOT EXISTS people (
  id SERIAL PRIMARY KEY,
  email VARCHAR(254) UNIQUE NOT NULL,
  name VARCHAR(100) DEFAULT NULL,
  password VARCHAR(60) NOT NULL,
  created INTEGER DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP),
  verify_token VARCHAR(13) DEFAULT NULL,
  verified INTEGER DEFAULT NULL
);
/* insert a person into the people table if it does not already exist */
/* stackoverflow.com/questions/4069718/postgres-insert-if-not-exist-already */
INSERT INTO people (email, name, password)
  SELECT email, name, password FROM people
  UNION
  VALUES (
    'test@test.net',
    'Jimmy Tester',
    '$2a$12$OgPE9DUNM0KaSodSQVJvw.36GjolssAeO.dfi7a9cmc9KbQTDTj7W'
  )
  EXCEPT
  SELECT email, name, password FROM people;

/* sessions */
CREATE TABLE IF NOT EXISTS sessions (
  session_id VARCHAR(36), -- using UUID/Hash ensures session_id is "unguessable"
  person_id INTEGER REFERENCES people (id),
  start_timestamp INTEGER DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP),
  end_timestamp INTEGER DEFAULT null
);


INSERT INTO sessions (session_id, person_id)
VALUES (
  (SELECT md5(random()::text)),
  '1'
);
/* Unique Constraint on Column: http://stackoverflow.com/a/7327598/1148249 */
CREATE UNIQUE INDEX IF NOT EXISTS unique_session_id ON sessions (session_id);

CREATE TABLE IF NOT EXISTS store (
  store_id SERIAL PRIMARY KEY,
  session_id VARCHAR(36) NOT NULL REFERENCES sessions (session_id),
  person_id INTEGER REFERENCES people (id),
  created_timestamp INTEGER DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP),
  data jsonb -- see: github.com/dwyl/learn-postgresql/issues/10
);

DO $$   -- This is required to keep the session_id as a vairable we can re-use
DECLARE -- see: stackoverflow.com/a/6990059/1148249
  sid VARCHAR := (SELECT md5(random()::text));
BEGIN -- stackoverflow.com/a/4566583/1148249
  RAISE NOTICE 'Value of sid: %', sid;

  INSERT INTO sessions (session_id, person_id)
  VALUES (
    sid,
    '1'
  );

  INSERT INTO store (session_id, person_id, data)
  VALUES (
    sid,
    '1',
    '{"hello":"world"}'
  );
  /* now attempt to insert without a person_id */
  INSERT INTO store (session_id, data)
  VALUES (
    sid,
    '{"totes":"works"}'
  );
END $$;
