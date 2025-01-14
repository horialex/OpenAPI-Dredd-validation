# API Validation with Dredd

This project uses Dredd for API contract validation based on the Swagger 2.0 specification, which is generated from an OpenAPI 3.0 specification using the `@api-spec-converter` library.
I am using **Express** as a backeend server for this example

I have careated a dummy API with 2 GET endpoints that read the data from a json file 
   1. GET /products
   2. GET /products/{id}
   3. POST /products
   4. PUT /products
   5. DELETE /products

The goal is to validate the response of these endpoints that are according to the OpenAPI spec file using Dredd.

## Overview

- **Dredd** is used for validating API responses against the Swagger 2.0 specification.
- The OpenAPI 3.0 specification is converted to Swagger 2.0 for compatibility with Dredd using the `@api-spec-converter` library.
- The API server is validated using a `swagger2.json` file that is automatically generated after converting the OpenAPI 3.0 file.

## Prerequisites

Ensure the following dependencies are installed:

- **Node.js** (LTS version recommended)
- **npm** 

### Install Dependencies

Install the required packages using npm:

npm install

### Run the project

In the root of the project run the following command:

dredd


# Products API

This API allows you to manage a list of products. You can retrieve, create, and manage product data.

## Endpoints

### 1. GET `/products`
Retrieves a list of all products.


```
curl -X GET http://localhost:3000/products

```
### 2. GET `/products/:id`
Retrieves a specific product by its ID.

### 3. POST `/products`
Creates a new product.

#### Request
- **URL**: `/products`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
    ```json
    {
        "name": "New Product",
        "description": "Description of the new product",
        "price": 19.99,
        "inStock": true,
        "categories": ["Category1", "Category2"],
        "ratings": 4.2
    }
    ```

#### Response
- **Success (201)**:
    ```json
    {
        "message": "Product created successfully",
        "product": {
            "id": 6,
            "name": "New Product",
            "description": "Description of the new product",
            "price": 19.99,
            "inStock": true,
            "categories": ["Category1", "Category2"],
            "ratings": 4.2
        }
    }
    ```
- **Error (400)**:
    ```json
    {
        "message": "Invalid product data"
    }
    ```
Here the id will be added based by incrementing the last existing id in the json file that contains the data 

#### Example with `curl`
Use the following `curl` command to create a new product:

```bash
curl -X POST http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{
    "name": "New Product",
    "description": "Description of the new product",
    "price": 19.99,
    "inStock": true,
    "categories": ["Category1", "Category2"],
    "ratings": 4.2
}'
```

### 4. PUT `/product`
Updates a product based on id
```bash
curl -X PUT http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{
  "id": 10,
  "name": "Hori Product"
}'

```

### 5. DELETE `/products`
Removes a product based on id

```bash
curl -X DELETE http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{
  "id": 10
}'
```


# Commands to Test the setup:

1. **npm install -y**  to install all the dependencies
2. **npm run convert:openapi**  to convert the OpenaAPI 3.0 document to Swagger 2.0
3. **npm run start:server**  to start the CRUD Products server - not needed if you run the dredd command since that will 
                              also start the server
4. **dredd**  to run the dredd API contract tests                          