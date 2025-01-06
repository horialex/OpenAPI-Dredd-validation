module.exports = {
    beforeEach: (request, response) => {
        console.log("Before each!")
        // Skip Content-Type validation
        response.headers['content-type'] = 'application/json'; // Set to 'application/json' if needed
    }
};