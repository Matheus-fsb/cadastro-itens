use dbcadastrocoisas;

create table atores(
 idAtor int primary key auto_increment,
 nomAtor varchar(20),
 sobAtor varchar(20),
 dataCadastro timestamp default current_timestamp
)

create table cidade(
 idCidade int primary key auto_increment,
 nomCidade varchar(20),
 nomEstado varchar(20),
 nomPais varchar(20),
 dataCadastro timestamp default current_timestamp
)

create table animal(
 idAnimal int primary key auto_increment,
 nomAnimal varchar(20),
 nomCien varchar(20),
 dataCadastro timestamp default current_timestamp
)