# Comandos rápidos - Felipe Wiclif Leal da Silva - RM563901

```bash
docker network create dimdim-network-rm563901

docker volume create dimdim-volume-rm563901

docker container run -d   --name dimdim-db-rm563901   --network dimdim-network-rm563901   -e POSTGRES_USER=dimdim   -e POSTGRES_PASSWORD=dimdim123   -e POSTGRES_DB=dimdimdb   -v dimdim-volume-rm563901:/var/lib/postgresql/data   postgres:16-alpine

docker image build -t dimdimapp-img-rm563901 .

docker container run -d   --name dimdim-app-rm563901   --network dimdim-network-rm563901   -p 8080:3000   -e DB_HOST=dimdim-db-rm563901   -e DB_PORT=5432   -e DB_USER=dimdim   -e DB_PASSWORD=dimdim123   -e DB_NAME=dimdimdb   -e PORT=3000   dimdimapp-img-rm563901

docker container ps

docker container exec -it dimdim-app-rm563901 sh
pwd
ls
whoami
exit

docker container exec -it dimdim-db-rm563901 psql -U dimdim -d dimdimdb -c "SELECT * FROM clientes;"
```
