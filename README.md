# Social Media API

A REST API service for a social media platform

Features implemented:
- User signup
- User Login (using JWT)
- Create posts
- Fetch posts
- Like or unlike posts
- Comment or uncomment on a post
- Follow or unfollow other users
- Search (Posts)

## Installation
This project requires that you have the following installed on your personal computer
- [Docker](https://www.docker.com/) and [Docker compose](https://docs.docker.com/compose/install/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

Clone the repository

```sh
git clone https://github.com/sauce-kode/sm-api.git
cd sm-api
```

Install dependencies
```sh
Depending on your package manager, run yarn or npm install
```

Generate JWT keys
```sh
ssh keygen -t rsa -b 2048 -m PEM -f private.key
openssl rsa -in private.key -pubout -outform PEM -out public.key
```

Generate .env files
```sh
cp .env.example .env
cp .env.docker.example .env.docker
```

Start Docker containers
```sh
Start your docker application and run docker-compose up -d
```
Start the application server
```sh
yarn start or npm run start
```

## Data Model
The data model used for this project is shown below

![Social Media Data Model](/assets/images/social%20media.png)

## Notes

### - Security

RS256 signing algorithm is used to sign JWT tokens when generating them. This is to ensure a high level of  security through the private/public key pair used in generating and verifying tokens as opposed to the same single secret key of the HS256 signing algorithm.

### - Search
The two columns (title and content) in the posts table are indexed with Generalized Inverted Indexes (GIN) and a full text search is done on the posts table. GIN was chosen because it is particularly suitable for full text searches and also because of of its efficient indexing, fast search performance and concurrent updates support which would be an important feature for an application like this.