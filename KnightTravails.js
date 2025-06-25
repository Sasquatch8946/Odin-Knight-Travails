import HashMap from './/HashMap.js';


const KnightTravails = (function () {

    
    const Hash = HashMap();

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
        const uniqueHashes = [];
        const graph = createGraph();       

        for (let i = 0; i < graph.length; i++) {
            Hash.set(graph[i][0], graph[i][1]);
        }


    }


    return {
        initialize,
        Hash,
    }
})();

export default KnightTravails;