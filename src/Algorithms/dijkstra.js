/*

vector<int> dijkstra(const Graph& graph, int src) {
    priority_queue<pair<int, int>> queue;
    vector<int> distances(graph.numVertices, INT_MAX);
    
    for (int i = 0; i < graph.numVertices; i++) {
        if (distances[i] == INT_MAX) {
            queue.push({i, 0});
            distances[i] = 0;
            while(!queue.empty()) {
                int vertex = queue.top().second;
                queue.pop();

                //relaxation
                for (auto edge : graph.adjList[vertex]) {
                    int newDistance = distances[edge.first];
                    if (distances[vertex] + edge.second < newDistance) {
                        distances[edge.first] = distances[vertex] + edge.second;
                        queue.push({newDistance, edge.first});
                    }
                }
            }
        }
    }

    vector<int> result;
    for (int i = 0; i < graph.numVertices; i++)
        result.push_back(distances[i]);
    
    return result;
}

*/

function bfsAdjList(graph, setGraph) {
  function clear() {
    setGraph({
      ...graph,
      adjStack: []
    });
    graph.adjStack = [];
  }

  function push(val) {
    setGraph({
      ...graph,
      adjStack: [...graph.adjStack, val]
    });
    graph.adjStack = [...graph.adjStack, val];
  }

  function pop() {
    setGraph({
      ...graph,
      adjStack: [...graph.adjStack.slice(1, graph.adjStack.length)]
    });
    graph.adjStack = [...graph.adjStack.slice(1, graph.adjStack.length)];
  }

  function front() {
    return graph.adjStack[0];
  }

  //Algorithm Start
  let visited = new Array(graph.dim * graph.dim);
  for (let i = 0; i < visited.length; ++i) visited[i] = false;

  clear();

  visited[0] = true;
  push([0]);

  while (graph.adjStack.length !== 0) {
    let path = front();
    pop();
    let node = path[path.length - 1];
    if (node === graph.dim * graph.dim - 1) {
      clear();
      push(path);
      break;
    }
    for (var i = 0; i < graph.adjList[node].length; i++) {
      if (!visited[graph.adjList[node][i]]) {
        visited[graph.adjList[node][i]] = true;
        push([...path, graph.adjList[node][i]]);
      }
    }
  }
}

function bfsEdgeList(graph, setGraph) {
  function clear() {
    setGraph({
      ...graph,
      adjStack: []
    });
    graph.adjStack = [];
  }

  function push(val) {
    setGraph({
      ...graph,
      adjStack: [...graph.adjStack, val]
    });
    graph.adjStack = [...graph.adjStack, val];
  }

  function pop() {
    setGraph({
      ...graph,
      adjStack: [...graph.adjStack.slice(1, graph.adjStack.length)]
    });
    graph.adjStack = [...graph.adjStack.slice(1, graph.adjStack.length)];
  }

  function front() {
    return graph.adjStack[0];
  }

  //Algorithm Start
  let visited = new Array(graph.dim * graph.dim);
  for (let i = 0; i < visited.length; ++i) visited[i] = false;

  clear();

  visited[0] = true;
  push([0]);

  while (graph.adjStack.length !== 0) {
    let path = front();
    pop();
    let node = path[path.length - 1];
    if (node === graph.dim * graph.dim - 1) {
      clear();
      push(path);
      break;
    }
    for (var i = 0; i < graph.edgeList.length; i++) {
      if (graph.edgeList[i][0] === node && !visited[graph.edgeList[i][1]]) {
        visited[graph.edgeList[i][1]] = true;
        push([...path, graph.edgeList[i][1]]);
      }
    }
  }
}

export default function bfs(graph, setGraph) {
  //var startTimeAdj = performance.now();
  bfsAdjList(graph, setGraph);
  // var endTimeAdj = performance.now();

  // var startTimeEdge = performance.now();
  // bfsEdgeList(graph, setGraph);
  // var endTimeEdge = performance.now();

  // console.log(
  //   "MS: " + [endTimeAdj - startTimeAdj, endTimeEdge - startTimeEdge]
  // );
}
