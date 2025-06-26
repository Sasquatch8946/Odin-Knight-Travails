import HashSet from './/HashSet.js';
import LinkedList from './LinkedList.js';

const KnightTravails = (function () {

    
    const Hash = HashSet();


    const calculateMoves = function (coords) {
        const [x, y] = coords;
        const poss = [];
        poss.push([x+2, y+1]);
        poss.push([x+1, y+2]);
        poss.push([x-2, y+1]);
        poss.push([x+1, y-2]);
        poss.push([x-1, y+2]);
        poss.push([x+2, y-1]);
        poss.push([x-2, y-1]);
        poss.push([x-1, y-2]);
        const possibilities = poss.filter((arr) => {
            return arr.every((i) => i >= 0 && i < 8);
        });

        return possibilities;
    }

    const createGraph = function () {

        const graph = [];

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                graph.push([i, j]);
            }
        }

        return graph;
    }


    const graph = createGraph();       

    const initialize = function () {

        for (let i = 0; i < graph.length; i++) {
            const indx = Hash.add([graph[i][0], graph[i][1]]);
            const possMoves = calculateMoves([graph[i][0], graph[i][1]]);
            possMoves.forEach((mv) => {
                Hash.hMap[indx].append(mv);
            });
        }


    }

    const getUnvisitedNode = function (node, visited) {
        let cur = node;
        while (visited.indexOf(cur) > -1 && cur != null) {
            cur = node.nextNode;
        }

        return cur;
    }

    const areEqualArrays = function (arr1, arr2) {

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false; // Elements at current index are not equal
            }
        }

        return true;
    }

    const containsNestedArray = function (mainArray, nested) {
        return mainArray.some((i) => areEqualArrays(i.pos, nested));
    }

    const getIndexOfNestedArray = function (mainArray, coords) {
        let indx;
        for (let i = 0; i < mainArray.length; i++) {
            if (areEqualArrays(mainArray[i].pos, coords)) {
                indx = i;
            }
        }

        return indx;
    }

    const traceOrigin = function (visitedArray) {
        const trace = [];
        let curr = visitedArray.at(-1);

        while (!areEqualArrays(curr.pos, curr.origin)) {
            trace.unshift(curr.pos);
            const nextIndx = getIndexOfNestedArray(visitedArray, curr.origin);
            curr = visitedArray[nextIndx];
        }

        trace.unshift(visitedArray[0].pos);

        return trace;
    }

    const move = function (start, destination) {

        const visited = [];
        const q = [];
        q.push({pos: start, origin: start});
        let frontIndex = 0;

        while (frontIndex < q.length) {
           let front = q[frontIndex]; 
           if (areEqualArrays(front.pos, destination)) {
            console.log("got to the destination!");
            visited.push(front);
            break;
           } else {
            if (!containsNestedArray(visited, front.pos)) {
                visited.push(front);
            }
           }
           let prev = Hash.get(front.pos);
           let curr = prev.nextNode;
           while (curr != null) {
            q.push({pos: curr.value, origin: prev.value});
            curr = curr.nextNode;
           }

           frontIndex++;
        }

        const trace = traceOrigin(visited);

        console.log(`=> You made it in ${trace.length} moves. Here's your path:`);
        trace.forEach((coords) => {
            console.log(coords);
        });



    }



    return {
        initialize,
        Hash,
        calculateMoves,
        move,
    }
})();

export default KnightTravails;