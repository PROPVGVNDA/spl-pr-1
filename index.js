// Function to create AxA matrix
function generateMatrix(a) {
    matrix = [];
    for (i = 0; i < a; i++) {
        row = [];
        for (j = 0; j < a; j++) {
            row.push(Math.floor(Math.random() * 9) + 1);
        }
        matrix.push(row);
    }
    return matrix; 
}

// Function to display the matrix
function displayMatrix(matrix) {
    console.log("Matrix:");
    for (i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(" "));
    }
}

// Function to calculate the sum of each row
function sumRows(matrix) {
    rowSums = [];
    for (i = 0; i < matrix.length; i++) {
        sum = matrix[i].reduce((a, b) => a + b, 0);
        rowSums.push(sum);
    }
    return rowSums;
}

// Function to calculate the sum of each column
function sumColumns(matrix) {
    colSums = []
    for (i = 0; i < matrix.length; i++) {
        sum = 0
        for (j = 0; j < matrix.length; j++) {
            sum += matrix[j][i];
        }
        colSums.push(sum)
    }
    return colSums;
}

// Function to calculate matrix determinant
function determinant(matrix) {
    size = matrix.length

    if (size === 1) {
        return matrix[0][0]
    }

    if (size === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    }

    det = 0
    for (i = 0; i < size; i++) {
        // Exclude current matrix column
        subMatrix = matrix.slice(1)
        subMatrix = subMatrix.map(row => row.filter((_, index) => index !== i))
        det += matrix[0][i] * determinant(subMatrix) * (i % 2 === 0 ? 1 : -1); 
    }

    return det;
}

// Function to transpose matrix
function transpose(matrix) {
    size = matrix.length

    tMatrix = Array.from({ length: size }, () => Array(size).fill(0));

    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            tMatrix[i][j] = matrix[j][i]
        }
    }

    return tMatrix;
}

// Function to check if matrix is invertible
function isInvertible(matrix) {
    size = matrix.length

    det = determinant(matrix)
    return det !== 0;
}

// Function to check if matrix is square
function isSquareMatrix(matrix) {
    numRows = matrix.length;
    numCols = matrix[0].length;

    return numRows === numCols;
}

// Function to print matrix size
function printMatrixSize(matrix) {
    size = getMatrixSize(matrix);
    console.log(`Matrix Size: ${size.rows}x${size.cols}`);
}

// Function to add two matrices
function addMatrices(matrix1, matrix2) {
    size = matrix1.length;
    result = [];
    
    for (i = 0; i < size; i++) {
        result[i] = [];
        for (j = 0; j < size; j++) {
            result[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }
    return result;
}

// Function to subtract two matrices
function subtractMatrices(matrix1, matrix2) {
    size = matrix1[0].length;
    result = [];
    
    for (i = 0; i < size; i++) {
        result[i] = [];
        for (j = 0; j < size; j++) {
            result[i][j] = matrix1[i][j] - matrix2[i][j];
        }
    }
    return result;
}

// Function to multiply two matrices
function multiplyMatrices(matrix1, matrix2) {
    size = matrix1.length;
    
    result = [];
    for (i = 0; i < rows1; i++) {
        result[i] = [];
        for (j = 0; j < cols2; j++) {
            result[i][j] = 0;
            for (k = 0; k < cols1; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    return result;
}

// Function to remove row and column for element
function removeRowAndColumn(matrix, a, b) {
    return matrix.reduce((result, row, i) => {
        if (i !== a) {
            result.push(row.filter((_, j) => j !== b));
        }
        return result;
    }, []);
}

// Function to find minor of a matrix
function minor(matrix) {
    size = matrix.length;
    
    result = matrix

    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            m = removeRowAndColumn(matrix, i, j)
            d = determinant(m)
            result[i][j] = d
        }
    }

    return result
}

// Main function to execute the program
function main() {
    matrix = generateMatrix(3);
    console.log(matrix)
    displayMatrix(matrix);

    rowSums = sumRows(matrix);
    console.log("Sum of rows:", rowSums.join(", "));

    colSums = sumColumns(matrix);
    console.log("Sum of columns:", colSums.join(", "));

    det = determinant(matrix)
    console.log(determinant(matrix))

    tMatrix = transpose(matrix)
    console.log(tMatrix)
    displayMatrix(tMatrix)

    invertible = isInvertible(matrix)
    console.log(invertible)

    minOfMatrix = minor(matrix)
    displayMatrix(minOfMatrix)

}

// Execute the program
main();
