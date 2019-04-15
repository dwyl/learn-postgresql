CREATE TABLE IF NOT EXISTS "people" (
  "inserted_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) DEFAULT NULL,
	"username" VARCHAR(50) NOT NULL,
	"bio" VARCHAR(255) DEFAULT NULL,
	"worksfor" VARCHAR(50) DEFAULT NULL,
	"uid" INT NOT NULL, -- the person's GitHub uid e.g: 4185328
	"location" VARCHAR(100) DEFAULT NULL,
	"website" VARCHAR(255) DEFAULT NULL,
	"stars" INT DEFAULT 0,
	"followers" INT DEFAULT 0,
	"following" INT DEFAULT 0,
	"contribs" INT DEFAULT 0,
	"recent_activity" INT DEFAULT 0
);

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
	"uid" INT NOT NULL
);

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
	"org_id" INT REFERENCES orgs (id) -- this can be NULL if repo is personal.
);

CREATE TABLE IF NOT EXISTS "logs" (
	"id" SERIAL PRIMARY KEY,
	"inserted_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"url" VARCHAR(255) NOT NULL,
	"next_page" VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "relationships" (
	"inserted_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"id" SERIAL PRIMARY KEY,
	"person_id" INT REFERENCES people (id) DEFAULT NULL,
	"leader_id" INT REFERENCES people (id) DEFAULT NULL,
	"org_id" INT REFERENCES orgs (id) DEFAULT NULL,
	"repo_id" INT REFERENCES repos (id) DEFAULT NULL
);
