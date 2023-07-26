FROM sapmachine:17

WORKDIR /app

COPY mvnw .

RUN chmod +x mvnw

COPY .mvn .mvn

COPY pom.xml .

RUN ./mvnw dependency:go-offline

COPY src ./src


EXPOSE 8080

CMD ["./mvnw", "spring-boot:run"]
