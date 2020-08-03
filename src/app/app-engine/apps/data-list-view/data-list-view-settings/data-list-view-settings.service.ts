import {Injectable} from '@angular/core';


// queryResponse --> table takes an array; query --> table is loading content via a passed SPARQL query string
// sparql -->
@Injectable()
export class Filter {
  constructor(  private _showFilter: boolean, // show/hide filter input field
                private _caseSensitive: boolean // how filter input is validated
  ) {}
  get showFilter() {
    return this._showFilter;
  }
  set showFilter(val: boolean) {
    this._showFilter = val;
  }
  get caseSensitive() {
    return this._caseSensitive;
  }
  set caseSensitive(val: boolean) {
    this._caseSensitive = val;
  }
}

@Injectable()
export class Paginator {
  constructor(  private _paginate: boolean, // show/hide paginator
                private _pageIndex: number, // displayed page on startup/refresh
                private _pageSize: number, // offset/number of displayed entries on one page
                private _pageSizeOptions: Array<number> // the displayed page numbers to schoose from e.g. "0, 5, 10, 15"
  ) {}

  get paginate() {
    return this._paginate;
  }
  set paginate(val: boolean) {
    this._paginate = val;
  }
  get pageIndex() {
    return this._pageIndex;
  }
  set pageIndex(val: number) {
    this._pageIndex = val;
  }
  get pageSize() {
    return this._pageSize;
  }
  set pageSize(val: number) {
    this._pageSize = val;
  }
  get pageSizeOptions() {
    return this._pageSizeOptions;
  }
  set pageSizeOptions(val: Array<number>) {
    this._pageSizeOptions = val;
  }
}

@Injectable()
export class ColumnMapping {
  constructor(  private _name: string, // displayed comlumn name or name for reuse
                private _path: Array<string>, // the path within the passed JSON response from endpoint
                private _filtered: boolean, // if the entries of that column apply to filter input
                private _displayed: boolean, // if the column header is displayed or not
              ) {}

  get name() {
    return this._name;
  }
  set name(val: string) {
    this._name = val;
  }
  get path() {
    return this._path;
  }
  set path(val: Array<string>) {
    this._path = val;
  }
  get filtered() {
    return this._filtered;
  }
  set filtered(val: boolean) {
    this._filtered = val;
  }
  get displayed() {
    return this._displayed;
  }
  set displayed(val: boolean) {
    this._displayed = val;
  }
}

@Injectable()
export class ColumnDefinition {
  constructor(  private _genericColumns: boolean, // false if columns are manually defined by column mapping
                private _stickyColumn: number, // the first line which should be sticky and not scroll
                private _nestedDatasource: boolean, // if a JSON response is nested and should be flattened
                private _columnMappings?: Array<ColumnMapping>) {}

  get genericColumns() {
    return this._genericColumns;
  }
  set genericColumns(val: boolean) {
    this._genericColumns = val;
  }
  get stickyColumn() {
    return this._stickyColumn;
  }
  set stickyColumn(val: number) {
    this._stickyColumn = val;
  }
  get nestedDatasource() {
    return this._nestedDatasource;
  }
  set nestedDatasource(val: boolean) {
    this._nestedDatasource = val;
  }
  get columnMappings() {
    return this._columnMappings;
  }
  set columnMappings(val: Array<ColumnMapping>) {
    this._columnMappings = val;
  }
}


@Injectable()
export class DataListViewSettings {
  constructor(private _inputMode: string,
              private _jsonType: string,
              private _collumnDefinition: ColumnDefinition,
              private _filter: Filter,
              private _paginator: Paginator
              /*
          private _exportOptions: ExportOptions,
         private _sortingOptions: SortingOptions,
         private _styles: Styles,
         private _cellActions: CellActions,
          */
  ) {
  }

    get inputMode() {
      return this._inputMode;
    }

    set inputMode(val: string) {
      this._inputMode = val;
    }

    get jsonType() {
      return this._jsonType;
    }

    set jsonType(val: string) {
      this._jsonType = val;
    }

  get collumnDefinition() {
    return this._collumnDefinition;
  }

  set collumnDefinition(val: ColumnDefinition) {
    this._collumnDefinition = val;
  }
  get filter() {
    return this._filter;
  }

  set filter(val: Filter) {
    this._filter = val;
  }
  get paginator() {
    return this._paginator;
  }

  set paginator(val: Paginator) {
    this._paginator = val;
        }
/*
          get exportOptions() {
            return this._exportOptions;
          }

          set exportOptions(val: ExportOptions) {
            this._exportOptions = val;
          }

          get sortingOptions() {
            return this._sortingOptions;
          }

          set sortingOptions(val: SortingOptions) {
            this._sortingOptions = val;
          }

          get styles() {
            return this._styles;
          }

          set styles(val: Styles) {
            this._styles = val;
          }

          get cellActions() {
            return this._cellActions;
          }

          set cellActions(val: CellActions) {
            this._cellActions = val;
          }*/

          public generateDataListViewSettings(settingsJSON?) {
            // console.log(settingsJSON);
            let sets: DataListViewSettings;
            console.log(sets);
            /*if (settingsJSON) {
              Object.assign(sets, settingsJSON);
            } else { Object.assign(sets, fallbackSettings );
              }*/
            return sets;
        }
}

