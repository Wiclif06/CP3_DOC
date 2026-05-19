# CP3 - Dockerfile - DimDimApp

## Nome da equipe
ZypherX

## Integrantes
- Felipe Wiclif Leal da Silva - RM563901

## Link do repositório GitHub
https://github.com/SEU_USUARIO/cp3-dockerfile-rm563901

## Link do vídeo no YouTube
https://youtube.com/SEU_VIDEO

## Resumo da solução
O projeto DimDimApp foi desenvolvido para atender ao 3º Checkpoint de DevOps Tools & Cloud Computing. A solução possui dois containers Docker: um container para a aplicação Node.js/Express, gerado a partir de Dockerfile próprio, e um container PostgreSQL para persistência de dados.

A aplicação executa com usuário não-root, utiliza diretório de trabalho definido, recebe variáveis de ambiente e possui CRUD completo da tabela `clientes`. O banco de dados utiliza volume nomeado para garantir persistência, e ambos os containers são executados em background na mesma rede Docker criada para o projeto.

## Evidências previstas no vídeo
- Execução em ambiente de nuvem.
- Criação da rede Docker.
- Criação do volume nomeado.
- Execução do banco PostgreSQL.
- Build da imagem personalizada da aplicação via Dockerfile.
- Execução do container da aplicação.
- Demonstração de `docker container ps`.
- Demonstração de `docker container exec` com `pwd`, `ls` e `whoami`.
- CRUD completo da aplicação.
- SELECT diretamente no banco após cada operação.
- Teste de persistência de dados com volume nomeado.
