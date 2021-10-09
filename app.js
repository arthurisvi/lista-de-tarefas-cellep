const app = require('./config/server');
const db = require('./config/connectionBD')
const PORT = process.env.PORT || 3000;
const { jwt, jwtConfig } = require('./config/jwt');

app.post('/cadastro/salvar-cadastro', async(req, res) => {
    const { email, password } = req.body;
    const values = [email, password];

    const response = await db.query('SELECT * FROM usuario WHERE email = $1', [email])

    if (response.rows.length === 0) {
        await db.query('INSERT INTO usuario(email, senha) VALUES ($1, $2)', values);
        res.status(201).send({ status: 'Usuário cadastrado com sucesso!' })
    } else {
        res.status(401).send({ status: 'Já existe um usuário com esse Email!' });
    }
});

app.post('/login', async(req, res) => {

    const user_email = req.body.email
    const user_password = req.body.password
    const values = [user_email];
    const response = await db.query('SELECT * FROM usuario WHERE email = $1', values);

    if (response.rows.length > 0) {
        const { id_usuario, email, senha } = response.rows[0];

        if (user_email === email && user_password === senha) {
            const token = jwt.sign({ id_usuario: id_usuario }, jwtConfig.secret, { expiresIn: 600 });

            return res.json({ auth: true, token });

        } else { res.status(401).send({ status: 'A senha não corresponde ao usuário.' }); }

    } else { res.status(401).send({ status: 'Email não encontrado.' }); }
});

app.post('/minhastarefas/salvar-tarefa', async(req, res) => {
    const { nome, descricao } = req.body
    const values = [nome, descricao]

    await db.query('INSERT INTO tarefas (nome, descricao) VALUES ($1, $2)', values, (err, result) => {
        res.redirect('/minhastarefas')
    })

})

app.get('/minhastarefas/excluir', async(req, res) => {
    var id = req.query.id

    await db.query('DELETE FROM tarefas WHERE id_tarefa = $1', [id], (err, result) => {
        res.redirect('/minhastarefas')
    })
})

app.get('/cadastro', async(req, res) => { res.render('cadastro/cadastro'); });

app.get('/minhastarefas', async(req, res) => {
    const response = await db.query('SELECT * FROM tarefas')

    res.render('lista/tarefas', { tarefas: response.rows });
});

app.get('/', async(req, res) => { res.render('login/login'); });

app.listen(PORT, () => console.log(`Funcionando na porta ${PORT}`));