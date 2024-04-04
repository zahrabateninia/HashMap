#!/usr/bin/env node
class HashMap{
    //  We have a bucket array with an initial size of 16. Each index in this array represents a bucket.
    // When storing a key-value pair, we determine the index (or bucket) using the hash function.
    // Within that bucket, we store multiple key-value pairs directly, typically using objects or tuples.
    // We don't create a separate dictionary for each pair; instead, we store them directly in the bucket array.
        constructor(initializeSize = 16){
        // Hold the key-value pairs in a bucket
        this.bucket = [];
        // Set the initial size of hash table
        this.size = initializeSize;
        this.countOfPairs = 0;
        this.loadFactor = 0.7;
    }    
    // hash function : it takes a key and produces a hash code
    hash(key, size = this.size) {
        let hashCode = 0;
        const primeNumber = 31;
        
        for (let i = 0; i < key.length; i++) {
            // Apply modulo operator on each iteration to prevent overflow
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
        }
        
        return hashCode;
}

    // set method: it stores a key-value pair in the hash map
    set(key, value) {
        const index = this.hash(key); 
        
        // Check if the bucket at the index already exists
        let currentBucket = this.bucket[index]; 
        
        if (!currentBucket) {
            // If not, create a new bucket
            currentBucket = [];
            this.bucket[index] = currentBucket;
        }

        // Iterate through the current bucket to check if the key already exists
        for (let i = 0; i < currentBucket.length; i++) {
            // If the key already exists, update its value
            if (currentBucket[i].key === key) {
                currentBucket[i].value = value; // the old value will be overwritten  
                return; 
            }
        }

        // If the key doesn't exist, push a new key-value pair to the bucket
        currentBucket.push({ key, value });
        this.countOfPairs++;

        // check load factor and resize(rehash) the hash table if necessary
        if(this.countOfPairs / this.size > this.loadFactor){
            this.resize();
        }
    }

    resize(){

    }

    // Note: collision is when TWO DIFFERENT keys sit inside the same bucket, because they generate the same hash code 
    // (e.g. Carlos and Carla are both hashed to 3, so 3 becomes a location for Carlos AND Carla. 
}