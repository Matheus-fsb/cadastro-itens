const express = require('express')
const app = express();
const mysql = require('mysql2');
const path = require('path');

// Adicionando o middleware para processar o corpo da requisição como JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos do diretório 'public'
app.use(express.static('public'));

// Rota para a página de cadastro
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'));
});

app.get('/atores', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'cad_atores.html'));
});

app.get('/cidade', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'cad_cidade.html'));
});

app.get('/animal', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'cad_animais.html'));
});

// cria a conexao com o banco de dados
const connection = mysql.createPool({
    host: 'localhost', // coloque aqui o ip ou nome da máquina
    user: 'root', // mude aqui o usuário
    password: 'root', // mude aqui a senha
    database: 'dbcadastrocoisas' // mude aqui o nome do bd
});

//GET

//ATORES

app.get('/ator', function (req, res) {
    connection.query('SELECT * FROM atores',
        function (err, results) {
            res.send(results)
        }
    );
})

app.get('/ator/:id', function (req, res) {
    connection.query('SELECT * FROM atores where id= ?', [req.params.id],
        function (err, results) {
            res.send(results)
        }
    );
})

//CIDADE

app.get('/cidade', function (req, res) {
    connection.query('SELECT * FROM cidade',
        function (err, results) {
            res.send(results)
        }
    );
})

app.get('/cidade/:id', function (req, res) {
    connection.query('SELECT * FROM cidade where id= ?', [req.params.id],
        function (err, results) {
            res.send(results)
        }
    );
})

//ANIMAL

app.get('/animal', function (req, res) {
    connection.query('SELECT * FROM animal',
        function (err, results) {
            res.send(results)
        }
    );
})

app.get('/animal/:id', function (req, res) {
    connection.query('SELECT * FROM animal where id= ?', [req.params.id],
        function (err, results) {
            res.send(results)
        }
    );
})

//POST

//ATOR

app.post('/cadastroAtor', function (req, res) {
    const { nomAtor, sobAtor } = req.body;
    console.log(nomAtor);
    connection.query('INSERT INTO atores (nomAtor, sobAtor) VALUES (?, ?)', [nomAtor, sobAtor], function (err, results) {
        if (err) {
            res.status(500).send('Erro ao inserir ator.');
        }
        else {
            res.sendFile(path.join(__dirname, '..', 'public', 'html', 'cad_atores.html'));
        }
    });
}
);

//CIDADE

app.post('/cadastroCidade', function (req, res) {
    const { nomCidade, nomEstado, nomPais } = req.body;
    console.log(nomCidade);
    connection.query('INSERT INTO cidade (nomCidade, nomEstado, nomPais) VALUES (?, ?, ?)', [nomCidade, nomEstado, nomPais], function (err, results) {
        if (err) {
            res.status(500).send('Erro ao inserir cidade.');
        }
        else {
            res.sendFile(path.join(__dirname, '..', 'public', 'html', 'cad_cidade.html'));
        }
    });
}
);

//ANIMAL

app.post('/cadastroAnimal', function (req, res) {
    const { nomAnimal, nomCien } = req.body;
    console.log(nomAnimal);
    connection.query('INSERT INTO animal (nomAnimal, nomCien) VALUES (?, ?)', [nomAnimal, nomCien], function (err, results) {
        if (err) {
            res.status(500).send('Erro ao inserir animal.');
        }
        else {
            res.sendFile(path.join(__dirname, '..', 'public', 'html', 'cad_animais.html'));
        }
    });
}
);


app.listen(3000) //execucao do servidor http