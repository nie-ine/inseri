## HTML Viewer

The HTML viewer app displays HTML text from a backend source and offers dynamic styling depending on query parameters in the URL.
This means that through another app that changes the query parameter `style`, 

<!--
### Usage

Selector: `<app-html-viewer>`

#### Needed inputs

- The HTML content:  
  `[htmlContent]`


#### Optional Inputs

Styles (from RichTextView)

- Default style declarations  
  `styleDeclarations`
  Example:  
  ```json
  [
    {
      "type": "tag",
      "name": "p",
      "background-color" : "black;"
    },
    {
      "type": "class",
      "name": "class-name-used-in-html-from-backend",
      "color": "red;"
    }
  ]  
  ```
  
- Style declarations by query parameter keys from the URL  
  `selectiveStyleDeclarations`  
  As `styleDeclarations` but for several values of the query parameter `style`

-->
