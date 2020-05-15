FROM openjdk:8-jdk-alpine
ADD target/schoolbag-0.0.1-SNAPSHOT.jar schoolbag-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "schoolbag-0.0.1-SNAPSHOT.jar"]
