function kNN(csvData, depth, x, y) {
    // let k = 3;
    let tol = 1000;
    let distances = [];
    csvData.forEach(element => {
        distances.push(Math.sqrt(Math.pow(parseInt(element.x) - parseInt(x), 2) + Math.pow(parseInt(element.y) - parseInt(y), 2)));
    });
    console.log('Distances to wells: ',distances)
    let sortedDistanceInd = sortIndices(distances);
    console.log('Sorted distance indices: ',sortedDistanceInd)
    let ind = -1;
    for (let i of sortedDistanceInd) {
        if ((parseInt(depth) - tol < parseInt(csvData[i].z)) && (parseInt(csvData[i].z) < parseInt(depth) + tol)) {
            ind = i;
            break;
        }
    }
    ind = ind === -1 ? sortedDistanceInd[0] : ind;
    console.log('Final index selected: ',ind)
    return [csvData[ind].C1, csvData[ind].C2, csvData[ind].C3];
}

function sortIndices(arr) {
    let len = arr.length;
    let indices = new Array(len);
    for (let i = 0; i < len; ++i) indices[i] = i;
    indices.sort(function (a, b) { return arr[a] < arr[b] ? -1 : arr[a] > arr[b] ? 1 : 0; });
    return indices;
}

function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
    }, {});
    return el;
    });
    return arr;
}

export {
    kNN,
    csvToArray
}