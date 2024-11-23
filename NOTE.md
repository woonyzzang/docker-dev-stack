# Docker Develop Structure
> Nginx + Nuxt2 + .Net6

- Rancher Desktop 오픈소스 앱
  - <https://rancherdesktop.io/>

## 모든 도커 컨테이너 삭제 (remove all docker containers)
구동중인 모든 도커 컨테이너들을 중지시키고, 삭제한다.

``` bash
$ docker stop $(docker ps -a -q)
$ docker rm $(docker ps -a -q)
```

## 모든 도커 이미지 삭제(remove all docker images)
``` bash
$ docker rmi $(docker images -q)
```

## User Defined Network
``` bash
$ docker network create zempot-net

$ docker network ls
$ docker network inspect zempot-net
$ docker network rm zempot-net
```

## Static IP 할당
User Defined Network 를 사용하면 고정 ip 를 할당 할 수 있다.
``` bash
$ docker run -it --name {alias} --net zempotnet --ip 192.168.100.100 {container}
```

docker network create zempot-net
docker volume create nodemodules

docker rm app
docker network rm zempot-net
docker volume rm nodemodules
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)


### 리눅스 bash 쉘 > Docker 시작
``` bash
$ ./start_server.sh
```

### 리눅스 bash 쉘 > Docker 중지
``` bash
$ ./end_server.sh
```

### 리눅스 bash 쉘 명령어 실행 시 권한 오류 날 경우
``` bash
$ chmod x+ {filename}.sh
```

---

### https 를 적용하지 않고 SSL 인증서 발급받기
- <https://node-js.tistory.com/32>

1. start_server.sh 실행 # 네트워크, 볼륨 생성

// proxy > conf.d > zempotdocker.conf 파일
``` config
server {
     listen 80;
     listen [::]:80;

     server_name {domain}; // 등록한 도메인으로 변경

     location /.well-known/acme-challenge/ {
         allow all;
         root /var/www/certbot;
     } 
} 
```

2. docker-compose up -d --build 실행 # 프론트, 백엔드 서버 기동
3. ./proxy/docker-compose up -d --build 실행 # 프록시 서버, SSL 인증 기동
  - nginx와 certbot 컨테이너가 살아있어야 함.

인증서 발급받는 `init-letsencrypt.sh` 스크립트 도메인, 이메일 주소, 디렉터리를 변경.
인증서 발급에 실패한 경우 실패 시 메시지나 docker log를 통해 원인을 찾을 수 있다.

// init-letsencrypt.sh 파일
``` shell
#!/bin/bash

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

domains=("zempotdocker.com" "www.zempotdocker.com") # {도메인}
rsa_key_size=4096
data_path="./proxy/staging/certbot"  # {디렉토리}
email="sw.cho@zempot.com" # Adding a valid address is strongly recommended  # {이메일}
staging=1 # Set to 1 if you're testing your setup to avoid hitting request limits

...
```

6. init-letsencrypt.sh 실행
``` bash
$ ./init-letsencrypt.sh

or 

$ ./init-letsencrypt2.sh staging sw.cho@zempot.com zempotdocker.com www.zempotdocker.com
```

### HTTPS 적용하기

// ./proxy/nginx.conf 수정
``` config
server {
    listen 80;
    server_name {example.org}; # 도메인으로 변경
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name {example.org}; # 도메인으로 변경
    server_tokens off;

    ssl_certificate /etc/letsencrypt/live/{example.org}/fullchain.pem; # example.org를 도메인으로 변경
    ssl_certificate_key /etc/letsencrypt/live/{example.org}/privkey.pem; # example.or를 도메인으로 변경
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass  <{http://example.org}>; # 도메인으로 변경
        proxy_set_header    Host                $http_host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
    }
}
```

5. 인증서를 자동으로 갱신하도록 설정하지 않으면 만료될 때마다 다시 발급을 해주어야 한다.
   자동으로 인증서가 갱신되도록 docker-compose.yml 파일 수정 한다.

// ./proxy/docker-compose.yml
``` yml
version: '3'

services:
  nginx:
    image: nginx:1.15-alpine
    restart: unless-stopped
    volumes:
      - ./data/nginx:/etc/nginx/conf.d
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
    ports:
      - "80:80"
      - "443:443"
    command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \\"daemon off;\\"'"
  certbot:
    image: certbot/certbot
    restart: unless-stopped
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
```

6. host 파일 수정
``` host
127.0.0.1 zempotdocker.com 
```

