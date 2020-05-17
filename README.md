# Getting Started

Test project to add schools with name address and other information and search schools by name and address.

# Build and Deployement instruction

## Development Enviroment setup

Make sure following are met

- JDK 1.8
- Docker and Docker Compose
- Node 12.13.1
- Angular CLI 8.3.xxx
- MySQL 5.7.xx


## Mysql User credentials

- Following username and password should include
  username: root,
  password: root
- Mysql instance should be exposed in localhost in port 3306
- jdbc:mysql://localhost:3306/

## Appication source and development envioronment

- Backend avialable at src/main/java
- Frontend avialable at src/main/webapp
- MySQL instance will be avilable by using docker-compose file at src/main/docker(command : docker-compose up)
- Bankend will be avialable by using following command ant project root afert mysql instance is up
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```
- Frontend will be served at http://localhost:4200 by executing following command at src/main/webapp

```bash
ng serve
```

## Build application binary

In the project root directory execute the following bach script

```bash
./build.sh
```

## Start the application

```bash
java -jar -Dspring.profiles.active=dev target/schoolbag-0.0.1-SNAPSHOT.jar
```

After execting above command application is avialable at http://localhost:8080


## To excute docker based containerized deployement

- Run the docker-compose.yml file using the following command

```bash
docker-compose up --build
```

- After few munutes application is avilable at http://localhost:8080