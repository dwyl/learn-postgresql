# Useful `Postgres` Commands

## List All Databases: `\l`

If you connect to a `Postgres` database

```sql
\l
```

```md
                                                          List of databases
      Name       |   Owner    | Encoding | Locale Provider |  Collate   |   Ctype    | Locale | ICU Rules |     Access privileges
-----------------+------------+----------+-----------------+------------+------------+--------+-----------+---------------------------
 mvp             | flypgadmin | UTF8     | libc            | en_US.utf8 | en_US.utf8 |        |           |
 mvp_pr_421      | flypgadmin | UTF8     | libc            | en_US.utf8 | en_US.utf8 |        |           |
 mvp_review_test | flypgadmin | UTF8     | libc            | en_US.utf8 | en_US.utf8 |        |           |
 postgres        | flypgadmin | UTF8     | libc            | en_US.utf8 | en_US.utf8 |        |           |
 template0       | flypgadmin | UTF8     | libc            | en_US.utf8 | en_US.utf8 |        |           | =c/flypgadmin            +
                 |            |          |                 |            |            |        |           | flypgadmin=CTc/flypgadmin
 template1       | flypgadmin | UTF8     | libc            | en_US.utf8 | en_US.utf8 |        |           | =c/flypgadmin            +
                 |            |          |                 |            |            |        |           | flypgadmin=CTc/flypgadmin
(8 rows)
```

## Switch to a Specific Database

```sql
\c postgres
```

You should see output similar to the following:

```sh
psql (18.4 (Postgres.app), server 14.6 (Debian 14.6-1.pgdg110+1))
You are now connected to database "postgres" as user "postgres".
```

## Describe Tables: `\dt`

To describe (list) the available tables in the database run:

```sh
\dt
```


## Create a New User

We needed to create a new `user` and grant it access to the database:

```sql
CREATE USER youruser WITH ENCRYPTED PASSWORD 'yourpass';
GRANT ALL PRIVILEGES ON DATABASE yourdbname TO youruser;
ALTER DATABASE yourdbname OWNER TO youruser;
```

e.g:

```sql
CREATE USER mvp_user_2026 WITH ENCRYPTED PASSWORD '7z3S2y17ABDeZPIJkQFh43tjZMoAiNSrVSWByWgR7JVoRNCvBogjLs1kug1rkX4i';
GRANT ALL PRIVILEGES ON DATABASE mvp TO mvp_user_2026;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO mvp_user_2026;

ALTER DATABASE mvp OWNER TO mvp_user_2026;
```

Now test if that worked:

```sql
GRANT ALL PRIVILEGES ON ALL TABLES IN DATABASE mvp TO mvp_user_2026;
```

<!--
```sh
SELECT * FROM postgres;
```
-->

## What _Version_ of `Postgres` is Running?

```sql
SELECT version();
```

You should expect to see something like:

```sh
PostgreSQL 14.6 (Debian 14.6-1.pgdg110+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 10.2.1-6) 10.2.1 20210110, 64-bit
```


# References

We found the following answers/pages/posts useful.

- Using psql in Terminal:
[dev.to/koshirok096/how-to-start-using-psql-in-terminal-for-beginners-2ok3](https://dev.to/koshirok096/how-to-start-using-psql-in-terminal-for-beginners-2ok3)
- Top psql commands with examples:
[bytebase.com/reference/postgres/how-to/top-psql-commands-with-examples](https://www.bytebase.com/reference/postgres/how-to/top-psql-commands-with-examples/)
- Creating user, database and adding access on PostgreSQL: 
[medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e)
- Permissions errors when granting access to new user:
[stackoverflow.com/questions/15520361/permission-denied-for-relation-in-postgresql](https://stackoverflow.com/questions/15520361/permission-denied-for-relation-in-postgresql)
- Restore a postgres backup file:
[stackoverflow.com/questions/2732474/restore-a-postgres-backup-file](https://stackoverflow.com/questions/2732474/restore-a-postgres-backup-file-using-the-command-line)