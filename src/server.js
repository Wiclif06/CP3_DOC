const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'dimdim-db-rm563901',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'dimdim',
  password: process.env.DB_PASSWORD || 'dimdim123',
  database: process.env.DB_NAME || 'dimdimdb'
});

async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clientes (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(120) NOT NULL,
      email VARCHAR(160) NOT NULL UNIQUE,
      saldo NUMERIC(12,2) NOT NULL DEFAULT 0,
      criado_em TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
}

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DimDimApp CP3</title>
  <style>
    *{box-sizing:border-box} body{font-family:Arial,Helvetica,sans-serif;background:linear-gradient(135deg,#020617,#0f172a);color:#e5e7eb;margin:0;min-height:100vh;padding:32px}.card{max-width:980px;margin:auto;background:#111827;border:1px solid #334155;border-radius:18px;padding:26px;box-shadow:0 22px 70px #0008}.top{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}h1{color:#facc15;margin:0;font-size:34px}.badge{background:#facc15;color:#111827;font-weight:700;border-radius:999px;padding:8px 14px}.muted{color:#cbd5e1}.form{display:grid;grid-template-columns:1fr 1fr 160px auto;gap:10px;margin:24px 0}@media(max-width:760px){.form{grid-template-columns:1fr}}input,button{padding:13px;border-radius:12px;border:1px solid #475569;font-size:15px}input{background:#020617;color:white}button{background:#facc15;color:#111827;font-weight:bold;cursor:pointer}.item{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;background:#1f2937;margin:10px 0;padding:14px;border-radius:14px;border:1px solid #374151}.actions button{margin-left:6px}.danger{background:#fb7185}.small{font-size:13px;color:#94a3b8}.api{background:#020617;border:1px solid #334155;border-radius:12px;padding:12px;overflow:auto}</style>
</head>
<body>
  <main class="card">
    <div class="top">
      <div><h1>💰 DimDimApp</h1><p class="muted">CRUD de clientes com Node.js + PostgreSQL em containers Docker.</p></div>
      <div class="badge">RM563901</div>
    </div>
    <div class="form">
      <input id="nome" placeholder="Nome do cliente" />
      <input id="email" placeholder="E-mail" />
      <input id="saldo" type="number" step="0.01" placeholder="Saldo" />
      <button onclick="criar()">Criar</button>
    </div>
    <div class="api">Endpoints: GET /clientes | POST /clientes | PUT /clientes/:id | DELETE /clientes/:id</div>
    <h2>Clientes cadastrados</h2>
    <div id="lista"></div>
  </main>
<script>
async function listar(){
  const r=await fetch('/clientes');
  const d=await r.json();
  lista.innerHTML=d.length?d.map(c=>`<div class="item"><div><b>#${c.id} - ${c.nome}</b><br><span class="small">${c.email} | Saldo: R$ ${Number(c.saldo).toFixed(2)}</span></div><div class="actions"><button onclick="editar(${c.id})">Editar saldo</button><button class="danger" onclick="apagar(${c.id})">Excluir</button></div></div>`).join(''):'<p class="muted">Nenhum cliente cadastrado ainda.</p>';
}
async function criar(){
  if(!nome.value || !email.value){ alert('Preencha nome e e-mail.'); return; }
  await fetch('/clientes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nome:nome.value,email:email.value,saldo:Number(saldo.value||0)})});
  nome.value=email.value=saldo.value=''; listar();
}
async function editar(id){
  const novo=prompt('Novo saldo:');
  if(novo!==null){ await fetch('/clientes/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({saldo:Number(novo)})}); listar(); }
}
async function apagar(id){
  if(confirm('Deseja excluir este cliente?')){ await fetch('/clientes/'+id,{method:'DELETE'}); listar(); }
}
listar();
</script>
</body></html>`);
});

app.get('/health', (req, res) => res.json({ status: 'ok', app: 'DimDimApp', rm: '563901' }));

app.get('/clientes', async (req, res) => {
  const result = await pool.query('SELECT * FROM clientes ORDER BY id');
  res.json(result.rows);
});

app.post('/clientes', async (req, res) => {
  const { nome, email, saldo } = req.body;
  if (!nome || !email) return res.status(400).json({ erro: 'Nome e e-mail são obrigatórios.' });
  const result = await pool.query(
    'INSERT INTO clientes (nome, email, saldo) VALUES ($1, $2, $3) RETURNING *',
    [nome, email, saldo || 0]
  );
  res.status(201).json(result.rows[0]);
});

app.put('/clientes/:id', async (req, res) => {
  const { nome, email, saldo } = req.body;
  const atual = await pool.query('SELECT * FROM clientes WHERE id=$1', [req.params.id]);
  if (atual.rowCount === 0) return res.status(404).json({ erro: 'Cliente não encontrado.' });
  const cliente = atual.rows[0];
  const result = await pool.query(
    'UPDATE clientes SET nome=$1, email=$2, saldo=$3 WHERE id=$4 RETURNING *',
    [nome || cliente.nome, email || cliente.email, saldo ?? cliente.saldo, req.params.id]
  );
  res.json(result.rows[0]);
});

app.delete('/clientes/:id', async (req, res) => {
  const result = await pool.query('DELETE FROM clientes WHERE id=$1 RETURNING *', [req.params.id]);
  if (result.rowCount === 0) return res.status(404).json({ erro: 'Cliente não encontrado.' });
  res.json({ mensagem: 'Cliente excluído com sucesso.', cliente: result.rows[0] });
});

const port = process.env.PORT || 3000;
initDatabase()
  .then(() => app.listen(port, () => console.log(`DimDimApp RM563901 rodando na porta ${port}`)))
  .catch((err) => { console.error('Erro ao iniciar aplicação:', err); process.exit(1); });
