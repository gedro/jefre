FROM eclipse-temurin:21-jdk-alpine

ARG JAR_FILE
COPY ${JAR_FILE} app.jar

EXPOSE 5005

ENTRYPOINT java -jar app.jar
