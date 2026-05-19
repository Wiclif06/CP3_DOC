# DimDimApp - CP3 Dockerfile - RM563901

**Aluno:** Felipe Wiclif Leal da Silva  
**RM:** 563901  

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