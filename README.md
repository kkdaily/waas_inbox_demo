# README

## About

This is a WIP demo of an inbox web app where job seekers and startup founders can have 1-to-1 conversations with eachother.

Features include:
* Founder and candidate login
* 1-to-1 messaging
* Infinite scrolling + pagination
* Search filter
* Conversations ordered by most recent message
* Mobile responsive layout

## How to run locally



### Prerequisites

You'll need the following dependencies installed on your machine
- [Ruby](https://www.ruby-lang.org/en/documentation/installation/) version 2.6.3
- [Node.js](https://nodejs.org/en/download/) version 8.16.0 or later
- [Yarn](https://classic.yarnpkg.com/en/docs/install) 1.22.0 or later
- [Rails](https://guides.rubyonrails.org/getting_started.html) 6.0.0 or later
- [PostgreSQL](https://www.postgresql.org/) 10.0 or later

### Configure the database
Edit `config/database.yml` and update the `username` and `password` under the `default` section with your PostgreSQL user.

Then, create a development and test database for the app by running the following command in your terminal
```
$ rails db:create
```

### Seeding the database
First, run the migrations
```
$ rails db:migrate
```
Then seed the database with test data
```
$ rails db:seed
```

### Running the server
```
$ rails s -p=3001
```
the app should now be running on `http://localhost:3001`.

