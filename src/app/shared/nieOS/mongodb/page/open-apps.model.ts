export class OpenAppsModel {
  openApps = {
    imageViewer: {
      type: 'imageViewer',
      model: []
    },
    textViewer: {
      type: 'textViewers',
      model: []
    },
    searchViewer: {
      type: 'searchViewers',
      model: []
    },
    grapesJSViewer: {
      type: 'grapesJSViewers',
      model: []
    },
    synopsisViewer: {
      type: 'synopsisViewers',
      model: []
    },
    createResourceForm: {
      type: 'createResourceForm',
      model: []
    },
    dataChooser: {
      type: 'dataChooser',
      model: []
    },
    textlistViewers: {
      type: 'textlistViewers',
      model: [],
      inputs: [
        {
          'inputName': 'textlist'
        }
      ]
    },
    barCharts: {
      type: 'barCharts',
      model: []
    },
    lineCharts: {
      type: 'lineCharts',
      model: []
    },
    brushZoomCharts: {
      type: 'brushZoomCharts',
      model: []
    },
    leafletMaps: {
      type: 'leafletMaps',
      model: []
    },
    pieCharts: {
      type: 'pieCharts',
      model: []
    },
    radialBarCharts: {
      type: 'radialBarCharts',
      model: []
    },
    sankeyCharts: {
      type: 'sankeyCharts',
      model: []
    },
    stackedBarCharts: {
      type: 'stackedBarCharts',
      model: []
    },
    chordDiagrams: {
      type: 'chordDiagrams',
      model: []
    }
  };
}
