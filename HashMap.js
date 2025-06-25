import LinkedList from './LinkedList.js';

const HashMap = (function () {

    let loadFactor = 0.75;
    let capacity = 86;
    let hMap = new Array(capacity);

    const has = function (key) {
        const indx = hash(key);
        let found = false;

        if (hMap[indx] != null) {
            let cur = hMap[indx];
            while (cur !== null && found === false) {
                if (cur.findInArray(key, 0) != null) {
                    found = true;
                } else {
                    cur = cur.nextNode;
                }
            }
        }  

        return found;

    }

    const keys = function () {
        const keys = [];
        for (let i = 0; i < hMap.length; i++) {
            if (hMap[i] != null) {
                let cur = hMap[i].headNode;
                while (cur !== null) {
                    keys.push(cur.value[0]);
                    cur = cur.nextNode;
                }

            }
        }

        return keys;
    }

    const length = function () {
        return keys().length
    }


    const hashOld = function (key) {
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity ;
        }

        return hashCode;
    } 

    const hash = function (x, y) {
        const hash = ( (x + y) * (x + y + 1) / 2) + y
        return hash;
    }

    const isAtCapacity = function () {
        if (length() >= capacity * loadFactor) {
            return true;
        } else {
            return false;
        }
    }


    const copyMap = function (newArray) {
        const allEntries = entries(); 
        hMap = newArray;
        allEntries.forEach(([key, value]) => {
            const indx = hash(key);
            if (hMap[indx] == null) {
                hMap[indx] = new LinkedList([key, value]);
            } else {
                hMap[indx].append([key, value]);
            }
        });
    }

    const resize = function () {
        console.log("RESIZING HASH MAP");
        capacity = capacity * 2;
        const newArray = new Array(capacity);
        copyMap(newArray);
        console.log("resizing complete");
    }

    const setKey = function (key, value) {
        let indx = hash(key, value);

        if (hMap[indx] == null) {
            hMap[indx] = LinkedList([key, value]);
        } else {
            const subIndx = hMap[indx].findInArray(key, 0);
            if (subIndx === 0) {
                console.log(`updating head of linkedlist for key ${key}`);
                hMap[indx].setHead([key, value]);
            } else if (subIndx > 0) {
                console.log(`Updating existing key ${key}`);
                hMap[indx].removeAt(subIndx);
                hMap[indx].insertAt(subIndx, [key, value]);
            } else {
                console.log(`Key ${key} not found, appending`);
                hMap[indx].append([key, value]);
            }
        } 

    }

    const set = function (key, value) {

        const indx = hash(key, value);

        if (hMap[indx] == null) {
            if (isAtCapacity()) {
                resize();
            }
        } else {
            const subIndx = hMap[indx].findInArray(key, 0);
            if (subIndx === null) {
                if (isAtCapacity()) {
                    resize();
                }
            }
        }

        setKey(key, value);

    }


    const get = function (key, value) {
        const indx = hash(key, value);
        if (indx < 0 || indx >= hMap.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let returnValue = null;

        if (hMap[indx] != null) {
            let cur = hMap[indx].headNode;
            while (cur !== null && returnValue === null) {
                if (cur.value[0] === key) {
                    returnValue = cur.value[1];
                } else {
                    cur = cur.nextNode;
                }
            }
        }  

        return returnValue;
    }




    const remove = function (key, value) {
        const indx = hash(key, value);
        if (indx < 0 || indx >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (has(key)) {
            const subIndx = hMap[indx].findInArray(key, 0);
            if (subIndx != null) {
                hMap[indx].removeAt(subIndx);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }


    const clear = function () {
        hMap = new Array(capacity);
        return [];
    }


    const values = function () {
        const values = [];
        for (let i = 0; i < hMap.length; i++) {
            if (hMap[i] != null) {
                let cur = hMap[i].headNode;
                while (cur !== null) {
                    values.push(cur.value[1]);
                    cur = cur.nextNode;
                }

            }
        }

        return values;
    }


    const entries = function () {
        const entries = [];
        for (let i = 0; i < hMap.length; i++) {
            if (hMap[i] != null) {
                let cur = hMap[i].headNode;
                while (cur !== null) {
                    entries.push(cur.value);
                    cur = cur.nextNode;
                }
            }
        }

        return entries;
    }

    const getCapacity = function () {
        return capacity;
    }

    return {
        hash,
        set,
        get,
        has,
        remove,
        length,
        keys,
        values,
        entries,
        clear,
        copyMap,
        getCapacity,
    }
});

export default HashMap;