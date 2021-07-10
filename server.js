const http = require('http');

const { getAllProducts, getProductById, postProduct, deleteProduct, putProduct } = require('./controllers/productControllers')

const server = http.createServer(function (req, res) {
    if (req.url === '/products' && req.method === 'GET') {
        getAllProducts(req, res)
    } else if (req.url.match(/\/products\/\w+/) && req.method === "GET") {//regex
        const id = req.url.split('/')[2]
        getProductById(req, res, id);
    } else if (req.url === "/products" && req.method === 'POST') {
        postProduct(req, res)

    } else if (req.url.match(/\/products\/\w+/) && req.method === "DELETE") {//regex
        const id = req.url.split('/')[2]
        deleteProduct(req, res, id);
    } else if (req.url.match(/\/products\/\w+/) && req.method === "PUT") {//regex
        const id = req.url.split('/')[2]
        putProduct(req, res, id);
    } else {
        console.log('invalid url');
    }

})

server.listen(3000, () => console.log('Server is running'));