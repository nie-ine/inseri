ImageFrameComponent and ImageFrameSizesComponent
================================================

Use both components together:

```html
<nie-image-frame-sizes (viewerWidthChange)="viewerWidth = $event">
  <nie-image-frame [image]="picData"
                   [width]="viewerWidth"
                   [height]="viewerWidth * picData2['knora-api:stillImageFileValueHasDimX'] / picData2['knora-api:stillImageFileValueHasDimX']">
  </nie-image-frame>
</nie-image-frame-sizes>
```

ImageFrameComponent can be used alone. Then the width and height hav to be set directly
```html
  <nie-image-frame [image]="picData"
                   width="100px"
                   height="100px">
  </nie-image-frame>
```

Dependencies
------------

In package.json include the dependency:

    `"openseadragon": "^2.3.1"`

In .angular-cli.json under apps.scripts add

    `"../node_modules/openseadragon/build/openseadragon/openseadragon.min.js",`

Input variables
---------------

width: number (initiate for example with width = 100; in your project)

height: number

image: a picture object in Knora v2 format

    ```
    {
        '@id' : 'http://rdfh.ch/kuno-raeber/Uzo2YDhzTr-8CUSg1pQL4Q/values/gJVf-AQjSbSTAo8EsU8ErQ',
        '@type' : 'knora-api:StillImageFileValue',
        'knora-api:fileValueAsUrl' : 'https://tools.wmflabs.org/zoomviewer/proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg/pct:65,81,35,15/full/0/default.jpg',
        'knora-api:fileValueHasFilename' : 'proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg',
        'knora-api:fileValueIsPreview' : false,
        'knora-api:stillImageFileValueHasDimX' : 5184,
        'knora-api:stillImageFileValueHasDimY' : 3456,
        'knora-api:stillImageFileValueHasIIIFBaseUrl' : 'https://tools.wmflabs.org/zoomviewer'
      }
    ```
