debug: docker-compose up --build -d
run: docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d --scale api=5
unit tests: docker exec part-1_api_1 npm run test --watchAll=false
integration tests: ...

// os testes vão precisar estar fora da aplicação, se não, não tem como saber se a mesma requisição já foi feita ou não, é preciso estar no contexto externo da aplicação para ter certeza
// testes unitários podem estar dentro da aplicação