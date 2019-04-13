CREATE TABLE IF NOT EXISTS "people" (
	"inserted_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) DEFAULT NULL,
	"username" VARCHAR(50) NOT NULL UNIQUE,
	"bio" VARCHAR(255) DEFAULT NULL,
	"worksfor" VARCHAR(50) DEFAULT NULL,
  "uid" INT NOT NULL UNIQUE, -- the person's GitHub uid e.g: 4185328
  "location" VARCHAR(100) DEFAULT NULL,
	"website" VARCHAR(255) DEFAULT NULL
);

/* insert a person into the people table if it does not already exist */
/* stackoverflow.com/questions/4069718/postgres-insert-if-does-not-exist */
INSERT INTO people (name, username, worksfor, uid)
  SELECT name, username, worksfor, uid FROM people
  UNION
  VALUES (
    'Jimmy Testuser',
    'jimmy',
    'Great!',
		99
  )
  EXCEPT
  SELECT name, username, worksfor, uid FROM people;

INSERT INTO people (name, username, worksfor, uid)
  SELECT name, username, worksfor, uid FROM people
  UNION
  VALUES (
    'Ron Swanson',
    'dukesilver',
    'OfferManWood',
		123
  )
  EXCEPT
  SELECT name, username, worksfor, uid FROM people;

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

INSERT INTO followers (follower_id, leader_id)
  SELECT follower_id, leader_id FROM followers
  UNION
  VALUES (
    2,
    1
  )
  EXCEPT
  SELECT follower_id, leader_id FROM followers;

CREATE TABLE IF NOT EXISTS "orgs" (
  "inserted_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) DEFAULT NULL,
  "url" VARCHAR(50),
  "description" VARCHAR(255) DEFAULT NULL,
  "location" VARCHAR(50) DEFAULT NULL,
  "website" VARCHAR(255) DEFAULT NULL,
  "email" VARCHAR(255) DEFAULT NULL,
  "pcount" INT DEFAULT 0,
  "uid" INT NOT NULL UNIQUE
);

INSERT INTO orgs (url, username)
  SELECT url, username FROM orgs
  UNION
  VALUES (
    'dwyl.com',
    'dwyl'
  )
  EXCEPT
  SELECT url, username FROM orgs;


CREATE TABLE IF NOT EXISTS "members" (
  "inserted_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "person_id" INT REFERENCES people (id),
    CONSTRAINT "members_fk0"
    FOREIGN KEY ("person_id")
    REFERENCES people (id),
  "org_id" INT REFERENCES orgs (id),
    CONSTRAINT "members_fk1"
    FOREIGN KEY ("org_id")
    REFERENCES orgs (id)
);

INSERT INTO members (person_id, org_id)
  SELECT person_id, org_id FROM members
  UNION
  VALUES (
    1,
    1
  )
  EXCEPT
  SELECT person_id, org_id FROM members;

CREATE TABLE IF NOT EXISTS "repos" (
	"inserted_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "id" SERIAL PRIMARY KEY,
	"url" VARCHAR(255) NOT NULL, -- know what the char limit is for a repo name?
	"description" TEXT DEFAULT NULL,
	"website" VARCHAR(255) DEFAULT NULL,
	"watchers" INT DEFAULT 0,
	"stars" INT DEFAULT 0,
	"forks" INT DEFAULT 0,
	"commits" INT DEFAULT 0,
	"langs" VARCHAR(255) DEFAULT NULL,
	"tags" TEXT DEFAULT NULL,
	"person_id" INT REFERENCES people (id), -- can be NULL if repo belongs to org.
    CONSTRAINT "repos_fk0"
    FOREIGN KEY ("person_id")
    REFERENCES people (id),
	"org_id" INT REFERENCES orgs (id), -- this can be NULL if repo is personal.
    CONSTRAINT "repos_fk1"
    FOREIGN KEY ("org_id")
    REFERENCES orgs (id)
);


CREATE TABLE IF NOT EXISTS "stars" (
  "inserted_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "person_id" INT REFERENCES people (id), -- only people can "star" repos.
    CONSTRAINT "stars_fk0"
    FOREIGN KEY ("person_id")
    REFERENCES people (id),
	"repo_id" INT REFERENCES repos (id),
    CONSTRAINT "stars_fk1"
    FOREIGN KEY ("repo_id")
    REFERENCES repos (id)
);

CREATE TABLE IF NOT EXISTS "logs" (
  "id" SERIAL PRIMARY KEY,
  "inserted_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "path" VARCHAR(255) NOT NULL,
	"next_page" VARCHAR(255) DEFAULT NULL
);
