export function calculateSubranges(params: number[], data: number[]) {
    const n = params[0];
    const k = params[1];
    return subRanges(n, k, data);
}

/*
* N days of average home sale price data
* Fixed window size K
* Window = N - K + 1
* An increasing subrange: each is greater than the last
* Decreasing subrange: each is less than the last
*
* Output will be N - K + 1 long--same as number of windows
*
* Sample Input
* 5 3
* 188930 194123 201345 154243 1542423
* 1 2 3 1 1
* Sample Output
* 3 (188930 194123 201345)
* 0 (194123 201345 154243)
* -1 (201345 154243 154243)
*
* 4 hours to complete
*
*
*
*/

function subRanges(n: number, k: number, integers: number[]) {
    const numberOfWindows = n - k + 1;
    const subRanges = [];
    let index = 0;
    for (let integer of integers) {
        if (index >= numberOfWindows) break;
        subRanges.push(integers.slice(index, index + k));
        index++;
    }
    return scoreWindows(subRanges);
    // subRanges = [[1,2,3],[2,3,1],[1,1,3]]
}

// This is called a thunk--a function that returns a new usable function
function comparisonFunction(func: Function) {
    return function(subRange: number[]) {
        for (let i=0; i < subRange.length; i++) {
            if (func(i, subRange)) {
                return false;
            }
        }
        return true;
    }
}

const isNonIncreasing = comparisonFunction((index: number, subRange: number[]) => {
    return subRange[index] < subRange[index + 1] && !(subRange[index] === subRange[index + 1]);
})

const isNonDecreasing = comparisonFunction((index: number, subRange: number[]) => {
    return subRange[index] < subRange[index - 1] && !(subRange[index] === subRange[index + 1]);
})

function scoreSubrange(sequence: number[]) {
    let score =  0;
    for (let rangeSize = sequence.length; rangeSize > 1; rangeSize--) {
        const numberOfSubranges = sequence.length - rangeSize + 1;
        for (let subrange = 0; subrange < numberOfSubranges; subrange++) {
            const subrangeSlice = sequence.slice(subrange, subrange + rangeSize);
            if (isNonDecreasing(subrangeSlice)) { score++ };
            if (isNonIncreasing(subrangeSlice)) { score-- };
        }
    }
    return score;
}

function scoreWindows(subRanges: number[][]) {
    const scores = subRanges.map(scoreSubrange);
    // scores.forEach(score => console.log(score));
    return scores;
}