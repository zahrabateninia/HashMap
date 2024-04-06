#!/usr/bin/env node
class HashMap{
    //  We have a bucket array with an initial size of 16. Each index in this array represents a bucket.
    // When storing a key-value pair, we determine the index (or bucket) using the hash function.
    // Within that bucket, we store multiple key-value pairs directly, typically using objects or tuples.
    // We don't create a separate dictionary for each pair; instead, we store them directly in the bucket array.
        constructor(initializeSize = 16){
        // Hold the key-value pairs in a bucket
        this.bucket = new Array(initializeSize).fill(null).map(() => []);  
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
    // Note: collision is when TWO DIFFERENT keys sit inside the same bucket, because they generate the same hash code 
    resize(){
        let newSize = this.size*2;
        let newBucket = new Array(newSize).fill(null).map(()=>[]);
        // Rehash all the key-value pairs into the newBucket
        for(const innerBucket of this.bucket){
            for(const {key, value} of innerBucket){
                const newIndex = this.hash(key, newSize)
                newBucket[newIndex].push({key, value});
            }
        }
        this.bucket = newBucket;
        this.size = newSize;

    }

    // get(key) takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
    get(checkKey){
        for(const innerBucket of this.bucket){
            for(const {key, value} of innerBucket){
                if(checkKey === key ){
                    return value;
                }
            }
        }
    }

    // has(key) takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    has(checkKey) {
        for (const innerBucket of this.bucket) {
            for (const { key } of innerBucket) {
                if (checkKey === key) {
                    return true; 
                }
            }
        }
        return false; // Key not found in any bucket, return false
    }

    // remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. 
    // If the key isn’t in the hash map, it should return false.

    remove(key){
        if(!this.has(key)){
            return false
        }else{
            let hashedCode = this.hash(key);
            const innerBucket = this.bucket[hashedCode]
            let indexOfKey = innerBucket.findIndex((element) => element.key === key)
            // remove the entry
            innerBucket.splice(indexOfKey, 1);
            this.countOfPairs--;
            return true
        }
  
    }
    // length() returns the number of stored keys in the hash map.
    length(){

    }

    // clear() removes all entries in the hash map.

    // keys() returns an array containing all the keys inside the hash map.

    // values() returns an array containing all the values.

    // entries() returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
        
}



// function HashMap() {
//     let hashMapSize = 16;
  
//     let hashMap = Array(hashMapSize)
//       .fill(null)
//       .map(() => []);
//     const getHashMap = () => hashMap;
//     const hash = (str) => {
//       let hashCode = 0;
//       const primeNumber = 31;
//       for (let i = 0; i < str.length; i += 1) {
//         // modulu on the end result is the same as taking modulu each step
//         hashCode = (primeNumber * hashCode + str.charCodeAt(i)) % hashMapSize;
//       }
//       return hashCode;
//     };
  
//     const calculateLoadFactor = () => {
//       const occupied = hashMap.reduce(
//         (accumulated, current) =>
//           current.length !== 0 ? accumulated + 1 : accumulated,
//         0
//       );
  
//       return occupied / hashMap.length;
//     };
  
//     const set = (key, value) => {
//       const hashedKey = hash(key);
//       const checkLoad = hashMap[hashedKey].length === 0;
  
//       const collision = hashMap[hashedKey].findIndex(
//         (element) => element.key === key
//       );
  
//       if (collision === -1) hashMap[hashedKey].push({ key, value });
//       else {
//         hashMap[hashedKey][collision].value = value;
//       }
//       if (checkLoad) loadFactorHandler();
//     };
  
//     const get = (key) => {
//       const hashedKey = hash(key);
//       return hashMap[hashedKey].find((element) => element.key === key).value;
//     };
  
//     const has = (key) => {
//       const hashedKey = hash(key);
//       return (
//         hashMap[hashedKey].findIndex((element) => element.key === key) !== -1
//       );
//     };
  
//     const remove = (key) => {
//       if (!has(key)) {
//         return;
//       }
  
//       const hashedKey = hash(key);
//       const index = hashMap[hashedKey].findIndex(
//         (element) => element.key === key
//       );
//       hashMap[hashedKey].splice(index, 1);
//     };
  
//     const length = () =>
//       hashMap.reduce((accumulated, current) => accumulated + current.length, 0);
  
//     const clear = () => {
//       hashMap.forEach((element) => element.splice(0));
//     };
  
//     const keys = () =>
//       hashMap.reduce(
//         (accumulated, current) =>
//           accumulated.concat(
//             current.reduce(
//               (accumulatedKeys, currentCell) =>
//                 accumulatedKeys.concat(currentCell.key),
//               []
//             )
//           ),
//         []
//       );
  
//     // withDuplicates = false, will remove duplicate values
//     const values = (withDuplicates = true) => {
//       const returnValues = hashMap.reduce(
//         (accumulated, current) =>
//           accumulated.concat(
//             current.reduce(
//               (accumulatedValue, currentCell) =>
//                 accumulatedValue.concat(currentCell.value),
//               []
//             )
//           ),
//         []
//       );
//       if (withDuplicates) return values;
//       return returnValues.reduce(
//         (accumulated, current) =>
//           accumulated.findIndex((element) => element === current) === -1
//             ? accumulated.concat(current)
//             : accumulated,
//         []
//       );
//     };
//     const entries = () =>
//       hashMap.reduce(
//         (accumulated, current) =>
//           accumulated.concat(
//             current.reduce(
//               (accumulatedEntries, currentCell) =>
//                 accumulatedEntries.concat(currentCell),
//               []
//             )
//           ),
//         []
//       );
  
//     function loadFactorHandler() {
//       if (calculateLoadFactor() < 0.8) {
//         return;
//       }
  
//       const oldEntries = entries();
  
//       hashMapSize *= 2;
//       const newHashMap = Array(hashMapSize)
//         .fill(null)
//         .map(() => []);
  
//       hashMap = newHashMap;
//       oldEntries.forEach((elemenet) => set(elemenet.key, elemenet.value));
//     }
  
//     return {
//       set,
//       get,
//       has,
//       remove,
//       length,
//       clear,
//       keys,
//       values,
//       entries,
//       getHashMap,
//     };
//   }