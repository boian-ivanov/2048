type Position = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN';

export default class Grid<Grid> {
    grid: number[][] = [];
    score: number = 0;
    gameOver: boolean = false;

    constructor(public rows: number, public columns: number) {
        // create an empty grid
        this.grid = Array(rows).fill(null).map(() => Array(columns).fill(null));
    }

    init(): void {
        this.populateRandomEmptySpace();
    }

    populateRandomEmptySpace(): void {
        const checkForEmptySpace = this.grid.every((row) => row.every((item) => item !== null));
        if (checkForEmptySpace) {
            this.gameOver = true;
            return;
        }
        const randomRowIndex = Math.floor(Math.random() * this.grid.length);
        const randomColumnIndex = Math.floor(Math.random() * this.grid[0].length);
        if (this.grid[randomRowIndex][randomColumnIndex] === null) {
            this.grid[randomRowIndex][randomColumnIndex] = 1;
        } else {
            this.populateRandomEmptySpace();
        }
    }

    move(direction: string): void {
        switch (direction) {
            case 'LEFT':
                this.moveLeft();
                break;
            case 'RIGHT':
                this.moveRight();
                break;
            case 'UP':
                this.moveUp();
                break;
            case 'DOWN':
                this.moveDown();
                break;
            default:
                break;
        }
    }

    static removeNullsFromRow(row: number[]): number[] {
        return row.filter((item) => item !== null);
    }

    static transpose(grid: number[][]): number[][] {
        return grid[0].map((col, i) => grid.map(row => row[i]));
    }

    addNullsToRow(row: number[], position: Position): number[] {
        switch (position) {
            case 'LEFT':
                if (row.length < this.grid[0].length) {
                    const nullsToAdd = this.grid[0].length - row.length;
                    for (let i = 0; i < nullsToAdd; i++) {
                        row.push(null);
                    }
                }
                break;
            case 'RIGHT':
                if (row.length < this.grid[0].length) {
                    const nullsToAdd = this.grid[0].length - row.length;
                    for (let i = 0; i < nullsToAdd; i++) {
                        row.unshift(null);
                    }
                }
                break;
        }
        return row;
    }

    addNumsInRow(row: number[], position: Position): number[] {
        switch (position) {
            case 'LEFT':
                let lastPosition = null;
                for (let i = 0; i < row.length; i++) {
                    if (row[i] === lastPosition) {
                        row[i - 1] = row[i] + row[i - 1];
                        row[i] = null;
                        this.updateScore(row[i - 1]);
                    } else {
                        lastPosition = row[i];
                    }
                }
                break;
            case 'RIGHT':
                for (let i = row.length - 1; i >= 0; i--) {
                    if (row[i] === row[i - 1]) {
                        row[i] = row[i] + row[i - 1];
                        this.updateScore(row[i]);
                        row[i - 1] = null;
                    }
                }
                break;
            case 'UP':
                // TODO
                break;
            case 'DOWN':
                // TODO
                break;
        }
        return row;
    }

    moveLeft(): void {
        this.grid.forEach((row, index, array) => {
            let filteredRow = Grid.removeNullsFromRow(row);
            filteredRow = this.addNumsInRow(filteredRow, 'LEFT');
            filteredRow = this.addNullsToRow(filteredRow, 'LEFT');
            array[index] = filteredRow;
        });
        this.populateRandomEmptySpace();
    }

    moveRight(): void {
        this.grid.forEach((row, index, array) => {
            let filteredRow = Grid.removeNullsFromRow(row);
            filteredRow = this.addNumsInRow(filteredRow, 'RIGHT');
            filteredRow = this.addNullsToRow(filteredRow, 'RIGHT');
            array[index] = filteredRow;
        });
        this.populateRandomEmptySpace();
    }

    moveUp(): void {
        let variableGrid = Grid.transpose(this.grid);
        variableGrid.forEach((row, index, array) => {
            let filteredRow = Grid.removeNullsFromRow(row);
            filteredRow = this.addNumsInRow(filteredRow, 'LEFT');
            filteredRow = this.addNullsToRow(filteredRow, 'LEFT');
            array[index] = filteredRow;
        });
        this.grid = Grid.transpose(variableGrid);
        this.populateRandomEmptySpace();
    }

    moveDown(): void {
        let variableGrid = Grid.transpose(this.grid);
        variableGrid.forEach((row, index, array) => {
            let filteredRow = Grid.removeNullsFromRow(row);
            filteredRow = this.addNumsInRow(filteredRow, 'RIGHT');
            filteredRow = this.addNullsToRow(filteredRow, 'RIGHT');
            array[index] = filteredRow;
        });
        this.grid = Grid.transpose(variableGrid);
        this.populateRandomEmptySpace();
    }

    get(): number[][] {
        return this.grid;
    }

    getScore(): number {
        return this.score;
    }

    updateScore(score: number): void {
        this.score += score;
    }

    isGameOver(): boolean {
        return this.gameOver;
    }
}


// function populateGridAtRandomPosition(grid: Grid, value: number) {
//   const currentGrid = grid.get();
//   const randomIndex = Math.floor(Math.random() * currentGrid.length);
//   const randomCell = currentGrid[randomIndex];
//   grid.setCellValue(randomCell, value);
// }
