import { Cell } from './cell-model';
import { Queue } from './generic-queue';

export class PathFinder {
  pathequeue: Queue<Cell>;

  visited: boolean[][] = [];
  constructor() {
    this.pathequeue = new Queue<Cell>();
  }

  findPath(startrow: Number | any, endcol: Number | any, data: any[][]): Cell {
    var row: any = startrow;
    var col: any = endcol;
    var dist: any = 0;
    var path: any[] = [];
    path.push(0, 0);

    this.visited = Array.from({ length: data.length }, () =>
      Array.from({ length: data.length }, () => false)
    );

    this.pathequeue.enqueue(new Cell(row, col, dist, undefined, path));
    while (this.pathequeue.size() > 0) {
      var current = this.pathequeue.dequeue();

      row = current.Row;
      col = current.Col;
      dist = current.Dist;
      path = current.Path;

      if (this.visited[row][col] == true) {
        continue;
      }
      this.visited[row][col] = true;

      if (
        row >= data.length ||
        col >= data.length ||
        row < 0 ||
        col < 0 ||
        data[row][col] == 'Block'
      ) {
        continue;
      }

      if (data[row][col] == 'End') {
        console.log('found at (' + row + ',' + col + ')');
        return current;
      }

      if (row - 1 >= 0) {
        var up = data[row - 1][col];
        path.push(row - 1, col);
        this.pathequeue.enqueue(
          new Cell(row - 1, col, dist + 1, current, path)
        );
      }

      if (col - 1 >= 0) {
        var left = data[row][col - 1];
        path.push(row, col - 1);
        this.pathequeue.enqueue(
          new Cell(row, col - 1, dist + 1, current, path)
        );
      }

      if (row + 1 < data.length) {
        var down = data[row + 1][col];
        path.push(row + 1, col);
        this.pathequeue.enqueue(
          new Cell(row + 1, col, dist + 1, current, path)
        );
      }

      if (col + 1 < data.length) {
        var right = data[row][col + 1];
        path.push(row, col + 1);
        this.pathequeue.enqueue(
          new Cell(row, col + 1, dist + 1, current, path)
        );
      }
    }
    return new Cell(-1, -1, -1, -1, []);
  }
}
