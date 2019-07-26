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
      ],
      materialIcon: 'image',
      initialWidth: '500',
      initialHeight: '700'
    },
    textViewer: {
      type: 'textViewer',
      model: [],
      materialIcon: 'short_text',
      initialWidth: '500',
      initialHeight: '700'
    },
    openbisLogin: {
      type: 'openbisLogin',
      model: [],
      materialIcon: 'album',
      initialWidth: '500',
      initialHeight: '350'
    },
    searchViewer: {
      type: 'searchViewer',
      model: [],
      materialIcon: 'album',
      initialWidth: '500',
      initialHeight: '700'
    },
    grapesJSViewer: {
      type: 'grapesJSViewer',
      model: [],
      materialIcon: 'album',
      initialWidth: '500',
      initialHeight: '700'
    },
    synopsisViewer: {
      type: 'synopsisViewer',
      model: [],
      materialIcon: 'art_track',
      initialWidth: '900',
      initialHeight: '400'
    },
    createResourceForm: {
      type: 'createResourceForm',
      model: [],
      materialIcon: 'add_to_queue',
      initialWidth: '900',
      initialHeight: '400'
    },
    editResourceForm: {
      type: 'editResourceForm',
      model: [],
      materialIcon: 'web',
      initialWidth: '900',
      initialHeight: '400'
    },
    dataChooser: {
      type: 'dataChooser',
      model: [],
      materialIcon: 'web',
      initialWidth: '900',
      initialHeight: '400'
    },
    textlistViewers: {
      type: 'textlistViewers',
      model: [],
      inputs: [
        {
          'inputName': 'textlist'
        }
      ],
      materialIcon: 'short_text',
      initialWidth: '250',
      initialHeight: '150'
    },
    youtubeVideo: {
      type: 'youtubeVideo',
      model: [],
      inputs: [
        {
          'inputName': 'videoURL'
        }
      ],
      materialIcon: 'video_library',
      initialWidth: '600',
      initialHeight: '400'
    },
    barCharts: {
      type: 'barCharts',
      model: [],
      materialIcon: 'bar_chart',
      initialWidth: '1200',
      initialHeight: '500'
    },
    spiralBarCharts: {
      type: 'spiralBarCharts',
      model: [],
      materialIcon: 'bar_chart',
      initialWidth: '500',
      initialHeight: '500'
    },
    lineCharts: {
      type: 'lineCharts',
      model: [],
      materialIcon: 'show_chart',
      initialWidth: '600',
      initialHeight: '400'
    },
    brushZoomCharts: {
      type: 'brushZoomCharts',
      model: [],
      materialIcon: 'insert_chart_outlined',
      initialWidth: '900',
      initialHeight: '500'
    },
    leafletMaps: {
      type: 'leafletMaps',
      model: [],
      materialIcon: 'add_location',
      initialWidth: '500',
      initialHeight: '500'
    },
    pieCharts: {
      type: 'pieCharts',
      model: [],
      materialIcon: 'pie_chart',
      initialWidth: '700',
      initialHeight: '500'
    },
    radialBarCharts: {
      type: 'radialBarCharts',
      model: [],
      materialIcon: 'multiline_chart',
      initialWidth: '500',
      initialHeight: '500'
    },
    sankeyCharts: {
      type: 'sankeyCharts',
      model: [],
      materialIcon: 'linear_scale',
      initialWidth: '900',
      initialHeight: '150'
    },
    stackedBarCharts: {
      type: 'stackedBarCharts',
      model: [],
      materialIcon: 'subtitles',
      initialWidth: '800',
      initialHeight: '500'
    },
    chordDiagrams: {
      type: 'chordDiagrams',
      model: [],
      materialIcon: 'all_out',
      initialWidth: '600',
      initialHeight: '500'
    },
    simpleImageApp: {
      type: 'simpleImageApp',
      model: [],
      inputs: [
          {
            'inputName': 'imageURL'
          }
        ],
      materialIcon: 'add_photo_alternate',
      initialWidth: '500',
      initialHeight: '500'
    },
    jsonViewer: {
      type: 'jsonViewer',
      model: [],
      inputs: [
        {
          'inputName': 'json'
        }
      ],
      materialIcon: 'spa',
      initialWidth: '500',
      initialHeight: '500'
    },
    treeNavigation: {
      type: 'treeNavigation',
      model: [],
      inputs: [
        {
          'inputName': 'json'
        }
      ],
      materialIcon: 'subdirectory_arrow_right',
      initialWidth: '400',
      initialHeight: '600'
    },
    dataListView: {
      type: 'dataListView',
      model: [],
      inputs: [
        {
          'inputName': 'json'
        },
        {
          'inputName': 'settings'
        }
      ],
      materialIcon: 'view_list',
      initialWidth: '700',
      initialHeight: '500'
    },
    parzivalFassung: {
      type: 'parzivalFassung',
      model: [],
      inputs: [
        {
          'inputName': 'textJson'
        }
      ],
      materialIcon: 'view_week',
      initialWidth: '350',
      initialHeight: '250'
    },
    avpEditionView: {
      type: 'avpEditionView',
      model: [],
      inputs: [
        {
          'inputName': 'backendAddress'
        }
      ],
      materialIcon: 'turned_in',
      initialWidth: '350',
      initialHeight: '500'
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
      ],
      materialIcon: 'line_style',
      initialWidth: '350',
      initialHeight: '500'
    },
    htmlViewer: {
      type: 'htmlViewer',
      model: [],
      inputs: [
        {
          'inputName': 'htmlContent'
        },
        {
          'inputName': 'selectiveStyleDeclarations'
        },
        {
          'inputName': 'styleDeclarations'
        }
      ],
      materialIcon: 'aspect_ratio',
      initialWidth: '500',
      initialHeight: '500'
    },
    login: {
      type: 'login',
      model: [],
      materialIcon: 'lock_open',
      initialWidth: '1200',
      initialHeight: '500'
    },
    pageMenu: {
      type: 'pageMenu',
      model: [],
      materialIcon: 'setttings'
    }
  };
}
