
export class Cell {
  Row: Number;
  Col: Number;
  Dist: Number;
  Parent: Cell;
  Path: any[] = [];

  constructor(
    row: Number,
    col: Number,
    dist: any,
    parent: Cell | any,
    path: any[]
  ) {
    this.Col = col;
    this.Row = row;
    this.Dist = dist;
    this.Parent = parent;
    this.Path = path;
  }
}
