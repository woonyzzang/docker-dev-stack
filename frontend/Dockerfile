FROM node:16.15-slim

LABEL maintainer="woonyzzang <seungwoonjjang@gmail.com>"
LABEL version="1.0.0"
LABEL description="Docker Dev Frontend"

# 디렉토리 생성
# RUN mkdir -p /app
# 이미지 내에서 명령어를 실행할(현위치로 잡을) 디렉토리 설정
WORKDIR /app

#ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
# COPY package.json /app/package.json
#COPY package.json /app
#ADD package.json /app

# 이미지 생성 과정에서 실행할 명령어
RUN npm install --legacy-peer-deps

COPY . .
#COPY . /app
#ADD . /app

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV CHOKIDAR_USEPOLLING=true

# 컨테이너 실행 시 실행할 명령어
# CMD ["npm", "run", "dev"]

# 리액트 hot reload
#ENV CHOKIDAR_USEPOLLING=true

# [D] 이미지 생성 명령어 (현 파일과 같은 디렉토리에서..)
# docker build -t {이미지명} .

# [D] 컨테이너 생성 & 실행 명령어
# docker run --name {컨테이너명} -v $(pwd):/home/node/app -p 8080:8080 {이미지명}

# [D] 컨테이너 배시쉘 확인
# docker exec -it nuxt bash

# [D] 이미지 rebuild
# docker-compose down -v
# docker-compose up --build

# [D] 이미지 수동 빌드
# docker build -t docker-develop-structure-frontend .

# [D] 강제 종료
# docker container prune
# docker volume prune
