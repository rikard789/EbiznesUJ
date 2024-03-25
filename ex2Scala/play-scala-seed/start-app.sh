#!/bin/bash
docker build -t playshop .

docker run -d -p 9000:9000 playshop 

sleep 15

./ngrok http --host-header=rewrite localhost:9000
