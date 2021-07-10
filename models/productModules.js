const products = require('../data/data.json');
const fs = require('fs')
const uuid = require('uuid')

async function getProducts() {
    return new Promise(function (resolve, reject) {
        resolve(products)
    })
}

async function getId(id) {
    return new Promise(function (resolve, reject) {
        const product = products.find((product) => product.id === id);
        resolve(product)
    })
}

async function postModulProduct(productObj) {
    return new Promise(function (resolve, reject) {
        const product = {
            id: uuid.v4(),
            ...productObj
        }
        products.push(product);
        fs.writeFile('./data/data.json', JSON.stringify(products), { encoding: 'utf8' }, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(product)
            }
        })
    })
}

async function deletModulProduct(id) {
    return new Promise(function (resolve, reject) {
        const newProducts = products.filter((product) => product.id !== id);
        fs.writeFile('./data/data.json', JSON.stringify(newProducts, 0, 2), { encoding: 'utf8' }, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(newProducts)
            }
        })
    })
}

async function putModulProduct(id, obj) {
    return new Promise(function (resolve, reject) {
        const index = products.findIndex((product) => product.id === id);
        const product = products.find((product) => product.id === id);

        const { name, description, price } = JSON.parse(obj);
        let productObj = {
            name: name || product.name,
            description: description || product.description,
            price: price || product.price
        }

        products[index] = {
            id,
            ...productObj
        }

        fs.writeFile('./data/data.json', JSON.stringify(products), { encoding: 'utf8' }, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(products[index])
            }
        })
    })
}

module.exports = {
    getProducts,
    postModulProduct,
    getId,
    deletModulProduct,
    putModulProduct
}