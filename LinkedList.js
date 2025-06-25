const LinkedList = (function (headData=null) {


    class Node {
        constructor(value=null, nextNode=null) {
            this.value = value;
            this.nextNode = nextNode;
        }
    }


    let headNode = new Node(headData, null);

    const append = function (value) {
        if (headNode.headData === null) {
            headNode = new Node(value, null);
            return headNode;
        } else {
            let cur = headNode;
            while (cur.nextNode !== null) {
                cur = cur.nextNode;
            }

            cur.nextNode = new Node(value, null);

            return cur.nextNode;
        }
    }

    const prepend = function (value) {
        if (headNode === null) {
            this.headNode = new Node(value, null);
        } else {
            const cur = new Node(value, headNode);
            this.headNode = cur;
        }
    }

    const size = function () {
        if (headNode === null) {
            return 0;
        } else {
            let count = 0;
            let cur = headNode;
            while (cur !== null) {
                count = count + 1;
                cur = cur.nextNode;
            }

            return count;
        }
    }

    const head = function () {
        return headNode;
    }

    const setHead = function (value) {
        head().value = value;
    }

    const tail = function () {
        let cur = head();
        while (cur.nextNode !== null) {
            cur = cur.nextNode;
        }

        return cur;
    }

    const at = function (indx) {
        let count = 0;
        let cur = head();

        while (count < indx) {
            cur = cur.nextNode;
        }

        return cur;
    }

    const pop = function () {
        let cur = head();
        let prev;

        while (cur.nextNode !== null) {
            prev = cur;
            cur = cur.nextNode;
        }

        prev.nextNode = null;

        return cur;
    }

    const contains = function (value) {
        let cur = head();
        let found = false;

        while (cur.nextNode !== null && found == false) {
            if (cur.value[0] === value) {
                found = true;
            }
            cur = cur.nextNode;

        }

        return found;
    }

    const find = function (value) {
        let cur = head();
        let indx = null;
        let count = 0;

        while (cur !== null && indx === null) {
            if (cur.value === value) {
                indx = count;
            } else {
                count = count + 1;
                cur = cur.nextNode;
            }
        }

        return indx;
    }

    const findInArray = function (value, index) {
        let cur = head();
        let indx = null;
        let count = 0;

        while (cur !== null && indx === null) {
            if (cur.value[index] === value) {
                indx = count;
            } else {
                count = count + 1;
                cur = cur.nextNode;
            }
        }

        return indx;
    }


    const toString = function () {
        let cur = head();
        let myStr = "";

        while (cur !== null) {
            myStr = myStr + `(${cur.value}) -> `;
            cur = cur.nextNode;
            if (cur === null) {
                myStr = myStr + " (null)";
            }
        }


        return myStr;
    }

    const insertAt = function (indx, value) {
        let count = 0;
        let cur = head();
        let prev;

        if (indx === 0) {
            prepend(value);
            return;
        } else {
            while (count < indx) {
                prev = cur;
                cur = cur.nextNode
                count = count + 1;
            }

            prev.nextNode = new Node(value, cur);

        }


    }

    const removeAt = function (indx) {

        let cur = head();
        let prev;

        if (indx === 0) {
            this.headNode = headNode.nextNode;
            cur = null;
            return this.headNode;
        } else {
            let count = 0;
            while (count < indx) {
                prev = cur;
                cur = cur.nextNode
                count = count + 1;
            }

            prev.nextNode = cur.nextNode;

        }


    }



    return {
        headNode,
        append,
        prepend,
        size,
        head,
        tail,
        at,
        pop,
        contains,
        find,
        toString,
        insertAt,
        removeAt,
        setHead,
        findInArray,
    }

});

export default LinkedList;