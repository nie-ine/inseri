export class AppMenuModel {
  appMenu = [
    {
      id: 'aspect_ratio',
      name: 'HTML Viewer ',
      tags: 'html, css, plaintext ',
      color: 'green',
      status: 'stable',
      appType: 'htmlViewer',
      description: 'It displays HTML snippets and applies externally defined styles to the view.'
    },
    {
      id: 'short_text',
      name: 'Plaintext Viewer ',
      tags: 'plaintext, html without css ',
      color: 'green',
      status: 'stable',
      appType: 'textlistViewers',
      description: undefined
    },
    {
      id: 'line_style',
      name: 'SVG-Transcription',
      tags: 'diplomatic transcription, text',
      color: 'orange',
      status: 'under development',
      appType: 'svgTranscription',
      description: ' SVG transcription with exact word positions'
    },
    {
      id: 'view_week',
      name: 'Parzival - Fassung',
      tags: 'synopsis, text, version',
      color: 'green',
      status: 'stable',
      appType: 'parzivalFassung',
      description: 'Project specific App for the Parzival Project - Open more than one app of this type to test it!'
    },
    {
      id: 'turned_in',
      name: 'AVP-Edition',
      tags: 'synopsis, text, version',
      color: 'orange',
      status: 'under development',
      appType: 'avpEditionView',
      description: 'Project specific App for the AVP Project'
    },
    {
      id: 'album',
      name: 'OpenBis Login',
      tags: 'login, query, third party token',
      color: 'green',
      status: 'stable',
      appType: 'openbisLogin',
      description: 'Set token for OpenBis'
    },
    {
      id: 'image',
      name: 'Image Viewer',
      tags: 'image, zoom, iif',
      color: 'green',
      status: 'stable',
      appType: 'imageViewer',
      description: 'Display and zoom in images'
    },
    {
      id: 'add_photo_alternate',
      name: 'Simple Image App',
      tags: 'image',
      color: 'green',
      status: 'stable',
      appType: 'simpleImageApp',
      description: 'Display simple images'
    },
    {
      id: 'view_list',
      name: 'Data list viewer',
      tags: 'generic, list, configurable',
      color: 'green',
      status: 'stable',
      appType: 'dataListView',
      description: 'Display simple images'
    },
    {
      id: 'subdirectory_arrow_right',
      name: 'Tree navigation',
      tags: 'navigation',
      color: 'green',
      status: 'stable',
      appType: 'treeNavigation',
      description: ' This app can be combined with apps for resource view.'
    },
    {
      id: 'video_library',
      name: 'Youtube Video Viewer',
      tags: 'video',
      color: 'green',
      status: 'stable',
      appType: 'youtubeVideo',
      description: ' You can embed youtube - videos in this app.'
    },
    {
      id: 'art_track',
      name: 'Synopsis Viewer',
      tags: 'synopsis, light table',
      color: 'orange',
      status: 'under development',
      appType: 'synopsisViewer',
      description: 'Open and compare different images and text'
    },
    {
      id: 'spa',
      name: 'Json Viewer',
      tags: 'json tree',
      color: 'green',
      status: 'stable',
      appType: 'jsonViewer',
      description: 'This app visualizes json objects as a tree.'
    },
    {
      id: 'bar_chart',
      name: 'Bar Chart',
      tags: 'd3.js, interactive',
      color: 'orange',
      status: 'under development',
      appType: 'barCharts',
      description: 'To define data with two dimensions'
    },
    {
      id: 'show_chart',
      name: 'Line Chart',
      tags: 'd3.js, interactive',
      color: 'orange',
      status: 'under development',
      appType: 'lineCharts',
      description: 'To define data with two dimensions'
    },
    {
      id: 'insert_chart_outlined',
      name: 'Brush Zoom',
      tags: 'd3.js, interactive',
      color: 'orange',
      status: 'under development',
      appType: 'brushZoomCharts',
      description: 'To define data with two dimensions'
    },
    {
      id: 'add_location',
      name: 'Leaflet map',
      tags: 'geo data visualisation',
      color: 'orange',
      status: 'under development',
      appType: 'leafletMaps',
      description: 'Visualize data on maps'
    },
    {
      id: 'pie_chart',
      name: 'Pie Chart',
      tags: 'd3.js, data visualisation',
      color: 'orange',
      status: 'under development',
      appType: 'pieCharts',
      description: 'To visualise subsets'
    },
    {
      id: 'multiline_chart',
      name: 'Radial Bar Chart',
      tags: 'd3.js, data visualisation',
      color: 'orange',
      status: 'under development',
      appType: 'radialBarCharts',
      description: 'For two dimensional data'
    },
    {
      id: 'linear_scale',
      name: 'Sankey',
      tags: 'd3.js, data visualisation',
      color: 'orange',
      status: 'under development',
      appType: 'sankeyCharts',
      description: ' To display dependent data'
    },
    {
      id: 'subtitles',
      name: ' Stacked Bar Chart',
      tags: 'd3.js, data visualisation',
      color: 'orange',
      status: 'under development',
      appType: 'stackedBarCharts',
      description: 'To display grouped sets'
    },
    {
      id: 'all_out',
      name: 'Chord diagram',
      tags: 'd3.js, data visualisation',
      color: 'orange',
      status: 'under development',
      appType: 'chordDiagrams',
      description: 'To compare intensity of connections'
    },
    {
      id: 'add_to_queue',
      name: 'Resource Creation',
      tags: 'knora, data entry',
      color: 'orange',
      status: 'under development',
      appType: 'createResourceForm',
      description: 'With this app you can create data in Knora.'
    },
    {
      id: 'web',
      name: 'Edit Resource',
      tags: 'knora, data manipulation',
      color: 'orange',
      status: 'under development',
      appType: 'editResourceForm',
      description: 'With this app you can change data in Knora and see the history of given properties.'
    },
    {
      id: 'joined_text_view',
      name: 'Joined Text View',
      tags: 'knora, text, html',
      color: 'orange',
      status: 'under development',
      appType: 'joinedTextView',
      description: 'Map text resources to blocks, lines and words and show them as HTML'
    },
    {
      id: 'drag_indicator',
      name: 'Sparql - Visualiser',
      tags: 'sparql, rdf, rdfs, olw',
      color: 'green',
      status: 'stable',
      appType: 'sparqlVisualizer',
      description: 'Visualize Ontologies and RDF/RDFS/Owl data'
    },
    {
      id: 'camera_enhance',
      name: 'Salsah 2',
      tags: 'DaSCH',
      color: 'red',
      status: 'deprecated by the DaSCH',
      appType: 'salsah2',
      description: 'Predecessor of Kuirl / SUID'
    }
    ,
    {
      id: 'format_size',
      name: 'Text Editor',
      tags: 'primefaces, quill',
      color: 'green',
      status: 'stable',
      appType: 'primeEditor',
      description: 'Write and Save text on a page'
    }
  ];
}
