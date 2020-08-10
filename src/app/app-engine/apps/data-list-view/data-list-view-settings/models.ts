



export interface ExportOptions {
  showExport: boolean;
}

export interface SortingOptions {
  disallowSorting: boolean;
}

export interface Styles {
  cellStyle: CellStyle;
}

export interface CellStyle {
  curser: string;
}

export interface CellActions {
  actions: boolean;
  actionMode: string;
  actionType: string;
  actionRange: string;
}
