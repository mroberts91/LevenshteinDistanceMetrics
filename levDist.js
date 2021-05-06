const levenshteinDistanceMatrix = (str1 = '', str2 = '') => {
    // Create an empty matrix for our length bound
    const matrix = 
        Array(str2.length + 1)
            .fill(null)
            .map(() => Array(str1.length + 1).fill(null));
    
    // Fill in (0, 1)
    for (let i = 0; i <= str1.length; i += 1) {
       matrix[0][i] = i;
    }
    // Fill in (1, 0)
    for (let j = 0; j <= str2.length; j += 1) {
       matrix[j][0] = j;
    }

    // Fill in remain indexes for the number of operations
    for (let j = 1; j <= str2.length; j += 1) {
       for (let i = 1; i <= str1.length; i += 1) {
          const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
          matrix[j][i] = Math.min(
             matrix[j][i - 1] + 1, // deletion
             matrix[j - 1][i] + 1, // insertion
             matrix[j - 1][i - 1] + indicator, // substitution
          );
       }
    }

    return matrix;
};

const levenshteinDistanceMetric = (str1, str2) => {
    const matrix = levenshteinDistanceMatrix(str1, str2);
    return matrix[str2.length][str1.length];
 };

 module.exports = { levenshteinDistanceMatrix, levenshteinDistanceMetric };