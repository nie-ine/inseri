export class OpenAppsModel {
  openApps = {
    imageViewer: {
      type: 'imageViewer',
      model: [],
      inputs: [
        {
          'inputName': 'fileValueAsUrl',
        },
        {
          'inputName': 'stillImageFileValueHasDimX',
        },
        {
          'inputName': 'stillImageFileValueHasDimY',
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
    knoraV2viewer: {
      type: 'knoraV2viewer',
      model: [],
      inputs: [
        {
          'inputName': 'backendAddress'
        },
        {
          'inputName': 'resourceIRI'
        },
        {
          'inputName': 'queryParamForResourceIRI'
        },
        {
          'inputName': 'hoverColor'
        },
        {
          'inputName': 'maxDepth'
        }
      ],
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
    hierarchicalNavigationView: {
      type: 'hierarchicalNavigationView',
      model: [],
      inputs: [
        {
          'inputName': 'backendAddress'
        },
        {
          'inputName': 'navigationRootIri'
        },
        {
          'inputName': 'navigationConfiguration'
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
    joinedTextView: {
      type: 'joinedTextView',
      model: [],
      inputs: [
        {
          'inputName': 'textConfiguration'
        },
        {
          'inputName': 'selectiveStyleDeclarations'
        },
        {
          'inputName': 'styleDeclarations'
        },
        {
          'inputName': 'backendAddress'
        },
        {
          'inputName': 'textRootIri'
        },
        {
          'inputName': 'queryParamForTextRootIri'
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
      initialWidth: '750',
      initialHeight: '500'
    },
    pageMenu: {
      type: 'pageMenu',
      model: [],
      materialIcon: 'settings',
      initialWidth: '750',
      initialHeight: '500'
    },
    sparqlVisualizer: {
      type: 'sparqlVisualizer',
      model: [],
      materialIcon: 'drag_indicator',
    initialWidth: '750',
    initialHeight: '900',
      inputs: [
        {
          'inputName': 'url'
        }
      ],
    },
    salsah2: {
      type: 'salsah2',
      model: [],
      materialIcon: 'camera_enhance',
      initialWidth: '700',
      initialHeight: '1200',
      inputs: [
        {
          'inputName': 'url'
        }
      ],
    },
    raeber: {
      type: 'raeber',
      model: [],
      materialIcon: 'book',
      initialWidth: '900',
      initialHeight: '700',
      inputs: [
        {
          'inputName': 'url'
        }
      ],
    },
    primeEditor: {
      type: 'primeEditor',
      model: [],
      materialIcon: 'format_size',
      initialWidth: '700',
      initialHeight: '500',
      inputs: [
        {
          'inputName': 'textFile'
        }
      ],
    },
    spreadSheet: {
      type: 'spreadSheet',
      model: [],
      materialIcon: 'table_chart',
      initialWidth: '700',
      initialHeight: '600'
    },
    urlUpdate: {
      type: 'urlUpdate',
      model: [],
      materialIcon: 'horizontal_split',
      initialWidth: '200',
      initialHeight: '200'
    },
    keyValue: {
      type: 'keyValue',
      model: [],
      materialIcon: 'horizontal_split',
      initialWidth: '350',
      initialHeight: '100',
      inputs: [
        {
          'inputName': 'key'
        },
        {
          'inputName': 'value'
        }
      ],
    },
    pdfViewer: {
      type: 'pdfViewer',
      model: [],
      materialIcon: 'select_all',
      initialWidth: '700',
      initialHeight: '700',
      inputs: [
        {
          'inputName': 'source'
        },
        {
          'inputName': 'page'
        },
        {
          'inputName': 'pdfLength'
        }
      ],
    },
    browserling: {
      type: 'browserling',
      model: [],
      materialIcon: 'open_in_browser',
      initialWidth: '1000',
      initialHeight: '1000',
      inputs: [
        {
          'inputName': 'platform_name'
        },
        {
          'inputName': 'platform_version'
        },
        {
          'inputName': 'browser'
        },
        {
          'inputName': 'version'
        },
        {
          'inputName': 'url'
        },
        {
          'inputName': 'my_cursor'
        },
        {
          'inputName': 'idle_timeout'
        },
        {
          'inputName': 'session_timeout'
        },
        {
          'inputName': 'resolution'
        }
      ],
    }
  };
}
