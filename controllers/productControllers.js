const { getProducts, postModulProduct, getId, deletModulProduct, putModulProduct } = require('../models/productModules');
const { getData } = require('../utils/utils');

async function getAllProducts(req, res) {
    try {
        const product = await getProducts()
        if (!product) {
            res.writeHead(404, { 'Content-type': 'text/json' })
            res.end(JSON.stringify({ message: "Product not found" }))
        }
        else {
            res.writeHead(200, { 'Content-type': 'text/json' })
            res.write(JSON.stringify(product))
        }
        res.end()
    } catch (err) {
        res.writeHead(500, { "Content-type": "text/json" })
        res.write(JSON.stringify({ message: err.message }))
        res.end()
    }
}

async function getProductById(req, res, id) {
    try {
        const product = await getId(id);
        if (!product) {
            res.writeHead(404, { 'Content-type': 'text/json' })
            res.end(JSON.stringify({ message: "Product not found" }))
        }
        else {
            res.writeHead(200, { 'Content-type': 'text/json' })
            res.write(JSON.stringify(product))
        }
        res.end()
    } catch (err) {
        res.writeHead(500, { "Content-type": "text/json" })
        res.write(JSON.stringify({ message: err.message }))
        res.end()
    }
}

async function postProduct(req, res) {
    try {
        const product = await getData(req, res)
        const productObj = JSON.parse(product);
        const saveProduct = await postModulProduct(productObj);
        res.writeHead(200, { 'Content-type': 'text/json' })
        res.write(JSON.stringify({
            message: "Product has been saved",
            product: saveProduct
        }))
        res.end()

    } catch (err) {
        res.writeHead(400, { 'Content-type': 'text/json' })
        res.write(JSON.stringify({ message: err.message }))
        res.end()
    }
}

async function deleteProduct(req, res, id) {
    try {
        const product = await getId(id)
        if (!product) {
            res.writeHead(404, { 'Content-type': 'text/json' })
            res.end(JSON.stringify({ message: "Product not found" }))
        }
        else {
            await deletModulProduct(id)
            console.log('aaa');
            res.writeHead(200, { 'Content-type': 'text/json' })
            res.write(JSON.stringify({ message: "Product has been deleted" }))
            res.end()
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function putProduct(req, res, id) {
    try {
        const product = await getId(id);
        if (!product) {
            res.writeHead(404, { 'Content-type': 'text/json' })
            res.end(JSON.stringify({ message: "Product not found" }))
        }
        else {
            const productPUT = await getData(req, res)
            const obj = await putModulProduct(id, productPUT)
            res.writeHead(200, { 'Content-type': 'text/json' })
            res.write(JSON.stringify({
                message: "Product has been updated",
                pro: obj
            }))
            res.end()
        }
    } catch (err) {
        res.writeHead(500, { 'Content-type': 'text/json' })
        res.write(JSON.stringify({ message: err.message }))
        res.end()
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
    deleteProduct,
    putProduct
}
