FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:resolve
COPY src ./src
RUN mvn clean package -DskipTests

FROM quay.io/wildfly/wildfly:34.0.1.Final-jdk21
COPY --from=build /app/target/customerserver.war /opt/jboss/wildfly/standalone/deployments/
