 # syntax=docker/dockerfile:1
FROM ubuntu:22.04
WORKDIR /app

RUN apt-get update && \
    apt-get install -y openjdk-8-jdk wget unzip && \
    wget https://services.gradle.org/distributions/gradle-7.2-bin.zip && \
    unzip gradle-7.2-bin.zip -d /opt
ENV PATH=$PATH:/opt/gradle-7.2/bin

RUN wget https://github.com/JetBrains/kotlin/releases/download/v1.4.32/kotlin-compiler-1.4.32.zip && \
    unzip kotlin-compiler-1.4.32.zip -d /usr/local
ENV PATH=$PATH:/usr/local/kotlinc/bin


# COPY build.gradle /app
COPY . /app
RUN gradle build
CMD gradle run