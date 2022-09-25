type Position = 'LEFT' | 'RIGHT';

export default class Grid<Grid> {
    grid: number[][] = [];
    score: number = 0;
    gameOver: boolean = false;
    gameWon: boolean = false;

    constructor(public rows: number, public columns: number, withGrid?: string) {
        if (withGrid) {
            this.grid = this.fromJSON(withGrid);
        } else {
            this.grid = Grid.createEmptyGrid(rows, columns);
            this.init();
        }
    }

    init(): void {
        this.populateRandomEmptySpace();
    }

    move(direction: string): void {
        switch (direction) {
            case 'LEFT':
                this.moveLeft();
                this.populateRandomEmptySpace();
                break;
            case 'RIGHT':
                this.moveRight();
                this.populateRandomEmptySpace();
                break;
            case 'UP':
                this.grid = Grid.transpose(this.grid);
                this.moveLeft();
                this.grid = Grid.transpose(this.grid);
                this.populateRandomEmptySpace();
                break;
            case 'DOWN':
                this.grid = Grid.transpose(this.grid);
                this.moveRight();
                this.grid = Grid.transpose(this.grid);
                this.populateRandomEmptySpace();
                break;
            default:
                break;
        }
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

    isGameWon(): boolean {
        return this.gameWon;
    }

    fromJSON(data: string): number[][] {
        let { grid, score } = JSON.parse(data);
        this.score = score;
        return grid;
    }

    static createEmptyGrid(rows: number, columns: number): number[][] {
        return Array(rows).fill(null).map(() => Array(columns).fill(null));
    }

    static removeNullsFromRow(row: number[]): number[] {
        return row.filter((item) => item !== null);
    }

    static transpose(grid: number[][]): number[][] {
        return grid[0].map((col, i) => grid.map(row => row[i]));
    }

    private populateRandomEmptySpace(): void {
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

    private addNullsToRow(row: number[], position: Position): number[] {
        if (row.length < this.columns) {
            const nullsToAdd = this.columns - row.length;
            for (let i = 0; i < nullsToAdd; i++) {
                position === 'LEFT' ? row.push(null) : row.unshift(null);
            }
        }
        return row;
    }

    private checkFor2048(num: number): void {
        if (num === 2048) {
            this.gameWon = true;
        }
    }

    private addNumsInRow(row: number[], position: Position): number[] {
        if (position === 'RIGHT') {
            row = row.reverse();
        }
        for (let i = 0; i < row.length; i++) {
            if (row[i] === row[i + 1]) {
                row[i] = row[i] + row[i + 1];
                row.splice(i + 1, 1);
                this.updateScore(row[i]);
                this.checkFor2048(row[i]);
            }
        }
        if (position === 'RIGHT') {
            row = row.reverse();
        }
        return row;
    }

    private moveLeft(): void {
        this.grid.forEach((row, index, array) => {
            let filteredRow = Grid.removeNullsFromRow(row);
            filteredRow = this.addNumsInRow(filteredRow, 'LEFT');
            filteredRow = this.addNullsToRow(filteredRow, 'LEFT');
            array[index] = filteredRow;
        });
    }

    private moveRight(): void {
        this.grid.forEach((row, index, array) => {
            let filteredRow = Grid.removeNullsFromRow(row);
            filteredRow = this.addNumsInRow(filteredRow, 'RIGHT');
            filteredRow = this.addNullsToRow(filteredRow, 'RIGHT');
            array[index] = filteredRow;
        });
    }
}
