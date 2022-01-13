import { Component } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { delay } from 'rxjs';
import { PathFinder } from './find-path.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  startRow: any;
  startCol: any;
  endRow: any;
  endCol: any;

  gridApi!: GridApi;

  rowData: any;
  columnDefs: ColDef[];
  defaultColDef: any;
  getRowNodeId: any;
  title = 'acadian-shortestpath';

  /**
   *
   */
  constructor() {
    this.defaultColDef = {
      flex: 1,
      maxWidth: 80,
      editable: true,
      resizable: true,
    };

    this.columnDefs = [
      this.colDefinitions('0'),
      this.colDefinitions('1'),
      this.colDefinitions('2'),
      this.colDefinitions('3'),
      this.colDefinitions('4'),
      this.colDefinitions('5'),
      this.colDefinitions('6'),
      this.colDefinitions('7'),
      this.colDefinitions('8'),
      this.colDefinitions('9'),
      this.colDefinitions('10'),
    ];

    this.rowData = [
      { '0': '' },
      { '1': '' },
      { '2': '' },
      { '3': '' },
      { '4': '' },
      { '5': '' },
      { '6': '' },
      { '7': '' },
      { '8': '' },
      { '9': '' },
      { '10': '' },
    ];
  }

  private colDefinitions(val: any): ColDef {
    return {
      field: val,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['', 'Start', 'End', 'Block'],
      },
      cellStyle: this.getclass,
    };
  }
  public getclass(params: any) {
    if (params.value === 'Start')
      return {
        backgroundColor: 'red',
        border: 'solid',
        borderTopWidth: '0.5px',
        borderRightWidth: '0.5px',
        borderLeftWidth: '0.5px',
        borderBottomWidth: '0.5px',
      };

    if (params.value === 'Block')
      return {
        backgroundColor: 'lightgrey',
        border: 'solid',
        borderTopWidth: '0.5px',
        borderRightWidth: '0.5px',
        borderLeftWidth: '0.5px',
        borderBottomWidth: '0.5px',
      };

    if (params.value === 'End')
      return {
        backgroundColor: 'purple',
        border: 'solid',
        borderTopWidth: '0.5px',
        borderRightWidth: '0.5px',
        borderLeftWidth: '0.5px',
        borderBottomWidth: '0.5px',
      };

    if (params.value === '--')
      return {
        backgroundColor: 'lightgreen',
        border: 'solid',
        borderTopWidth: '0.5px',
        borderRightWidth: '0.5px',
        borderLeftWidth: '0.5px',
        borderBottomWidth: '0.5px',
      };
    return {
      backgroundColor: 'white',
      border: 'solid',
      borderTopWidth: '0.5px',
      borderRightWidth: '0.5px',
      borderLeftWidth: '0.5px',
      borderBottomWidth: '0.5px',
    };
  }

  checkIfStarts(word: any) {
    let count = 0;
    for (let i = 0; i < this.rowData.length; i++) {
      for (let j = 0; j < this.rowData.length; j++) {
        if (this.rowData[i][j] == word) {
          count++;
        }
      }
    }

    return count;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  findPath() {
    // validate
    var path = new PathFinder();
    var start = this.GetStartPoint('Start');

    if (start.row == -1) {
      alert("Please select 'START' point");
      return;
    }

    var end = this.GetStartPoint('End');
    if (end.row == -1) {
      alert("Please select 'END' point");
      return;
    }
    var cell = path.findPath(start.row, start.col, this.rowData);
    if (cell.Row == -1) {
      alert("There is 'NO' Path available!!");
      return;
    }

    cell = cell.Parent;
    while (cell.Parent != undefined) {
      var rownode = this.gridApi.getRowNode(cell.Row.toString());
      rownode?.setDataValue(cell.Col.toString(), '--');
      cell = cell.Parent;
    }
  }

  Reset() {
    let count = 0;
    for (let i = 0; i < this.rowData.length; i++) {
      for (let j = 0; j < this.rowData.length; j++) {
        var rownode = this.gridApi.getRowNode(i.toString());
        rownode?.setDataValue(j.toString(), '');
      }
    }
    return { row: -1, col: -1 };
  }

  onCellValueChanged(param: any) {
    if (this.checkIfStarts('Start') >= 2) {
      alert(
        'You already selected "START" point, please remove previous one to set new START point.'
      );
      param.node.rowIndex;
      var rownode = this.gridApi.getRowNode(param.node.getRowIndexString());
      rownode?.setDataValue(param.column.colId, '');
      return false;
    }

    if (this.checkIfStarts('End') >= 2) {
      alert(
        'You already selected "END" point, please remove previous one to set new END.'
      );
      param.node.rowIndex;
      var rownode = this.gridApi.getRowNode(param.node.getRowIndexString());
      rownode?.setDataValue(param.column.colId, '');

      return false;
    }

    return true;
  }

  GetStartPoint(word: any) {
    let count = 0;
    for (let i = 0; i < this.rowData.length; i++) {
      for (let j = 0; j < this.rowData.length; j++) {
        if (this.rowData[i][j] == word) {
          return { row: i, col: j };
        }
      }
    }

    return { row: -1, col: -1 };
  }
}
