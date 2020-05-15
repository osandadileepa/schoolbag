# Deployement Instruction

## Development Enviroment setup

Make sure following are met

- JDK 1.8
- Docker
- Node 12.13.1
- Angular CLI 8.3.xxx
- MySQL 5.7.xx


## Mysql User credentions

- Following username and password should include
  username: root
  password: root
- Mysql instance should be exposed in localhost in port 3306
- jdbc:mysql://localhost:3306/


## Build application binary

In the project root directory execute the following bach script

```bash
./build.sh
```

## Start the application

```bash
java -jar target/schoolbag-0.0.1-SNAPSHOT.jar
```

After execting above command application is avialable at http://localhost:8080

I have created docker file to deploy application in java install apllication in order access that

- Build the docker image using "Dockerfile" file at projetc root.
- Need a MySQL instance with above credential and running in the same docker network.