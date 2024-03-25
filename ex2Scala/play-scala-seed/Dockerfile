# FROM mozilla/sbt:17u212_1.2.8_
FROM sbtscala/scala-sbt:openjdk-17.0.2_1.8.1_2.13.10

WORKDIR /app
COPY . /app


# RUN sbt clean compile stage

EXPOSE 9000

CMD sbt run
# CMD ["sbt", "run"]