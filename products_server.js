const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const dataPath = './data/products.json'

// Middleware to parse JSON request bodies
app.use(express.json());

// Helper function to read the JSON file
const readProductsFromFile = () => {
    const filePath = path.join(__dirname, './data/products.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

// Helper function to write to the JSON file
const writeProductsToFile = (products) => {
    const filePath = path.join(__dirname, dataPath);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
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

app.post('/products', (req, res) => {
    try {
        const newProduct = req.body;

        // Read current products
        const products = readProductsFromFile();

        // Validate new product data
        if (!newProduct.name) {
            return res.status(400).json({ message: "The 'name' field is required." });
        }

        if (!newProduct.description) {
            return res.status(400).json({ message: "The 'description' field is required." });
        }

        if (!newProduct.price) {
            return res.status(400).json({ message: "The 'price' field is required." });
        }

        if (typeof newProduct.inStock !== 'boolean') {
            return res.status(400).json({ message: "The 'inStock' field must be a boolean." });
        }

        if (!newProduct.categories || !Array.isArray(newProduct.categories) || newProduct.categories.length === 0) {
            return res.status(400).json({ message: "The 'categories' field must be a non-empty array." });
        }

        if (!newProduct.ratings) {
            return res.status(400).json({ message: "The 'ratings' field is required." });
        }


        // Assign a new ID
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

        // Create a new object with id as the first property
        const orderedProduct = {
            id: newId,
            name: newProduct.name,
            description: newProduct.description,
            price: newProduct.price,
            inStock: newProduct.inStock,
            categories: newProduct.categories,
            ratings: newProduct.ratings
        };

        // Add new product to the list
        products.push(orderedProduct);

        // Save updated products to the file
        writeProductsToFile(products);

        res.status(201).json({ message: "Product created successfully", product: orderedProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error saving new product" });
    }
});


// Middleware for setting JSON response headers
app.use((req, res, next) => {
    console.log("Request received!");
    res.setHeader('Content-Type', 'application/json');
    next();
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
