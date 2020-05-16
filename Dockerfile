FROM node:12.7-alpine as node
RUN mkdir -p /app/source
COPY . /app/source
WORKDIR /app/source
RUN npm install -g @angular/cli@8.3.25
WORKDIR /app/source/src/main/webapp
RUN npm install
RUN ng build --prod --aot
RUN cp -a /app/source/src/main/webapp/dist/webapp/* /app/source/src/main/resources/static


FROM openjdk:8-jdk-alpine as builder
RUN mkdir -p /app/source
COPY --from=node /app/source /app/source/
WORKDIR /app/source
RUN ./mvnw clean install -DskipTests


FROM builder
COPY --from=builder /app/source/target/*.jar schoolbag-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "-Dspring.profiles.active=prod", "schoolbag-0.0.1-SNAPSHOT.jar"]


# FROM openjdk:8-jdk-alpine
# COPY target/*.jar schoolbag-0.0.1-SNAPSHOT.jar
# EXPOSE 8080
# ENTRYPOINT [ "java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "-Dspring.profiles.active=prod", "schoolbag-0.0.1-SNAPSHOT.jar"]



