// Function to create AxA matrix
function generateMatrix(a: number) {
    let matrix = [];
    for (let i = 0; i < a; i++) {
        let row = [];
        for (let j = 0; j < a; j++) {
            row.push(Math.floor(Math.random() * 9) + 1);
        }
        matrix.push(row);
    }
    return matrix; 
}

// Function to display the matrix
function displayMatrix(matrix: number[][]) {
    console.log("Matrix:");
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(" "));
    }
}

// Function to calculate the sum of each row
function sumRows(matrix: number[][]) {
    let rowSums = [];
    for (let i = 0; i < matrix.length; i++) {
        let sum = matrix[i].reduce((a, b) => a + b, 0);
        rowSums.push(sum);
    }
    return rowSums;
}

// Function to calculate the sum of each column
function sumColumns(matrix: number[][]) {
    let colSums = []
    for (let i = 0; i < matrix.length; i++) {
        let sum = 0
        for (let j = 0; j < matrix.length; j++) {
            sum += matrix[j][i];
        }
        colSums.push(sum)
    }
    return colSums;
}

// Function to calculate matrix determinant
function determinant(matrix: number[][]) {
    const size = matrix.length

    if (size === 1) {
        return matrix[0][0]
    }

    if (size === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    }

    let det = 0
    for (let i = 0; i < size; i++) {
        // Exclude current matrix column
        let subMatrix = matrix.slice(1)
        subMatrix = subMatrix.map(row => row.filter((_, index) => index !== i))
        det += matrix[0][i] * determinant(subMatrix) * (i % 2 === 0 ? 1 : -1); 
    }

    return det;
}

// Function to transpose matrix
function transpose(matrix: number[][]) {
    const size = matrix.length

    let tMatrix = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            tMatrix[i][j] = matrix[j][i]
        }
    }

    return tMatrix;
}

// Function to check if matrix is invertible
function isInvertible(matrix: number[][]) {
    const size = matrix.length

    const det = determinant(matrix)
    return det !== 0;
}

// Function to check if matrix is square
function isSquareMatrix(matrix: number[][]) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    return numRows === numCols;
}


// Function to add two matrices
function addMatrices(matrix1: number[][], matrix2: number[][]) {
    const size = matrix1.length;
    let result = matrix1;
    
    for (let i = 0; i < size; i++) {
        result[i] = [];
        for (let j = 0; j < size; j++) {
            result[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }
    return result;
}

// Function to subtract two matrices
function subtractMatrices(matrix1: number[][], matrix2: number[][]) {
    const size = matrix1[0].length;
    let result = matrix1;
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            result[i][j] = matrix1[i][j] - matrix2[i][j];
        }
    }
    return result;
}

// Function to multiply two matrices
function multiplyMatrices(matrix1: number[][], matrix2: number[][]) {
    const size = matrix1.length;
    
    let result = matrix1;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            result[i][j] = 0;
            for (let k = 0; k < size; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    return result;
}

// Function to remove row and column for element
function removeRowAndColumn(matrix: number[][], a: number, b: number) : number[][] {
    return matrix.reduce<number[][]>((result, row, i) => {
        if (i !== a) {
            result.push(row.filter((_, j) => j !== b));
        }
        return result;
    }, []);
}

// Function to find minor of a matrix
function minor(matrix: number[][]) {
    const size = matrix.length;
    
    let result = matrix

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let m: number[][] = removeRowAndColumn(matrix, i, j)
            let d = determinant(m)
            result[i][j] = d
        }
    }

    return result
}

// Main function to execute the program
function main() {
    const matrix: number[][] = generateMatrix(3);
    console.log(matrix)
    displayMatrix(matrix);

    const rowSums: number[] = sumRows(matrix);
    console.log("Sum of rows:", rowSums.join(", "));

    const colSums: number[] = sumColumns(matrix);
    console.log("Sum of columns:", colSums.join(", "));

    const det: number = determinant(matrix)
    console.log(determinant(matrix))

    const tMatrix: number[][] = transpose(matrix)
    console.log(tMatrix)
    displayMatrix(tMatrix)

    const invertible: boolean = isInvertible(matrix)
    console.log(invertible)

    const minOfMatrix: number[][] = minor(matrix)
    displayMatrix(minOfMatrix)

}

// Execute the program
main();
