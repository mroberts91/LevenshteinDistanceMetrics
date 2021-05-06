const lib = require("./levDist");

let testCount = 0;

const view_matrix = (a, b) => {
    const matrix = lib.levenshteinDistanceMatrix(a, b);
    if (matrix) {
        console.table(matrix);
    } else{
        console.error(`Unable to view matrix for args ${a},${b}`);
    }
};

const test_distance = (a, b, answer) => {
    testCount++;
    let d = lib.levenshteinDistanceMetric(a, b)
    const result = 
        d === answer 
        ? "passed"
        : `a: ${a}, b: ${b}, expected: ${answer}, actual: ${d}`;

    console.log(`TEST ${testCount}: ${result}`);
    return result === "passed";
};

const testCases = [
    { arg1: "", arg2: "", expected: 0 },
    { arg1: "", arg2: "12345", expected: 5 },
    { arg1: "1", arg2: "1", expected: 0 },
    { arg1: "1", arg2: "2", expected: 1 },
    { arg1: "12", arg2: "12", expected: 0 },
    { arg1: "123", arg2: "12", expected: 1 },
    { arg1: "1234", arg2: "1", expected: 3 },
    { arg1: "1234", arg2: "1233", expected: 1 },
    { arg1: "1248", arg2: "1349", expected: 2 },
    { arg1: "5677", arg2: "1234", expected: 4 },
    { arg1: "123456", arg2: "12345", expected: 1 },
    { arg1: "13579", arg2: "12345", expected: 4 },
    { arg1: "123", arg2: "", expected: 3},
    { arg1: "kitten", arg2: "mittens", expected: 2 },
    { arg1: "mike", arg2: "tike", expected: 1 },
    { arg1: "mike", arg2: "mik", expected: 1 },
    { arg1: "mike", arg2: "mic", expected: 2 },
    { arg1: "mike", arg2: "mic", expected: 2 },
    { arg1: "kitten", arg2: "smitten", expected: 2},
    { arg1: "kitten", arg2: "mitten", expected: 1},
    { arg1: "kitten", arg2: "kitty", expected: 2},
    { arg1: "kitten", arg2: "fitting", expected: 3},
    { arg1: "kitten", arg2: "written", expected: 2}
];

let successCount = 0;
testCases.forEach(obj => {
    view_matrix(obj.arg1, obj.arg2);
    successCount = test_distance(obj.arg1, obj.arg2, obj.expected) 
                    ? successCount += 1 
                    : successCount;  
});

console.log(`${successCount}/${testCases.length} passed.`);