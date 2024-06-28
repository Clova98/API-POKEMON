const { Sequelize, DataTypes } = require('sequelize');

const PokemonModel = require('../models/pokemon');
const UserModel = require('../models/user');
const pokemons = require('./mock-pokemon');
const path = require('path');

let sequelize;

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: true
  });
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: true
  });
}

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true, alter: true }).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      })
      .then(pokemon => console.log(pokemon.toJSON()))
    });
    
    console.log('La base de donnée a bien été initialisée !');
  });
};

module.exports = { 
  initDb, Pokemon, User
};
