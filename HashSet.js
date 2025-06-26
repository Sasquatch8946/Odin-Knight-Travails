import LinkedList from './LinkedList.js';

const HashSet = (function () {

    let loadFactor = 0.75;
    let capacity = 600;
    let hMap = new Array(capacity);

    const has = function (key) {
        const indx = hash(key);
        let found = false;

        if (hMap[indx] != null) {
            let cur = hMap[indx];
            while (cur !== null && found === false) {
                if (cur.find(key) != null) {
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
                    keys.push(cur.value);
                    cur = cur.nextNode;
                }

            }
        }

        return keys;
    }

    const length = function () {
        return keys().length
    }

    const hash = function (coords) {
        const [x, y] = coords;
        const hash = (( (x + y) * (x + y + 1) / 2) + y) % capacity;
        return hash;
    }

    const copyMap = function (newArray) {
        const allEntries = entries(); 
        hMap = newArray;
        allEntries.forEach((entry) => {
            const indx = hash(entry);
            if (hMap[indx] == null) {
                hMap[indx] = new LinkedList(entry);
            } else {
                hMap[indx].append(entry);
            }
        });
    }

    const isAtCapacity = function () {
        if (length() >= capacity * loadFactor) {
            return true;
        } else {
            return false;
        }
    }

    const resize = function () {
        const len = length();

        if (len + 1 > (capacity * loadFactor)) {
            console.log("RESIZING HASH SET");
            capacity = capacity * 2;
            const newArray = new Array(capacity);
            copyMap(newArray);
            console.log("resizing complete");

        }

    }

    const setKey = function (key) {
        let indx = hash(key);

        if (hMap[indx] == null) {
            hMap[indx] = LinkedList(key);
        } else if (hMap[indx].headNode.value === key) {
            console.log("key already exists.");
        } else if (hMap[indx].headNode.nextNode !== null && hMap[indx].find(key)) {
            console.log("subkey already exists.");
        } else {
            console.log(`Key ${key} not found, appending`);
            hMap[indx].append(key);
        }


    }

    const add = function (key) {

        const indx = hash(key);

        if (hMap[indx] == null) {
            if (isAtCapacity()) {
                resize();
            }
        } else {
            const subIndx = hMap[indx].find(key);
            if (subIndx === null) {
                if (isAtCapacity()) {
                    resize();
                }
            }
        }

        setKey(key);

        return indx;

    }

    const remove = function (key) {
        const indx = hash(key);
        if (indx < 0 || indx >= hMap.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (has(key)) {
            const subIndx = hMap[indx].find(key);
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

    const get = function (key) {
        const indx = hash(key);
        return hMap[indx].headNode;
    }

    return {
        hash,
        add,
        has,
        remove,
        length,
        keys,
        entries,
        clear,
        copyMap,
        getCapacity,
        get,
        hMap,
    }
});

export default HashSet;