7. 브라우저 접속 > https://zempotdocker.com# Docker Develop Structure
> Nginx + Nuxt2 + .Net6

- Rancher Desktop 오픈소스 앱
  - <https://rancherdesktop.io/>

## 모든 도커 컨테이너 삭제 (remove all docker containers)
구동중인 모든 도커 컨테이너들을 중지시키고, 삭제한다.

``` bash
$ docker stop $(docker ps -a -q)
$ docker rm $(docker ps -a -q)
```

## 모든 도커 이미지 삭제(remove all docker images)
``` bash
$ docker rmi $(docker images -q)
```

## User Defined Network
``` bash
$ docker network create zempot-net

$ docker network ls
$ docker network inspect zempot-net
$ docker network rm zempot-net
```

## Static IP 할당
User Defined Network 를 사용하면 고정 ip 를 할당 할 수 있다.
``` bash
$ docker run -it --name {alias} --net zempotnet --ip 192.168.100.100 {container}
```

docker network create zempot-net
docker volume create nodemodules

docker rm app
docker network rm zempot-net
docker volume rm nodemodules
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)


### 리눅스 bash 쉘 > Docker 시작
``` bash
$ ./start_server.sh
```

### 리눅스 bash 쉘 > Docker 중지
``` bash
$ ./end_server.sh
```

### 리눅스 bash 쉘 명령어 실행 시 권한 오류 날 경우
``` bash
$ chmod x+ {filename}.sh
```

---

### https를 적용하지 않고 SSL 인증서 발급받기
- <https://node-js.tistory.com/32>

1. start_server.sh 실행 # 네트워크, 볼륨 생성

// proxy > conf.d > zempotdocker.conf 파일
``` config
server {
     listen 80;
     listen [::]:80;

     server_name {domain}; // 등록한 도메인으로 변경

     location /.well-known/acme-challenge/ {
         allow all;
         root /var/www/certbot;
     } 
} 
```

2. docker-compose up -d --build 실행 # 프론트, 백엔드 서버 기동
3. ./proxy/docker-compose up -d --build 실행 # 프록시 서버, SSL 인증 기동
  - nginx와 certbot 컨테이너가 살아있어야 함.

인증서 발급받는 `init-letsencrypt.sh` 스크립트 도메인, 이메일 주소, 디렉터리를 변경.
인증서 발급에 실패한 경우 실패 시 메시지나 docker log를 통해 원인을 찾을 수 있다.

// init-letsencrypt.sh 파일
``` shell
#!/bin/bash

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

domains=("zempotdocker.com" "www.zempotdocker.com") # {도메인}
rsa_key_size=4096
data_path="./proxy/staging/certbot"  # {디렉토리}
email="sw.cho@zempot.com" # Adding a valid address is strongly recommended  # {이메일}
staging=1 # Set to 1 if you're testing your setup to avoid hitting request limits

...
```

6. init-letsencrypt.sh 실행
``` bash
$ ./init-letsencrypt.sh

or 

$ ./init-letsencrypt2.sh staging sw.cho@zempot.com zempotdocker.com www.zempotdocker.com
```

### HTTPS 적용하기

// ./proxy/nginx.conf 수정
``` config
server {
    listen 80;
    server_name {example.org}; # 도메인으로 변경
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name {example.org}; # 도메인으로 변경
    server_tokens off;

    ssl_certificate /etc/letsencrypt/live/{example.org}/fullchain.pem; # example.org를 도메인으로 변경
    ssl_certificate_key /etc/letsencrypt/live/{example.org}/privkey.pem; # example.or를 도메인으로 변경
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass  <{http://example.org}>; # 도메인으로 변경
        proxy_set_header    Host                $http_host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
    }
}
```

5. 인증서를 자동으로 갱신하도록 설정하지 않으면 만료될 때마다 다시 발급을 해주어야 한다.
   자동으로 인증서가 갱신되도록 docker-compose.yml 파일 수정 한다.

// ./proxy/docker-compose.yml
``` yml
version: '3'

services:
  nginx:
    image: nginx:1.15-alpine
    restart: unless-stopped
    volumes:
      - ./data/nginx:/etc/nginx/conf.d
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
    ports:
      - "80:80"
      - "443:443"
    command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \\"daemon off;\\"'"
  certbot:
    image: certbot/certbot
    restart: unless-stopped
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
```

6. host 파일 수정
``` host
127.0.0.1 zempotdocker.com 
```

7. 브라우저 접속 > https://zempotdocker.com