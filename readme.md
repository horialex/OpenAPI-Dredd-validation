# API Validation with Dredd

This project uses Dredd for API contract validation based on the Swagger 2.0 specification, which is generated from an OpenAPI 3.0 specification using the `@api-spec-converter` library.

I have careated a dummy API with 2 GET endpoints that read the data from a json file 
   1. GET products
   2. GET product/{id}

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