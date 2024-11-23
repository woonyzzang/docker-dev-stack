@echo off
:: Title        : Docker Rebuild shell script
:: Date         : 2023-02-01
:: Author       : "woonyzzang" <seungwoonjjang@gmail.com>
:: Version      : 1.0
:: Description  : Backend Container Rebuild

docker-compose up -d --force-recreate --no-deps --build backend
