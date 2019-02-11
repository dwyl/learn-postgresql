# Learn PostgreSQL

Learn how to use PostgreSQL to store your relational data.

<div align="center">
    <a href="https://www.postgresql.org/about/">
        <img src="https://user-images.githubusercontent.com/194400/52590350-fa116100-2e38-11e9-9303-c38819493a4e.png" width="700">
    </a>
</div>
<br />


# _Why_?

Like it or not, Relational Databases store
_most_ of the world's structured data.

https://insights.stackoverflow.com/survey/2018/#technology-databases
![stackoverflow-survey-2018-databases](https://user-images.githubusercontent.com/194400/52594468-80cb3b80-2e43-11e9-867a-eeb4eea9a322.png)


https://db-engines.com/en/ranking
![dbms-ranking](https://user-images.githubusercontent.com/194400/52594416-64c79a00-2e43-11e9-8a61-02af22554802.png)


Structured Query Language (SQL)
is the preferred means of interacting with data at any scale.

Learning how to use a relational database is a foundational skill
for all of computer science and application development.

Being _proficient_ in SQL will open the door to Data Science with
[Apache Spark](https://en.wikipedia.org/wiki/Apache_Spark#Spark_SQL),
Google [BigQuery](https://en.wikipedia.org/wiki/BigQuery),
[Oracle](https://en.wikipedia.org/wiki/Oracle_Corporation#Controversies)
and [Teradata](https://en.wikipedia.org/wiki/Teradata)



# _What_?

# _Who_?

Unless you work for [MongoDB](https://en.wikipedia.org/wiki/MongoDB#Security)
(_or another [NoSQL](https://en.wikipedia.org/wiki/NoSQL) database company_)
the chance that you will encounter a Relational Database
and thus benefit from knowing Structured Query Language (SQL)
in your _career_ as a software engineer tends toward 100%.



# _How_?

### Installation

Before you get started with using PostgreSQL, you'll have to install it.
Follow these steps to get started:

#### MacOS

1. There are a couple of ways to install PostgreSQL. One of the easier ways to
get started is with Postgres.app. Navigate to http://postgresapp.com/ and then
click "Download":
![download](https://cloud.githubusercontent.com/assets/12450298/19641848/6d3cfa4a-99da-11e6-858f-3ff2ada026be.png)

2. Once it's finished downloading, double click on the file to unzip then move
the PostgreSQL elephant icon into your `applications` folder. Double click the
icon to launch the application.

3. You should see a new window launched that says "Welcome to Postgres". If it
says that it cannot connect to the postgres server this means that the DEFAULT
port is probably already in use. Make sure you don't have any other instances of
Postgres on your computer. Uninstall them if you do and then resume with these
steps. Click on the button that says "Open psql":
![open psql](https://cloud.githubusercontent.com/assets/12450298/19642044/463eceae-99db-11e6-8907-bb3a6cc532a7.png)

4. Postgres.app will by default create a role and database that matches your current macOS username. You can connect straight away by running `psql`.

5. You should then see something in your terminal that looks like this (with your macOS username in front of the prompt rather than 'postgres'):
![terminal](https://cloud.githubusercontent.com/assets/12450298/19642816/f8ac0c66-99de-11e6-87e2-db55e6abc27b.png)

6. You should now be all set up to start using PostgreSQL. For documentation on
command line tools etc see http://postgresapp.com/documentation/

#### Ubuntu

Digital Ocean have got a great article on [getting started with postgres]( https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04). A quick summary is below.

##### Installation

```
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

By default the only role created is the default 'postgres', so PostgreSQL will only respond to connections from an Ubuntu user called 'postgres'. We need to pretend to be that user and create a role matching our actual Ubuntu username:

```
sudo -u postgres createuser --interactive
```

This command means 'run the command `createuser --interactive` as the user called "postgres"'.

When asked for the name of the role enter your Ubuntu username. If you're not sure, open a new Terminal tab and run `whoami`.

When asked if you want to make the role a superuser, type 'y'.

We now need to create the database matching the role name, as PostgreSQL expects this. Run:

```
sudo -u postgres createdb [your user name]
```

You can now connect to PostgreSQL by running `psql`.

### Create your first PostgreSQL database

1. To start PostgreSQL, type this command into the terminal:  
`psql`  

2. Next type this command into the PostgreSQL interface:  
`CREATE DATABASE test;`  
**NOTE:** Don't forget the semi-colon. If you do, useful error messages won't
show up.

3. To check that our database has been created, type `\l` into the psql prompt.
You should see something like this in your terminal:
![test db](https://cloud.githubusercontent.com/assets/12450298/19650613/ce278678-9a01-11e6-89ad-b124c0adcfe5.png)

### Create new users for your database

1. If you closed the PostgreSQL server, start it again with:  
` psql`  

2. To create a new user, type the following into the psql prompt:  
    ```sql
    CREATE USER testuser;
    ```

3. Check that your user has been created. Type `\du` into the prompt. You should
see something like this:
![user](https://cloud.githubusercontent.com/assets/12450298/19650852/9c340708-9a02-11e6-8f06-75f1e30a86b3.png)
Users can be given certain permissions to access any given database you have
created.

4. Next we need to give our user permissions to access the test database we
created above. Enter the following command into the `psql` prompt:  
    ```sql
    GRANT ALL PRIVILEGES ON DATABASE test TO testuser;
    ```


### PostGIS - Spacial and Geographic objects for PostgreSQL

#### PostGIS Installation
If you've installed Postgres App as in the example above, you can easily
extend it to include PostGIS. Follow these steps to begin using PostGIS:

1. Ensure that you're logged in as a user OTHER THAN `postgres`. Follow the
steps above to enable your default user to be able to access the `psql` prompt.
(_[installation step 7](#installation)_)

2. Type the following into the `psql` prompt to add the extension:  
`CREATE EXTENSION postgis;`

#### PostGIS Distance between two sets of coordinates

After you've extended PostgreSQL with PostGIS you can begin to use it. Type
the following command into the `psql` command line:  

```sql
SELECT ST_Distance(gg1, gg2) As spheroid_dist
FROM (SELECT
	ST_GeogFromText('SRID=4326;POINT(-72.1235 42.3521)') As gg1,
	ST_GeogFromText('SRID=4326;POINT(-72.1235 43.1111)') As gg2
	) As foo  ;
```

This should return `spheroid_dist` along with a value in meters. The
example above returns: `84315.42034614` which is rougly 84.3km between the two
points.

### Commands
Once you are serving the database from your computer

- To change db
`\connect database_name;`

- To see the tables in the database
`\d;`

- To select (and show in terminal) all tables
`SELECT * FROM table_name`


- To make a table
`CREATE TABLE table_name (col_name1, col_name2)`

- To add a row
`INSERT INTO table_name ( col_name )
VALUES ( col_value)`
col_name only require if only some of the cols are being filled out

- To edit a column to a table 
`ALTER TABLE table_name
  ALTER COLUMN column_name SET DEFAULT expression`

- To add a column to a table 
`ALTER TABLE table_name
  ADD COLUMN column_name data_type`

- To find the number of instances where the word “Day” is present in the title of a table
`SELECT count(title) FROM table_name WHERE title LIKE '%Day%’;`

- To delete a row in a table
`DELETE FROM table_name
  WHERE column_name = ‘hello';`


Postgresql follows the SQL convention of calling relations TABLES, attributes COLUMNs and tuples ROWS

**Transaction**
All or nothing, if something fails the other commands are rolled back like nothing happened

**Reference**
When a table is being created you can reference a column in another table to make sure any value which is added to that column exists in the referenced table.

```sql
CREATE TABLE cities (
  name text NOT NULL,
  postal_code varchar(9) CHECK (postal_code <> ''),
  country_code char(2) REFERENCES countries,
  PRIMARY KEY (country_code, postal_code)
);
```

`<>` means not equal


**Join reads**
You can join tables together when reading them,

**Inner Join**
Joins together two tables by specifying a column in each to join them by i.e.

```sql
SELECT cities.*, country_name
  FROM cities INNER JOIN countries
  ON cities.country_code = countries.country_code;
```

This will select all of the columns in both the countries and cities tables the data, the rows are matched up by country_code.

**Grouping**
You can put rows into groups where the group is defined by a shared value in a particular column.

```sql
SELECT venue_id, count(*)
  FROM events
  GROUP BY venue_id;
```

This will group the rows together by the venue_id, count is then performed on each of the groups.

### Learning Resources

- [Node-hero](https://blog.risingstack.com/node-js-database-tutorial/)
- [Pluralsight](https://www.pluralsight.com/courses/postgresql-getting-started)
- [Tech Republic](http://www.techrepublic.com/blog/diy-it-guy/diy-a-postgresql-database-server-setup-anyone-can-handle/)
- [PostGIS install](http://postgis.net/install/)
- [PostGIS docs](http://postgis.net/docs/manual-2.3/)
- [PostGIS ST_Distance](http://postgis.net/docs/ST_Distance.html)


## Why PostgreSQL and _Not_ MySQL?

The _good_ news is that almost all of your PostgreSQL knowledge
is _directly_ transferable to MySQL. Because both use SQL
[MySQL](https://en.wikipedia.org/wiki/MySQL)


The _reason_ MySQL is still _hugely_ popular
can be summarised by _one_ word:
[***WordPress***](https://en.wikipedia.org/wiki/WordPress).

Over **30%** of the 10 million most popular websites use WordPress.
WordPress runs on the "LAMP" (_Linux Apache **MySQL** PHP_) stack,
which

## Why _Not_ Use WordPress?
