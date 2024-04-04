#!/usr/bin/env node
class HashMap{
    constructor(){
        // Hold the key-value pairs in a bucket
        this.bucket = [];
        // Set the initial size of hash table
        this.size = 16;
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
    // set method: it stores a key-value pair in the hashmap 
    set(key, value){
         const index = this.hash(key)
        // check if the key at the index already exists
        if(!this.bucket[index]){
            this.bucket[index] = []; // if not, create a new bucket 
        }
    }
     
}