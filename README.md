# DimDimApp - CP3 Dockerfile - RM563901

**Aluno:** Felipe Wiclif Leal da Silva  
**RM:** 563901  
**Equipe:** ZypherX  
**Disciplina:** DevOps Tools & Cloud Computing  

Projeto desenvolvido para o 3º Checkpoint do 1º semestre. A solução utiliza dois containers Docker: um container para a aplicação Node.js/Express com Dockerfile personalizado e um container PostgreSQL para persistência de dados com volume nomeado.

## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- Dockerfile
- Docker Network
- Docker Volume nomeado
- Git e GitHub

## Requisitos atendidos

- Dois containers Docker: aplicação e banco de dados.
- Banco PostgreSQL com volume nomeado.
- Aplicação com CRUD completo na tabela `clientes`.
- Containers executando na mesma rede Docker criada manualmente.
- Container da aplicação com Dockerfile e imagem personalizada.
- Aplicação executando com usuário não-root: `dimdimuser`.
- Diretório de trabalho definido no Dockerfile: `/usr/src/dimdimapp`.
- Uso de variáveis de ambiente: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` e `PORT`.
- Containers executados em background com `-d`.
- Nome dos containers contendo o RM563901.
- How To completo para execução em nuvem.

---

# Como executar em nuvem

> Execute este passo a passo em uma VM Linux na Azure, AWS, Oracle Cloud ou outra nuvem. Não grave o vídeo apenas em localhost.

## 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/cp3-dockerfile-rm563901.git
cd cp3-dockerfile-rm563901
```

## 2. Criar a rede Docker

```bash
docker network create dimdim-network-rm563901
```

## 3. Criar o volume nomeado do banco

```bash
docker volume create dimdim-volume-rm563901
```

## 4. Subir o container do banco em background

```bash
docker container run -d   --name dimdim-db-rm563901   --network dimdim-network-rm563901   -e POSTGRES_USER=dimdim   -e POSTGRES_PASSWORD=dimdim123   -e POSTGRES_DB=dimdimdb   -v dimdim-volume-rm563901:/var/lib/postgresql/data   postgres:16-alpine
```

## 5. Gerar a imagem personalizada da aplicação pelo Dockerfile

```bash
docker image build -t dimdimapp-img-rm563901 .
```

## 6. Subir o container da aplicação em background

```bash
docker container run -d   --name dimdim-app-rm563901   --network dimdim-network-rm563901   -p 8080:3000   -e DB_HOST=dimdim-db-rm563901   -e DB_PORT=5432   -e DB_USER=dimdim   -e DB_PASSWORD=dimdim123   -e DB_NAME=dimdimdb   -e PORT=3000   dimdimapp-img-rm563901
```

## 7. Verificar os containers em execução

```bash
docker container ps
```

O terminal deve mostrar os dois containers:

- `dimdim-db-rm563901`
- `dimdim-app-rm563901`

## 8. Acessar a aplicação

No navegador, acesse:

```text
http://IP_PUBLICO_DA_VM:8080
```

Libere a porta `8080` no firewall/security group da sua nuvem antes de testar.

---

# Evidências obrigatórias no terminal

## Container da aplicação

```bash
docker container exec -it dimdim-app-rm563901 sh
pwd
ls
whoami
exit
```

Resultado esperado:

- `pwd`: `/usr/src/dimdimapp`
- `ls`: arquivos da aplicação
- `whoami`: `dimdimuser`

## Container do banco

```bash
docker container exec -it dimdim-db-rm563901 sh
pwd
ls
whoami
psql -U dimdim -d dimdimdb
```

Dentro do PostgreSQL, execute:

```sql
SELECT * FROM clientes;
```

Para sair:

```sql
\q
```

---

# Testes de CRUD por terminal

Também é possível testar por navegador. Para deixar a evidência mais forte no vídeo, use estes comandos `curl`.

## CREATE

```bash
curl -X POST http://localhost:8080/clientes   -H "Content-Type: application/json"   -d '{"nome":"Felipe Wiclif Leal da Silva","email":"felipe.rm563901@fiap.com.br","saldo":1500}'
```

Depois comprove no banco:

```bash
docker container exec -it dimdim-db-rm563901 psql -U dimdim -d dimdimdb -c "SELECT * FROM clientes;"
```

## READ

```bash
curl http://localhost:8080/clientes
```

## UPDATE

```bash
curl -X PUT http://localhost:8080/clientes/1   -H "Content-Type: application/json"   -d '{"saldo":2500}'
```

Depois comprove no banco:

```bash
docker container exec -it dimdim-db-rm563901 psql -U dimdim -d dimdimdb -c "SELECT * FROM clientes;"
```

## DELETE

```bash
curl -X DELETE http://localhost:8080/clientes/1
```

Depois comprove no banco:

```bash
docker container exec -it dimdim-db-rm563901 psql -U dimdim -d dimdimdb -c "SELECT * FROM clientes;"
```

---

# Teste de persistência de dados

1. Crie um cliente pela aplicação.
2. Rode o SELECT no banco.
3. Remova o container do banco.
4. Suba novamente usando o mesmo volume nomeado.
5. Rode o SELECT novamente e mostre que os dados continuam salvos.

```bash
docker container stop dimdim-db-rm563901
docker container rm dimdim-db-rm563901

docker container run -d   --name dimdim-db-rm563901   --network dimdim-network-rm563901   -e POSTGRES_USER=dimdim   -e POSTGRES_PASSWORD=dimdim123   -e POSTGRES_DB=dimdimdb   -v dimdim-volume-rm563901:/var/lib/postgresql/data   postgres:16-alpine

docker container exec -it dimdim-db-rm563901 psql -U dimdim -d dimdimdb -c "SELECT * FROM clientes;"
```

---

# Limpeza do ambiente

```bash
docker container stop dimdim-app-rm563901 dimdim-db-rm563901
docker container rm dimdim-app-rm563901 dimdim-db-rm563901
docker network rm dimdim-network-rm563901
docker volume rm dimdim-volume-rm563901
```
