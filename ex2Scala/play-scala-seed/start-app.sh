#!/bin/bash
docker build -t playshop .

docker run -d -p 9000:9000 playshop 

ngrok http 9000
