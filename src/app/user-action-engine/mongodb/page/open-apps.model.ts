export class OpenAppsModel {
  openApps = {
    imageViewer: {
      type: 'imageViewer',
      model: [],
      inputs: [
        {
          'inputName': '@id',
        },
        {
          'inputName': '@type',
        },
        {
          'inputName': 'fileValueAsUrl',
        },
        {
          'inputName': 'fileValueHasFilename',
        },
        {
          'inputName': 'fileValueIsPreview',
        },
        {
          'inputName': 'stillImageFileValueHasDimX',
        },
        {
          'inputName': 'stillImageFileValueHasDimY',
        },
        {
          'inputName': 'stillImageFileValueHasIIIFBaseUrl',
        }
      ]
    },
    textViewer: {
      type: 'textViewer',
      model: []
    },
    searchViewer: {
      type: 'searchViewer',
      model: []
    },
    grapesJSViewer: {
      type: 'grapesJSViewer',
      model: []
    },
    synopsisViewer: {
      type: 'synopsisViewer',
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
    spiralBarCharts: {
      type: 'spiralBarCharts',
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
    },
    simpleImageApp: {
      type: 'simpleImageApp',
      model: [],
      inputs: [
          {
            'inputName': 'imageURL'
          }
        ]
    },
    jsonViewer: {
      type: 'jsonViewer',
      model: [],
      inputs: [
        {
          'inputName': 'json'
        }
      ]
    },
    dataListView: {
      type: 'dataListView',
      model: [],
      inputs: [
        {
          'inputName': 'json'
        }
      ]
    },
    parzivalFassung: {
      type: 'parzivalFassung',
      model: [],
      inputs: [
        {
          'inputName': 'textJson'
        }
      ]
    },
    avpEditionView: {
      type: 'avpEditionView',
      model: [],
      inputs: [
        {
          'inputName': 'backendAddress'
        }
      ]
    },
    svgTranscription: {
      type: 'svgTranscription',
      model: [],
      inputs: [
        {
          'inputName': 'pageTree'
        },
        {
          'inputName': 'imageUrl'
        },
        {
          'inputName': 'imageWidth'
        },
        {
          'inputName': 'imageHeight'
        }
      ]
    }
  };
}
