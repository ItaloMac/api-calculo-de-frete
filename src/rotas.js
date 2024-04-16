
const express = require('express')

const rotas = express()

const produto = require('./controladores/produto')

rotas.get('/produtos', produto.listagemProdutos)
rotas.get('/produtos/:id', produto.detalhesProduto)
rotas.get('/produtos/:idProduto/:cep', produto.calculoFrete);

module.exports = rotas;