CREATE TABLE IF NOT EXISTS "people" (
	"inserted_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) DEFAULT NULL,
	"username" VARCHAR(50) NOT NULL UNIQUE,
	"company" VARCHAR(50) DEFAULT NULL,
  "uid" INT DEFAULT NULL -- the person's GitHub uid e.g: 4185328
);

/* insert a person into the people table if it does not already exist */
/* stackoverflow.com/questions/4069718/postgres-insert-if-does-not-exist */
INSERT INTO people (name, username, company)
  SELECT name, username, company FROM people
  UNION
  VALUES (
    'Jimmy Testuser',
    'jimmy',
    'Great!'
  )
  EXCEPT
  SELECT name, username, company FROM people;

CREATE TABLE IF NOT EXISTS "followers" (
  "inserted_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "follower_id" INT REFERENCES people (id),
    CONSTRAINT "followers_fk0"
    FOREIGN KEY ("follower_id")
    REFERENCES people (id),
  "leader_id" INT REFERENCES people (id),
    CONSTRAINT "followers_fk1"
    FOREIGN KEY ("leader_id")
    REFERENCES people (id)
);

CREATE TABLE IF NOT EXISTS "orgs" (
	"inserted_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"id" SERIAL PRIMARY KEY,
	"url" VARCHAR(50),
	"username" VARCHAR(50) NOT NULL UNIQUE
)
