# Roteiro do vídeo - CP3 Dockerfile - RM563901

Aluno: Felipe Wiclif Leal da Silva  
RM: 563901

## Ordem recomendada para gravar

1. Abrir o GitHub e mostrar o repositório com `Dockerfile`, `README.md`, `package.json` e pasta `src`.
2. Acessar a VM em nuvem por SSH.
3. Executar o `git clone` do repositório.
4. Entrar na pasta do projeto.
5. Criar a rede Docker: `dimdim-network-rm563901`.
6. Criar o volume nomeado: `dimdim-volume-rm563901`.
7. Subir o banco PostgreSQL em background com o nome `dimdim-db-rm563901`.
8. Gerar a imagem personalizada com o Dockerfile: `dimdimapp-img-rm563901`.
9. Subir a aplicação em background com o nome `dimdim-app-rm563901`.
10. Rodar `docker container ps` e mostrar os dois containers com o RM no nome.
11. Entrar no container da aplicação com `docker container exec -it dimdim-app-rm563901 sh`.
12. Rodar `pwd`, `ls` e `whoami`. O usuário deve ser `dimdimuser`, provando que não é root.
13. Entrar no container do banco com `docker container exec -it dimdim-db-rm563901 sh`.
14. Rodar `pwd`, `ls`, `whoami` e acessar o `psql`.
15. Abrir a aplicação no navegador usando o IP público da VM e porta 8080.
16. Fazer CREATE de cliente.
17. Rodar `SELECT * FROM clientes;` direto no banco.
18. Fazer READ/listagem.
19. Fazer UPDATE do saldo.
20. Rodar `SELECT * FROM clientes;` direto no banco.
21. Fazer DELETE.
22. Rodar `SELECT * FROM clientes;` direto no banco.
23. Testar persistência: remover e subir novamente o container do banco usando o mesmo volume.
24. Rodar SELECT final e mostrar que os dados persistiram.
25. Finalizar mostrando que o vídeo e o GitHub serão inseridos no PDF de entrega.

## Cuidados para não perder ponto

- Não gravar pelo celular.
- Gravar em 720p ou mais.
- Usar áudio claro.
- Mostrar que está em nuvem, não apenas localhost.
- Evitar cortes em partes importantes.
- Mostrar SELECT depois de cada operação do CRUD.
