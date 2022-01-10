import {environment} from '../../../../environments/environment';
import { Injectable } from "@angular/core";

@Injectable()
export class OpenAppsModel {
  openApps = {
    imageViewer: {
      type: 'imageViewer',
      model: [],
      inputs: [
        {
          'inputName': 'fileValueAsUrl',
          default: 'https://www.e-manuscripta.ch/zuz/i3f/v20/1510618/full/full/0/default.jpg'
        },
        {
          'inputName': 'stillImageFileValueHasDimX',
          default: 3062
        },
        {
          'inputName': 'stillImageFileValueHasDimY',
          default: 4034
        }
      ],
      materialIcon: 'image',
      initialWidth: '800',
      initialHeight: '500',
      description: 'https://github.com/nie-ine/inseri/tree/devel/Tutorials/App ' +
        'descriptions for Researchers/Apps to visualise data/Image Viewer/README.md'
    },
    textViewer: {
      type: 'textViewer',
      model: [],
      materialIcon: 'short_text',
      initialWidth: '600',
      initialHeight: '400'
    },
    demoApp: {
      type: 'demoApp',
      model: [],
      inputs: [
        {
          'inputName': 'ourTestInput',
          default: 'ourdefineddefaultInput'
        }
      ],
      materialIcon: 'short_text',
      initialWidth: '600',
      initialHeight: '400'
    },
    matCard: {
      type: 'matCard',
      model: [],
      inputs: [
        {
          'inputName': 'backgroundImage',
          default: 'https://material.angular.io/assets/img/examples/shiba1.jpg'
        },
        {
          'inputName': 'myTitle',
          default: 'Shiba Inu'
        },
        {
          'inputName': 'subtitle',
          default: 'Dog Breed'
        },
        {
          'inputName': 'image',
          default: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
        },
        {
          'inputName': 'myDescription',
          default: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.\n' +
            '      A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally\n' +
            '      bred for hunting.'
        },
        {
          'inputName': 'mylink',
          default: 'http://inseri.swiss/'
        },
        {
          'inputName': 'buttonDescription',
          default: 'Explore site'
        },
      ],
      materialIcon: 'label',
      initialWidth: '450',
      initialHeight: '450'
    },
    ourDemoApp: {
      type: 'ourDemoApp',
      model: [],
      materialIcon: 'short_text',
      initialWidth: '600',
      initialHeight: '400',
      inputs: [
        {
          'inputName': 'demoText',
          default: 'Hi, this is the default text'
        }
      ],
    },
    machineReasoning: {
      type: 'machineReasoning',
      model: [],
      materialIcon: 'blur_on',
      initialWidth: '600',
      initialHeight: '800',
      fullWidth: true,
      description: 'https://github.com/nie-ine/inseri/tree/devel/Tutorials/App ' +
        'descriptions for Researchers/Apps to use microservices/Machine Reasoning/README.md'
    },
    crispr: {
      type: 'crispr',
      model: [],
      materialIcon: 'view_week',
      initialWidth: '600',
      initialHeight: '400',
      inputs: [
        {
          'inputName': 'crisprMicroserviceAddress',
          default: 'http://172.23.39.73:4321'
        }
      ],
    },
    commentOnIndices: {
      type: 'commentOnIndices',
      model: [],
      materialIcon: 'speaker_notes',
      initialWidth: '400',
      initialHeight: '400',
      inputs: [
        {
          'inputName': 'textFile',
          default: ''
        }
      ],
    },
    myFiles: {
      type: 'myFiles',
      model: [],
      materialIcon: 'menu',
      initialWidth: '450',
      initialHeight: '600',
      inputs: [
        {
          'inputName': 'folderPath',
          default: undefined
        }
      ],
    },
    urlParamUpdater: {
      type: 'urlParamUpdater',
      model: [],
      inputs: [
        {
          'inputName': 'param',
          default: 'defaultParam'
        },
        {
          'inputName': 'textFile',
          default: 'Please paste variable here and click save afterwards'
        }
      ],
      materialIcon: 'menu',
      initialWidth: '375',
      initialHeight: '100',
      fullWidth: true,
    },
    openbisLogin: {
      type: 'openbisLogin',
      model: [],
      materialIcon: 'album',
      initialWidth: '375',
      initialHeight: '350'
    },
    searchViewer: {
      type: 'searchViewer',
      model: [],
      materialIcon: 'album',
      initialWidth: '375',
      initialHeight: '350'
    },
    grapesJSViewer: {
      type: 'grapesJSViewer',
      model: [],
      materialIcon: 'album',
      initialWidth: '375',
      initialHeight: '350'
    },
    synopsisViewer: {
      type: 'synopsisViewer',
      model: [],
      materialIcon: 'art_track',
      initialWidth: '375',
      initialHeight: '350'
    },
    gndSubscriber: {
      type: 'gndSubscriber',
      model: [],
      materialIcon: 'book',
      initialWidth: '375',
      initialHeight: '350'
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
      initialWidth: '375',
      initialHeight: '350'
    },
    dataChooser: {
      type: 'dataChooser',
      model: [],
      materialIcon: 'web',
      initialWidth: '375',
      initialHeight: '350'
    },
    textlistViewers: {
      type: 'textlistViewers',
      model: [],
      inputs: [
        {
          'inputName': 'textlist',
          default: 'this is an app to visualize html'
        }
      ],
      materialIcon: 'short_text',
      initialWidth: '250',
      initialHeight: '150',
      description: 'https://github.com/nie-ine/inseri/tree/devel/Tutorials/...'
    },
    calendar: {
      type: 'calendar',
      model: [],
      inputs: [
        {
          'inputName': 'calendarData',
          default: 'this is an app for a calendar'
        }
      ],
      materialIcon: 'calendar_today',
      initialWidth: '400',
      initialHeight: '400'
    },
    jsonEnvironment: { // This is the old name of the now called pythonEnvironment
      type: 'jsonEnvironment',
      model: [],
      inputs: [
        {
          'inputName': 'assignedJson'
        },
        {
          'inputName': 'pythonFile',
          default: '# Your python 3 code goes here\n' +
            'import json\n' +
            '\n' +
            'def show_message(json_file):\n' +
            '    with open(json_file, \'r\') as f:\n' +
            '        content = json.load(f)\n' +
            '\n' +
            '    return content\n' +
            '\n' +
            'if __name__ == "__main__":\n' +
            '    print(show_message("yourData.json"))'
        }
      ],
      materialIcon: 'input',
      initialWidth: '800',
      initialHeight: '350'
    },
    audioPlayer: {
      type: 'audioPlayer',
      model: [],
      inputs: [
        {
          'inputName': 'audioURL',
          default: 'https://www.dl.dropboxusercontent.com' +
            '/s/xu94g81pb6czpqm/' +
            '7.%20Schubert%20-%203%20Piano%20Pieces%20D.946%20No%201%20-%20Allegro%20Assai%20E%20flat%20minor.wav?dl=0'
        }
      ],
      materialIcon: 'audiotrack',
      initialWidth: '375',
      initialHeight: '350'
    },
    paint: {
      type: 'paint',
      model: [],
      inputs: [
        {
          'inputName': 'textFile',
          default: {}
        }
      ],
      materialIcon: 'format_paint',
      initialWidth: '800',
      initialHeight: '500'
    },
    youtubeVideo: {
      type: 'youtubeVideo',
      model: [],
      inputs: [
        {
          'inputName': 'videoURL',
          default: 'https://www.youtube.com/embed/9An1cGPrv9Q'
        }
      ],
      materialIcon: 'video_library',
      initialWidth: '375',
      initialHeight: '350'
    },
    barCharts: {
      type: 'barCharts',
      model: [],
      materialIcon: 'bar_chart',
      initialWidth: '600',
      initialHeight: '350',
      description: 'https://github.com/nie-ine/inseri/tree/devel/Tutorials/App%20descriptions%20for%20Researchers/Apps%20to%20visualise%20data/Bar%20Chart',
      inputs: [
        {
          'inputName': 'data',
          default: {
            data: [
              {
                'label': 'Aa',
                'value': 0.3
              },
              {
                'label': 'Bb',
                'value': 0.6
              },
              {
                'label': 'Cc',
                'value': 0.9
              },
              {
                'label': 'Dd',
                'value': 1.2
              }
            ]
          }
        }
      ],
    },
    groupedBarChartV2: {
      type: 'groupedBarChartV2',
      model: [],
      materialIcon: 'bar_chart',
      initialWidth: '600',
      initialHeight: '800',
      fullWidth: true,
      description: 'https://github.com/nie-ine/inseri/tree/devel/Tutorials/App ' +
        'descriptions for Researchers/Apps to use microservices/Grouped Bar Chart/README.md',
      inputs: [
        {
          'inputName': 'data',
          default: {
            data: [
              {
                'label': 'Verse 1',
                'before 1800': 0,
                '1800-1805': 5,
                '1806-1813': 1,
                '1814-1850': 1,
                '1851 and after': 0
              },
              {
                'label': 'Verse 2',
                'before 1800': 0,
                '1800-1805': 5,
                '1806-1813': 1,
                '1814-1850': 1,
                '1851 and after': 0
              },
              {
                'label': 'Verse 3',
                'before 1800': 0,
                '1800-1805': 6,
                '1806-1813': 1,
                '1814-1850': 4,
                '1851 and after': 0
              },
              {
                'label': 'Verse 4',
                'before 1800': 0,
                '1800-1805': 6,
                '1806-1813': 1,
                '1814-1850': 4,
                '1851 and after': 0
              }
            ]
          }
        }
      ],
    },
    spiralBarCharts: {
      type: 'spiralBarCharts',
      model: [],
      materialIcon: 'bar_chart',
      initialWidth: '375',
      initialHeight: '350'
    },
    lineCharts: {
      type: 'lineCharts',
      model: [],
      materialIcon: 'show_chart',
      initialWidth: '375',
      initialHeight: '350'
    },
    brushZoomCharts: {
      type: 'brushZoomCharts',
      model: [],
      materialIcon: 'insert_chart_outlined',
      initialWidth: '375',
      initialHeight: '350'
    },
    leafletMaps: {
      type: 'leafletMaps',
      model: [],
      materialIcon: 'add_location',
      initialWidth: '375',
      initialHeight: '350'
    },
    pieCharts: {
      type: 'pieCharts',
      model: [],
      materialIcon: 'pie_chart',
      initialWidth: '375',
      initialHeight: '350',
      description: 'https://github.com/nie-ine/inseri/tree/devel/Tutorials/App ' +
        'descriptions for Researchers/Apps to use microservices/Pie Chart/README.md',
      inputs: [
        {
          'inputName': 'data',
          default: {
            'data': [
              {
                'label': 'Part One',
                'value': 12
              },
              {
                'label': 'Part Two',
                'value': 5
              },
              {
                'label': 'Part Three',
                'value': 7
              },
              {
                'label': 'Part Four',
                'value': 6
              }
            ]
          }
        }
      ],
    },
    pieChartsV2: {
      type: 'pieChartsV2',
      model: [],
      materialIcon: 'pie_chart',
      initialWidth: '375',
      initialHeight: '600',
      fullWidth: true,
      description: 'https://github.com/nie-ine/inseri/tree/devel/Tutorials/App ' +
        'descriptions for Researchers/Apps to use microservices/Pie Chart V2/README.md',
      inputs: [
        {
          'inputName': 'data',
          default: {
            'data': [
              {
                'label': 'Man of letters',
                'value': 4451
              },
              {
                'label': 'Scientist/vulgarizer',
                'value': 865
              },
              {
                'label': 'Artist',
                'value': 36
              },
              {
                'label': 'Other',
                'value': 293
              }
            ]
          }
        }
      ],
    },
    radialBarCharts: {
      type: 'radialBarCharts',
      model: [],
      materialIcon: 'multiline_chart',
      initialWidth: '375',
      initialHeight: '350',
      description: 'https://github.com/nie-ine/inseri/tree/devel/Tutorials/App ' +
        'descriptions for Researchers/Apps to use microservices/Radial Bar Chart/README.md',
      inputs: [
        {
          'inputName': 'data',
          default: {
            'data': [
              {
                'label': '1',
                'value': 20
              },
              {
                'label': '2',
                'value': 40
              },
              {
                'label': '3',
                'value': 30
              },
              {
                'label': '4',
                'value': 50
              },
              {
                'label': '5',
                'value': 40
              },
              {
                'label': '6',
                'value': 60
              },
              {
                'label': '7',
                'value': 50
              }
            ]
          }
        }
      ],
    },
    sankeyCharts: {
      type: 'sankeyCharts',
      model: [],
      materialIcon: 'linear_scale',
      initialWidth: '375',
      initialHeight: '350',
      inputs: [
        {
          'inputName': 'data',
          default: {
            'data': {
              nodes: [{
                nodeId: 0,
                name: 'node0'
              }, {
                nodeId: 1,
                name: 'node1'
              }, {
                nodeId: 2,
                name: 'node2'
              }, {
                nodeId: 3,
                name: 'node3'
              }, {
                nodeId: 4,
                name: 'node4'
              }],
              links: [{
                source: 0,
                target: 2,
                value: 2,
                uom: 'Widget(s)'
              }, {
                source: 1,
                target: 2,
                value: 2,
                uom: 'Widget(s)'
              }, {
                source: 1,
                target: 3,
                value: 2,
                uom: 'Widget(s)'
              }, {
                source: 0,
                target: 4,
                value: 2,
                uom: 'Widget(s)'
              }, {
                source: 2,
                target: 3,
                value: 2,
                uom: 'Widget(s)'
              }, {
                source: 2,
                target: 4,
                value: 2,
                uom: 'Widget(s)'
              }, {
                source: 3,
                target: 4,
                value: 4,
                uom: 'Widget(s)'
              }]
            }
          }
        }
      ]
    },
    stackedBarCharts: {
      type: 'stackedBarCharts',
      model: [],
      materialIcon: 'subtitles',
      initialWidth: '700',
      initialHeight: '400',
      description: 'https://github.com/nie-ine/inseri/tree/devel/Tutorials/App ' +
        'descriptions for Researchers/Apps to use microservices/Stacked Bar Chart/README.md',
      inputs: [
        {
          'inputName': 'data',
          default: {
            'data': [
              {
                'label': 'Verse 1',
                'Before 1350': 2,
                '1350-1813': 3,
                '1814-1850': 1,
                '1851 and later': 8
              },
              {
                'label': 'Verse 2',
                'Before 1350': 4,
                '1350-1813': 3,
                '1814-1850': 1,
                '1851 and later': 4
              },
              {
                'label': 'Verse 3',
                'Before 1350': 11,
                '1350-1813': 3,
                '1814-1850': 3,
                '1851 and later': 4
              },
              {
                'label': 'Verse 4',
                'Before 1350': 1,
                '1350-1813': 3,
                '1814-1850': 3,
                '1851 and later': 9
              },
              {
                'label': 'Verse 5',
                'Before 1350': 7,
                '1350-1813': 4,
                '1814-1850': 3,
                '1851 and later': 10
              },
              {
                'label': 'Verse 6',
                'Before 1350': 4,
                '1350-1813': 3,
                '1814-1850': 3,
                '1851 and later': 8
              }
            ]
          }
        }
      ],
    },
    chordDiagrams: {
      type: 'chordDiagrams',
      model: [],
      materialIcon: 'all_out',
      initialWidth: '375',
      initialHeight: '350'
    },
    simpleImageApp: {
      type: 'simpleImageApp',
      model: [],
      inputs: [
          {
            'inputName': 'imageURL',
            default: environment.app + '/assets/img/logo_transparent.png'
          }
        ],
      materialIcon: 'add_photo_alternate',
      initialWidth: '800',
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
      initialWidth: '375',
      initialHeight: '350'
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
      initialWidth: '375',
      initialHeight: '350',
      description: 'https://github.com/nie-ine/inseri/tree/devel/Tutorials/App descriptions for Researchers/Apps to visualise data/Tree Navigation/README.md'
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
      initialWidth: '375',
      initialHeight: '350',
      description: 'https://github.com/nie-ine/inseri/tree/devel/Tutorials/App descriptions for Researchers/Apps to visualise data/Hierarchical Navigation/README.md'
    },
    dataListView: {
      type: 'dataListView',
      model: [],
      inputs: [
        {
          'inputName': 'json',
        },
        {
          'inputName': 'showSettings',
          default: false
        },

        {
          'inputName': 'settings',
          default:   {
            'inputMode': 'input',
            'jsonType': 'any',
            'pathToDataArray': '',
            'columns': {
              'manualColumns': false,
              'columnMapping': [],
              'stickyColumn': 0
            },
            'filter': {
              'showFilter': true,
              'caseSensitive': false
            },
            'paginator': {
              'paginate': true,
              'pageIndex': '0',
              'pageSize': '10',
              'pageSizeOptions': [
                5,
                10,
                25,
                50,
                100,
                250
              ]
            },
            'export': {
              'showExport': true
            },
            'sort': {
              'disallowSorting': false
            }
          }
        }
      ],
      materialIcon: 'view_list',
      initialWidth: '375',
      initialHeight: '500',
      fullWidth: true,
      fullHeight: true
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
      initialWidth: '375',
      initialHeight: '350'
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
      initialWidth: '375',
      initialHeight: '350'
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
      initialWidth: '375',
      initialHeight: '350'
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
      initialWidth: '800',
      initialHeight: '500',
      description: 'https://github.com/nie-ine/inseri/tree/devel/Tutorials/App descriptions for Researchers/Apps to visualise data/HTML Viewer/README.md'
    },
    login: {
      type: 'login',
      model: [],
      materialIcon: 'lock_open',
      initialWidth: '450',
      initialHeight: '450'
    },
    pageMenu: {
      type: 'pageMenu',
      model: [],
      materialIcon: 'menu',
      initialWidth: '450',
      initialHeight: '450'
    },
    sparqlVisualizer: {
      type: 'sparqlVisualizer',
      model: [],
      materialIcon: 'drag_indicator',
    initialWidth: '375',
    initialHeight: '350',
    fullWidth: true,
    fullHeight: true,
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
      initialWidth: '375',
      initialHeight: '350',
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
      initialWidth: '375',
      initialHeight: '350',
      inputs: [
        {
          'inputName': 'url'
        }
      ],
    },
  webern: {
    type: 'webern',
    model: [],
    materialIcon: 'book',
    initialWidth: '375',
    initialHeight: '350',
    inputs: [
      {
        'inputName': 'url'
      }
      ],
  },
    iframe: {
      type: 'iframe',
      model: [],
      materialIcon: 'book',
      initialWidth: '375',
      initialHeight: '350',
      inputs: [
        {
          'inputName': 'url',
          default: 'https://inseri.swiss'
        }
      ],
    },
    primeEditor: {
      type: 'primeEditor',
      model: [],
      materialIcon: 'format_size',
      initialWidth: '800',
      initialHeight: '500',
      inputs: [
        {
          'inputName': 'textFile',
          default: ''
        }
      ],
    },
    spreadSheet: {
      type: 'spreadSheet',
      model: [],
      materialIcon: 'table_chart',
      initialWidth: '800',
      initialHeight: '500'
    },
    urlUpdate: {
      type: 'urlUpdate',
      model: [],
      materialIcon: 'horizontal_split',
      initialWidth: '375',
      initialHeight: '350'
    },
    keyValue: {
      type: 'keyValue',
      model: [],
      materialIcon: 'horizontal_split',
      initialWidth: '375',
      initialHeight: '350',
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
      initialWidth: '375',
      initialHeight: '350',
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
      initialWidth: '375',
      initialHeight: '350',
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
