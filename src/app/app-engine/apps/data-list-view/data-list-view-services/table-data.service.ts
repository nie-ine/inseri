import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class DisplayedCollumnsService {

  public getDisplayedColumns(dataListSettings, data?) {
    let displayedColumns: Array<any> = [];
    if (dataListSettings.columns.genericColumns) {
      if (dataListSettings.jsonType === 'sparql') {
        for (const entry of data.head.vars) {
          displayedColumns.push(entry + '.value');
          displayedColumns.push(entry + '.type');
        }
        console.log('got displayed comlumns generically: ' + displayedColumns);
        return displayedColumns;
      } else if (dataListSettings.jsonType === 'knora-extended') {
        displayedColumns = [this.generateDisplayedColumnsForKnora(data)];
        return displayedColumns;
      } else {
        console.log('Wrong datalistSettings: this.dataListSettingsOut.columns.genericColumns = ' +
          dataListSettings.columns.genericColumns + ' but this.dataListSettingsOut.jsonType "' +
          dataListSettings.jsonType + '" is not applicable to a generic column definition ' +
          'or not yet implemented)'); }
      // if not using generic columns
    } else {
      for (const column of dataListSettings.columns.columnMapping) {
        if (column.displayed === true) {
          displayedColumns.push(column.name);
        }
      }
      console.log('got displayed comlumns: ' + displayedColumns);
      return displayedColumns;
    }
  }

  private generateDisplayedColumnsForKnora(data) {
    const cols = new Set();
    for (const obj of data) {
      for (const key of Object.getOwnPropertyNames(obj)) {
        cols.add(key);
      }
    }
    return cols;
  }

}
