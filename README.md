# Programming Challenges

This repo contains the code for the following programming problems
- [Products API](#products-api)
- [URL Aggregator](#url-aggregator)



# Products API <a name="products-api"></a>
Before running this solution, it is necessary to have Docker installed.

## Solution
To prevent duplicate values, a Redis database was used. The key value was generated using a npm library called `object-hash`, which generates a hash value from a JavaScript object. The redis database was locked on every transaction to prevent race conditions.

Nginx was used for load balacing and MongoDB for the persistence layer.

## Commands
Change directory to `/part-1` and execute the following commands.
### Build
```bash
docker-compose up --build -d
```
### API test
Run after the containers are running, run:
```bash
docker-compose exec part-1_api_1 npm run test
```
### Production mode (multiple instances of the service)
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d --scale api=5
```
### Cluster tests
```bash
docker-compose -f docker-compose.yml -f docker-compose.test.yml up --build --scale api=5 --abort-on-container-exit --exit-code-from api-tests
```


# URL Aggregator <a name="url-aggregator"></a>
Before running this solution, it is necessary to have Node and Ruby installed.

## Solution
The input file was read using NodeJS Streams API. A JavaScript object was used as a hash table, where the product id is the key and the values are the images URLs.
The code will read from `mock/input-dump.tar.gz` and write the result to `output-dump.json`.

## Commands
Change directory to `/part-2` and execute the following commands.
### Mock API
```bash
ruby mock/url-aggregator-api.rb
```
### Run
```bash
npm start
```
### Test
```bash
npm test
```
