export class AppMenuModel {
  appMenu = [    {
      id: 'lock_open',
      name: 'Login | Sign up',
      tags: 'for an inseri account',
      color: 'green',
      status: 'stable',
      appType: 'login',
      description: 'Login or create an account',
      showOnHome: true
    },
    {
      id: 'aspect_ratio',
      name: 'HTML Viewer ',
      tags: 'html, css, plaintext ',
      color: 'green',
      status: 'stable',
      appType: 'htmlViewer',
      description: 'It displays HTML snippets and applies externally defined styles to the view.',
      showOnHome: false
    },
    {
      id: 'audiotrack',
      name: 'Audio Payer',
      tags: 'wav, mp3, etc',
      color: 'green',
      status: 'stable',
      appType: 'audioPlayer',
      description: 'Play your audiofiles',
      showOnHome: false
    },
    {
      id: 'folder',
      name: 'My Files',
      tags: 'files, folders and queries',
      color: 'yellow',
      status: 'under development',
      appType: 'myFiles',
      description: 'files, folders and queries',
      showOnHome: false
    },
    {
      id: 'short_text',
      name: 'Plaintext Viewer ',
      tags: 'plaintext, html without css ',
      color: 'green',
      status: 'stable',
      appType: 'textlistViewers',
      description: undefined,
      showOnHome: false
    },
    {
      id: 'format_paint',
      name: 'PaintCanvas',
      tags: 'draw your notes',
      color: 'green',
      status: 'stable',
      appType: 'paint',
      description: undefined,
      showOnHome: true
    },
    {
      id: 'line_style',
      name: 'SVG-Transcription',
      tags: 'diplomatic transcription, text',
      color: 'orange',
      status: 'under development',
      appType: 'svgTranscription',
      description: ' SVG transcription with exact word positions',
      showOnHome: false
    },
    {
      id: 'view_week',
      name: 'Parzival - Fassung',
      tags: 'synopsis, text, version',
      color: 'green',
      status: 'stable',
      appType: 'parzivalFassung',
      description: 'Project specific App for the Parzival Project - Open more than one app of this type to test it!',
      showOnHome: false
    },
    {
      id: 'turned_in',
      name: 'AVP-Edition',
      tags: 'synopsis, text, version',
      color: 'orange',
      status: 'under development',
      appType: 'avpEditionView',
      description: 'Project specific App for the AVP Project',
      showOnHome: false
    },
    {
      id: 'album',
      name: 'OpenBis Login',
      tags: 'login, query, third party token',
      color: 'green',
      status: 'stable',
      appType: 'openbisLogin',
      description: 'Set token for OpenBis',
      showOnHome: false
    },
    {
      id: 'image',
      name: 'Image Viewer',
      tags: 'image, zoom, iif',
      color: 'green',
      status: 'stable',
      appType: 'imageViewer',
      description: 'Display and zoom in images',
      showOnHome: false
    },
    {
      id: 'add_photo_alternate',
      name: 'Simple Image App',
      tags: 'image',
      color: 'green',
      status: 'stable',
      appType: 'simpleImageApp',
      description: 'Display simple images',
      showOnHome: false
    },
    {
      id: 'view_list',
      name: 'Data list viewer',
      tags: 'generic, list, configurable',
      color: 'green',
      status: 'stable',
      appType: 'dataListView',
      description: 'Display simple images',
      showOnHome: false
    },
    {
      id: 'subdirectory_arrow_right',
      name: 'Tree navigation',
      tags: 'navigation',
      color: 'green',
      status: 'stable',
      appType: 'treeNavigation',
      description: ' This app can be combined with apps for resource view.',
      showOnHome: false
    },
    {
      id: 'video_library',
      name: 'Youtube Video Viewer',
      tags: 'video',
      color: 'green',
      status: 'stable',
      appType: 'youtubeVideo',
      description: ' You can embed youtube - videos in this app.',
      showOnHome: true
    },
    {
      id: 'art_track',
      name: 'Synopsis Viewer',
      tags: 'synopsis, light table',
      color: 'orange',
      status: 'under development',
      appType: 'synopsisViewer',
      description: 'Open and compare different images and text',
      showOnHome: false
    },
    {
      id: 'spa',
      name: 'Json Viewer',
      tags: 'json tree',
      color: 'green',
      status: 'stable',
      appType: 'jsonViewer',
      description: 'This app visualizes json objects as a tree.',
      showOnHome: false
    },
    {
      id: 'bar_chart',
      name: 'Bar Chart',
      tags: 'd3.js, interactive',
      color: 'orange',
      status: 'under development',
      appType: 'barCharts',
      description: 'To define data with two dimensions',
      showOnHome: false
    },
    {
      id: 'show_chart',
      name: 'Line Chart',
      tags: 'd3.js, interactive',
      color: 'orange',
      status: 'under development',
      appType: 'lineCharts',
      description: 'To define data with two dimensions',
      showOnHome: false
    },
    {
      id: 'insert_chart_outlined',
      name: 'Brush Zoom',
      tags: 'd3.js, interactive',
      color: 'orange',
      status: 'under development',
      appType: 'brushZoomCharts',
      description: 'To define data with two dimensions',
      showOnHome: false
    },
    {
      id: 'add_location',
      name: 'Leaflet map',
      tags: 'geo data visualisation',
      color: 'orange',
      status: 'under development',
      appType: 'leafletMaps',
      description: 'Visualize data on maps',
      showOnHome: false
    },
    {
      id: 'pie_chart',
      name: 'Pie Chart',
      tags: 'd3.js, data visualisation',
      color: 'orange',
      status: 'under development',
      appType: 'pieCharts',
      description: 'To visualise subsets',
      showOnHome: false
    },
    {
      id: 'multiline_chart',
      name: 'Radial Bar Chart',
      tags: 'd3.js, data visualisation',
      color: 'orange',
      status: 'under development',
      appType: 'radialBarCharts',
      description: 'For two dimensional data',
      showOnHome: false
    },
    {
      id: 'linear_scale',
      name: 'Sankey',
      tags: 'd3.js, data visualisation',
      color: 'orange',
      status: 'under development',
      appType: 'sankeyCharts',
      description: ' To display dependent data',
      showOnHome: false
    },
    {
      id: 'subtitles',
      name: ' Stacked Bar Chart',
      tags: 'd3.js, data visualisation',
      color: 'orange',
      status: 'under development',
      appType: 'stackedBarCharts',
      description: 'To display grouped sets',
      showOnHome: false
    },
    {
      id: 'all_out',
      name: 'Chord diagram',
      tags: 'd3.js, data visualisation',
      color: 'orange',
      status: 'under development',
      appType: 'chordDiagrams',
      description: 'To compare intensity of connections',
      showOnHome: false
    },
    {
      id: 'add_to_queue',
      name: 'Resource Creation',
      tags: 'knora, data entry',
      color: 'orange',
      status: 'under development',
      appType: 'createResourceForm',
      description: 'With this app you can create data in Knora.',
      showOnHome: false
    },
    {
      id: 'web',
      name: 'Edit Resource',
      tags: 'knora, data manipulation',
      color: 'orange',
      status: 'under development',
      appType: 'editResourceForm',
      description: 'With this app you can change data in Knora and see the history of given properties.',
      showOnHome: false
    },
    {
      id: 'web',
      name: 'Nested Resource Viewer',
      tags: 'knora',
      color: 'orange',
      status: 'under development',
      appType: 'knoraV2viewer',
      description: 'With this app you can easily look at a Knora resource.',
      showOnHome: false
    },
    {
      id: 'aspect_ratio',
      name: 'Joined Text View',
      tags: 'knora, text, html',
      color: 'orange',
      status: 'under development',
      appType: 'joinedTextView',
      description: 'Map text resources to blocks, lines and words and show them as HTML',
      showOnHome: false
    },
    {
      id: 'drag_indicator',
      name: 'Sparql - Visualiser',
      tags: 'sparql, rdf, rdfs, owl',
      color: 'green',
      status: 'stable',
      appType: 'sparqlVisualizer',
      description: 'Visualize Ontologies and RDF/RDFS/Owl data',
      showOnHome: true
    },
    {
      id: 'camera_enhance',
      name: 'Salsah 2',
      tags: 'DaSCH',
      color: 'orange',
      status: 'deprecated',
      appType: 'salsah2',
      description: 'Predecessor of Kuirl / SUID',
      showOnHome: true
    }
    ,
    {
      id: 'format_size',
      name: 'Text Editor',
      tags: 'primefaces, quill',
      color: 'green',
      status: 'stable',
      appType: 'primeEditor',
      description: 'Write and Save text on a page',
      showOnHome: true
    },
    {
      id: 'subdirectory_arrow_right',
      name: 'Hierarchical navigation with dynamic loading',
      tags: 'knora, navigation',
      color: 'orange',
      status: 'under development',
      appType: 'hierarchicalNavigationView',
      description: 'Map resources in a graph to a navigation tree.',
      showOnHome: false
    },
    {
      id: 'table_chart',
      name: 'Spreadsheet',
      tags: 'spreadsheet you will love',
      color: 'orange',
      status: 'under development',
      appType: 'spreadSheet',
      description: 'Your spreadsheet',
      showOnHome: true
    },
    {
      id: 'book',
      name: 'Anton Webern Gesamtausgabe',
      tags: 'Anton Webern',
      color: 'green',
      status: 'stable',
      appType: 'webern',
      description: 'Anton Webern App',
      showOnHome: true
    },
    {
      id: 'book',
      name: 'iframe',
      tags: 'iframe',
      color: 'green',
      status: 'stable',
      appType: 'iframe',
      description: 'iframe',
      showOnHome: false
    },
    {
      id: 'book',
      name: 'Kuno Raeber Online Edition',
      tags: 'raeber',
      color: 'green',
      status: 'stable',
      appType: 'raeber',
      description: 'raeber app',
      showOnHome: true
    },
    {
      id: 'horizontal_split',
      name: 'Url update app',
      tags: 'url',
      color: 'green',
      status: 'stable',
      appType: 'urlUpdate',
      description: 'urlUpdate',
      showOnHome: false
    },
    {
      id: 'horizontal_split',
      name: 'pdf viewer',
      tags: 'pdf',
      color: 'green',
      status: 'stable',
      appType: 'pdfViewer',
      description: 'pdfViewer',
      showOnHome: false
    },
    {
      id: 'select_all',
      name: 'Key Value',
      tags: 'key value',
      color: 'green',
      status: 'stable',
      appType: 'keyValue',
      description: 'keyValue',
      showOnHome: false
    },
    {
      id: 'open_in_browser',
      name: 'Browserling',
      tags: 'browser virtualisation',
      color: 'green',
      status: 'stable',
      appType: 'browserling',
      description: 'browserling',
      showOnHome: false
    },
    {
      id: 'book',
      name: 'GND Subscriber',
      tags: 'gnd url param subscriber',
      color: 'green',
      status: 'stable',
      appType: 'gndSubscriber',
      description: 'gnd',
      showOnHome: false
    },
    {
      id: 'leak_add',
      name: 'Url Param Updater',
      tags: 'generic url updater',
      color: 'red',
      status: 'under development',
      appType: 'urlParamUpdater',
      description: 'gnd',
      showOnHome: false
    }
  ];
}
