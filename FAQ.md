
## Why PostgreSQL and _Not_ MySQL?

The _good_ news is that almost all of your PostgreSQL knowledge
is _directly_ transferable to [MySQL](https://en.wikipedia.org/wiki/MySQL).
Since _both_ use SQL as the language
for interacting with the database,
the time you invest in learning PostgreSQL
and building SQL skills is a hugely valuable.

Learning how to _run_ means you also know how to _walk_.
PostgreSQL might _feel_ "more difficult"
in the same way that , but the principals are all the same.
Just stick with it and keep asking questions until it all "makes sense".
If you need to _apply_ your SQL skills to MySQL, MS SQL or MariaDB,
it will only take you a few minutes to adapt to it.

It's very much like riding a bicycle.
Once you know how to balance, pedal and steer,
your skills transfer to other bicycles.



The _reason_ MySQL is still _hugely_ popular
can be summarised by _one_ word:
[***WordPress***](https://en.wikipedia.org/wiki/WordPress).

Over **30%** of the 10 million most popular websites use WordPress.
WordPress runs on the "LAMP" (_Linux Apache **MySQL** PHP_) stack,
which means that people are using MySQL by _`default`_
not _conscious enlightenment_.
+ https://www.whoishostingthis.com/compare/wordpress/stats
+ https://w3techs.com/technologies/overview/content_management/all


## Why _Not_ Use WordPress?

WordPress is _unquestionably_ a good CMS and blogging platform
that helps millions of people/businesses publish online.
Sadly, it's not secure by _default_ and when a vulnerability is discovered,
it gets exploited en-mass very quickly.
Yes, WordPress can be
["Hardened"](https://codex.wordpress.org/Hardening_WordPress)
but that is _usually_ not the _first_ thing on people's todo list
when launching a website or blog.
The result is that _thousands_ of WordPress websites get hacked
each time a patch is released e.g:
https://www.zdnet.com/article/thousands-of-wordpress-sites-backdoored-with-malicious-code
and it creates a maintenance headache
for the person/people _responsible_ for the site.
We're not saying you (_or anyone else_) should not use WordPress,
just make sure you follow the the latest "best practice" if you do.
(_We have been "burned" by it through no fault of our own...
and would not touch it again with a barge pole!
There are **much** more **secure** and **performant** options!_)

### What About NoSQL Databases/Datastores Like ElasticSearch and Redis?

@dwyl we are _huge_ fans of _special-purpose_ data storage/retrieval systems.
We have used _several_ NoSQL databases including CouchDB, ElasticSearch,
MongoDB, Neo4J and Redis.
Of these we _recommend_ ElasticSearch for full-text search
and Redis for in-momory datasets and caching. see:

+ [github.com/dwyl/learn-**elasticsearch**](https://github.com/dwyl/learn-elasticsearch)
+ [github.com/dwyl/learn-**redis**](https://github.com/dwyl/learn-redis)

However as a "primary" datastore with a robust query language,
we feel PostgreSQL is the _clear_ winner as a "first" database.
