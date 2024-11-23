#!/bin/bash
#: Title        : Docker Start shell script
#: Date         : 2023-02-01
#: Author       : "woonyzzang" <seungwoonjjang@gmail.com>
#: Version      : 1.0
#: Description  : Container Start

docker network create --gateway 172.18.0.1 --subnet 172.18.0.0/16 zempot-net # 네트워크 고정 ip 할당
docker volume create nodemodules

docker-compose up -d --build
docker-compose -f ../../proxy/docker-compose.yml up -d --build
