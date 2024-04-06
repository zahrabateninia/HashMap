# HashMap Implementation in JavaScript

This is a simple implementation of a HashMap data structure in JavaScript. A HashMap, also known as a hash table, is a data structure that stores key-value pairs and provides constant-time average complexity for basic operations such as inserting, retrieving, and deleting elements.

## Features

- Insertion of key-value pairs
- Retrieval of values by key
- Removal of key-value pairs
- Checking the presence of a key in the map
- Getting the number of stored keys
- Clearing the HashMap
- Getting arrays of keys, values, and key-value pairs

## Usage

To use this HashMap implementation, follow these steps:

1. Import the `HashMap` class into your JavaScript project.
2. Create a new instance of the `HashMap` class.
3. Use the provided methods to perform various operations on the HashMap.

Here's a basic example of how to use the HashMap:

```javascript
const HashMap = require('./HashMap');

// Create a new instance of the HashMap
let myMap = new HashMap();

// Insert key-value pairs
myMap.set("Zahra", "Btn");
myMap.set("Maryam", "Rhm");
myMap.set("Sina", "Rzi");

// Retrieve a value by key
console.log(myMap.get("Zahra")); // Output: "Btn"

// Check if a key exists
console.log(myMap.has("Sin")); // Output: false

// Remove a key-value pair
console.log(myMap.remove("Maryam")); // Output: true

// Get the number of stored keys
console.log(myMap.length()); // Output: 2

// Clear the HashMap
console.log(myMap.clear());

// Get arrays of keys, values, and key-value pairs
console.log(myMap.keys());
console.log(myMap.values());
console.log(myMap.entries());
