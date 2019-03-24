module.exports = function solveSudoku(matrix) {

    function findSolution(matrix, row=0, col=0) {
        let cell = findNull(matrix, row, col);
        row = cell[0];
        col = cell[1];

        if (row === -1) {
            return true;
        }

        for (let num = 1; num <= 9; num++) {

            if ( noConflicts(matrix, row, col, num) ) {
                matrix[row][col] = num;

                if ( findSolution(matrix, row, col) ) {
                    return true;
                }

                matrix[row][col] = 0;
            }
        }

        return false;
    }

    function findNull(matrix, row, col) {
        for (; row < 9 ; col = 0, row++)
            for (; col < 9 ; col++)
                if (matrix[row][col] === 0)
                    return [row, col];
        return [-1, -1];
    }

    function noConflicts(matrix, row, col, num) {
        return checkRow(matrix, row, num) && checkCol(matrix, col, num) && checkBox(matrix, row, col, num);
    }

    function checkRow(matrix, row, num) {
        for (let col = 0; col < 9; col++)
            if (matrix[row][col] === num)
                return false;

        return true;
    }
    function checkCol(matrix, col, num) {
        for (let row = 0; row < 9; row++)
            if (matrix[row][col] === num)
                return false;

        return true;
    }
    function checkBox(matrix, row, col, num) {
        row = Math.floor(row / 3) * 3;
        col = Math.floor(col / 3) * 3;

        for (let r = 0; r < 3; r++)
            for (let c = 0; c < 3; c++)
                if (matrix[row + r][col + c] === num)
                    return false;

        return true;
    }

    findSolution(matrix);

    return matrix;
}