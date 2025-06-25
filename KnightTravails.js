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

    const initialize = function () {
        const graph = createGraph();       

        for (let i = 0; i < graph.length; i++) {
            const indx = Hash.add([graph[i][0], graph[i][1]]);
            const possMoves = calculateMoves([graph[i][0], graph[i][1]]);
            possMoves.forEach((mv) => {
                Hash.hMap[indx].append(mv);
            });
        }


    }



    return {
        initialize,
        Hash,
        calculateMoves,
    }
})();

export default KnightTravails;