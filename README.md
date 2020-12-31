<div align="center">

# Learn PostgreSQL

Learn how to use PostgreSQL
and Structured Query Language (SQL) to store
and query your data.

<br />

<a href="https://www.postgresql.org/about/">
  <img src="https://user-images.githubusercontent.com/194400/52590350-fa116100-2e38-11e9-9303-c38819493a4e.png" width="700">
</a>

<br />

[![Build Status](https://img.shields.io/travis/dwyl/learn-postgresql/master.svg?style=flat-square)](https://travis-ci.org/dwyl/learn-postgresql)
[![codecov.io](https://img.shields.io/codecov/c/github/dwyl/learn-postgresql/master.svg?style=flat-square)](http://codecov.io/github/dwyl/learn-postgresql?branch=master)
[![Dependencies: None!](https://david-dm.org/dwyl/learn-postgresql/status.svg?style=flat-square)](https://david-dm.org/dwyl/learn-postgresql)
[![devDependencies Status](https://david-dm.org/dwyl/learn-postgresql/dev-status.svg?style=flat-square)](https://david-dm.org/dwyl/learn-postgresql?type=dev)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/dwyl/learn-postgresql/issues)
<!-- uncomment when ready
[![HitCount](http://hits.dwyl.io/dwyl/learn-postgresql.svg)](http://hits.dwyl.io/dwyl/learn-postgresql)
-->

</div>


# _Why_?

Helping people store, retrieve and derive insights from data
is the essence of _all_ software applications. <br />

## SQL is _Everywhere_

Like it or not, Relational Databases store
_most_ of the world's structured data
and Structured Query Language (SQL)
is _by far_ the most frequent way of retrieving the data.<br />

According to the most _recent_ surveys/statistics,
SQL _still_ dominates the world of databases.

https://insights.stackoverflow.com/survey/2018/#technology-databases
![stackoverflow-survey-2018-databases](https://user-images.githubusercontent.com/194400/52594468-80cb3b80-2e43-11e9-867a-eeb4eea9a322.png)


https://db-engines.com/en/ranking
![dbms-ranking](https://user-images.githubusercontent.com/194400/52594416-64c79a00-2e43-11e9-8a61-02af22554802.png)

> _**Note**: you should never adopt a technology
based on it's **current popularity**,
also be ware of_
["_argumentum ad populum_"](https://en.wikipedia.org/wiki/Argumentum_ad_populum)
("_it's popular therefore you should use it_").
_Always pick the **appropriate tool** for the job
based on the requirements, constraints and/or availability
(both of "skill" on your existing team or in the wider community).
We include these stats to explain that **relational databases**
are **still** the most widely used **by far** and so
learning SQL skills is a very **wise investment**
both as an **individual** and for your **team** or **organisation**._


## PostgreSQL is _Easy_ to Learn and it Runs _Everywhere_!

Getting started with PostgreSQL is _easy_,
(_just follow the steps in this guide and try out the example queries!_) <br />
When you are ready to _deploy_ your app, you are in safe hands,
PostgreSQL runs _everywhere_:

+ **Travis-CI** (free) Integration Testing:
https://docs.travis-ci.com/user/database-setup/#postgresql
+ **Heroku** PostgreSQL (_free for MVP: 10k rows_): https://www.heroku.com/postgres
+ AWS RDS Postgres (_good value + high performance_):
https://aws.amazon.com/rds/postgresql/
+ Google Cloud SQL: https://cloud.google.com/sql/
+ DigitalOcean: https://www.digitalocean.com/products/managed-databases/
+ Linode:
https://www.linode.com/docs/databases/postgresql/create-a-highly-available-postgresql-cluster-using-patroni-and-haproxy/
+ Azure: https://azure.microsoft.com/en-us/services/postgresql/
  + Citus: https://techcrunch.com/2019/01/24/microsoft-acquires-citus-data
+ Self-managed high availability cluster: https://github.com/sorintlab/stolon

# _Who_?

_Everyone_ building _any_ application that stores data should learn SQL.
SQL is _ubiquitous_ in every field/industry and the sooner you learn/master it,
the higher your life-time return on time investment.

Learning how to use a relational database is a foundational skill
for all of computer science and application development.

Being _proficient_ in SQL will open the door to Data Science with
[SQL-on-Hadoop](https://mapr.com/why-hadoop/sql-hadoop/sql-hadoop-details/)
[Apache Spark](https://en.wikipedia.org/wiki/Apache_Spark#Spark_SQL),
Google [BigQuery](https://en.wikipedia.org/wiki/BigQuery),
[Oracle](https://en.wikipedia.org/wiki/Oracle_Corporation#Controversies)
and [Teradata](https://en.wikipedia.org/wiki/Teradata).
In short, get _really_ good at SQL! It's _very_ useful.

# _What_?

This tutorial covers 5 areas:

1. _What_ is PostgreSQL?
2. _How_ do I get _started_ with PostgreSQL? (_a fully functioning example!_)
3. What is Structured Query Language (SQL)? (_lots of example queries!_)
4. _How_ do I write my _own_ SQL Queries?
5. _How_ do I deploy my own PostgreSQL-based Application?

Once you have covered these areas,
you will _know_ if PostgreSQL
is "right" for your needs,
or if you need to keep looking for a different way
to store data.

Let's dive in!

## 1. What is PostgreSQL?

PostgreSQL (_often shortened to simply "**Postgres**"_)
is an advanced
**R**elational **D**ataBase **M**anagement **S**ystem ("RDBMS"),
that lets you _efficiently_ and _securely_ store _any_ type of data.
We will _explain_ "Relational Database" in the context
of our _example_ below,
so don't worry if it sounds like a buzzword soup.

Postgres has an emphasis on standards compliance and extensibility
which means there are many plugins you can use to enhance it
like [PostGIS](https://postgis.net) for mapping applications
and entire projects built on top of it like
[TimescaleDB](https://www.timescale.com/)
(_a time-series database perfect for analytics_)
and [AgensGraph](https://bitnine.net/)
(_a graph database, great for modelling networks e.g a "social graph"_).


Structured Query Language (SQL)
is the preferred means of interacting with data at any scale. <br />

> The _only_ reason MySQL is still more widely used than Postgres
can be summarised in *one word*: **WordPress**.
> WordPress has a firm grip on the CMS-based website market
and it shows no sign of slowing down.
> If your goal is to build CMS-based websites,
or the company you _already_ work for uses
[WordPress](https://www.cvedetails.com/vendor/2337/Wordpress.html),
you should go for it!
> If you prefer a more _general_ introduction to SQL,
> follow _this_ tutorial!
> The knowledge you will gain by learning Postgres is 95%+
"_transferable_" to other SQL databases so don't worry about
the differences between MySQL and Postgres for now.
If you're curious, read: https://hackr.io/blog/postgresql-vs-mysql


<!-- I'm undecided on the following section ...
I don't want to be seen to be "bashing" MongoDB ...

Unless you work for [MongoDB](https://en.wikipedia.org/wiki/MongoDB#Security)
(_or another [NoSQL](https://en.wikipedia.org/wiki/NoSQL) database company_)
the chance that you will encounter a Relational Database
and thus benefit from knowing Structured Query Language (SQL)
in your _career_ as a software engineer tends toward 100%.

If you are _tempted_ to use MongoDB as your _primary_ data store,
read this:
https://www.theguardian.com/info/2018/nov/30/bye-bye-mongo-hello-postgres
MongoDB is _meant_ to be a "document-oriented database",
so it should be _perfect_ for a CMS (_document content_).
And yet, after years of _trying_ to make it work,
the _highly_ competent engineers at The Guardian
decided it wasn't worth the hassle and switched to PostgreSQL to _great_ result!
Read the Hacker News thread: https://news.ycombinator.com/item?id=18717168

If you are _tempted_ by MongoDB because of the "***MEAN***" **stack**,
by all means dive into trying it. We have been there and seen the appeal.
e.g: https://github.com/dwyl/mongo-search ...
(_We learned the "hard way"
that Searching MongoDB was slow and inconsistent,
PostgreSQL has **much better** full-text search
or use ElasticSearch!_)
However we _urge_ you to understand
that the _benefit_ of getting _started_ fast
(_because your MongoDB records don't have a pre-defined schema_)
will _quickly_ wear off when queries become convoluted and _slow_
(_because there are no **real** way to do multiple "JOINs"
and index optimisation is laborious_).

Another important factor
(_for us @dwyl because we are
  [security](https://github.com/dwyl/learn-security/)-conscious_)
is the fact that MongoDB is _insecure_ by **`default`** see:
https://en.wikipedia.org/wiki/MongoDB#Security ...
We cannot stand the idea of insecurely storing _anyone's_ data,
and PostgreSQL makes it _easy_ to add advanced security, access controls
table-level permissions and field-level data encryption.

-->

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

This will select all of the columns in both the countries
and cities tables the data, the rows are matched up by `country_code`.

**Grouping**
You can put rows into groups where the group is defined by a shared value in a particular column.

```sql
SELECT venue_id, count(*)
  FROM events
  GROUP BY venue_id;
```

This will group the rows together by the venue_id,
count is then performed on each of the groups.

### Learning Resources

+ Node-hero: https://blog.risingstack.com/node-js-database-tutorial
+ Pluralsight postgres getting started:
  https://www.pluralsight.com/courses/postgresql-getting-started
+ Tech Republic Postgres setup:
  http://www.techrepublic.com/blog/diy-it-guy/diy-a-postgresql-database-server-setup-anyone-can-handle
+ PostGIS installation: http://postgis.net/install
+ PostGIS docs: http://postgis.net/docs/manual-2.3
+ PostGIS ST_Distance: http://postgis.net/docs/ST_Distance.html
+ Foreign Key Constraints:
  + https://en.wikipedia.org/wiki/Foreign_key
  + http://www.postgresqltutorial.com/postgresql-foreign-key
  + https://tableplus.io/blog/2018/08/postgresql-how-to-add-a-foreign-key.html
+ Graphical Interface (GUI) tools:
https://wiki.postgresql.org/wiki/Community_Guide_to_PostgreSQL_GUI_Tools
