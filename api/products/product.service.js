const { readData, writeData } = require('../../utils')

const getAllProducts = async (req, res) => {
    try {
        const data = await readData('data.json', true);
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
    }
}


const addProduct = async (req, res) => {
    try {
        const data = await readData('data.json', true)
        const { title, price, category } = req.body
        if (!title || !price) return res.status(400).json('name and price are required')
        const lastId = data[data.length - 1]?.id || 0
        const newproduct = {
            id: lastId + 1,
            title, price, category
        }
        data.push(newproduct)
        await writeData('data.json', data)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const data = await readData('data.json', true)
        console.log(id)
        const index = data.findIndex(el => Number(el.id) === Number(id))
        if (index === -1) return res.json({ success: false, message: "Can't delete this item" })
        const deletedProduct = data.splice(index, 1)
        console.log(deleteProduct)
        await writeData('data.json', data)
        console.log({ successes: true, message: { 'deleted product': deletedProduct } })
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}


const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { title, category, price } = req.body
        const data = await readData('data.json', true)
        const index = data.findIndex(el => Number(el.id) === Number(id))
        if (index === -1) return res.json({ success: false, message: "Can't delete this item" })
        data[index] = {
            ...data[index],
            title: title ? title : data[index].title,
            price: price ? price : data[index].price,
            category: category ? category : data[index].category
        }
        await writeData('data.json', data)
        res.status(200).json(data)
        console.log({ success: true, message: { 'updated product': data[index] } })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getAllProducts, addProduct, deleteProduct, updateProduct }