const { Router } = require('express')
const productsRouter = Router()
const { readData, writeData } = require('../../utils');
const { getAllProducts, addProduct, deleteProduct, updateProduct } = require('./product.service');


productsRouter.get('/', getAllProducts);
productsRouter.post('/', addProduct)
productsRouter.delete('/delete/:id', deleteProduct)
productsRouter.put('/update/:id', updateProduct)


module.exports = productsRouter