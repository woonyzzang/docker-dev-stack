#!/bin/bash
#: Title        : Docker Stop shell script
#: Date         : 2023-02-01
#: Author       : "woonyzzang" <seungwoonjjang@gmail.com>
#: Version      : 1.0
#: Description  : Container Stop

docker-compose down -v
docker-compose -f ../../proxy/docker-compose.yml down -v

docker network rm zempot-net
docker volume rm nodemodules

#sleep 5
#docker rm $(docker ps --filter status=exited -q)
#docker rmi $(docker images -a -q)
