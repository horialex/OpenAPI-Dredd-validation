const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Helper function to read the JSON file
const readProductsFromFile = () => {
    const filePath = path.join(__dirname, './data/products.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

// GET endpoint to retrieve the list of products
app.get('/products', (req, res) => {
    try {
        const products = readProductsFromFile();
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error reading products data" });
    }
});

// GET endpoint to retrieve a product by ID
app.get('/products/:id', (req, res) => {
    try {
        const products = readProductsFromFile();
        const productId = parseInt(req.params.id, 10);
        const product = products.find(p => p.id === productId);
        res.setHeader('Content-Type', 'application/json');

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error reading products data" });
    }
});

app.use((req, res, next) => {
    console.log("!!!!!!!!")
    res.setHeader('Content-Type', 'application/json');
    next();
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
