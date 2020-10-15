## Joined Text View

**Viewer for finely granulated text elements in Knora**

This text viewer displays text that has been divided into resources for blocks, lines, margins and even words. 
Given a root resource IRI (e.g. for a page), the Knora instance address and a JSON specification, the parts can be
re-constituted with individual requests and can be enriched with styles and events.

Inseri internal dependencies: RichTextModule

<!--
### Usage

Selector: `<app-joined-text-view>`

#### Needed inputs

- Address to your Knora instance:  
  `[backendAddress]`  

(IP and Port or URL, excluding parts like `/v1` or `/v2`)


- IRI of the root resource of your text:  
  `[textRootIri]` *or* `[queryParamForTextRootIri]`  
  The input through `textRootIri` is used for paging through results of a saved query. The `queryParamForTextRootIri`-way, 
  using a queryParam in the URL enables interaction with other apps.

- Definition of the tree structure:  
  `[textConfiguration]`


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


#### Inputs mapped through Inseri and not available to the data management:
- Synchronised behaviour when hovering over resources (two-way-binding):  
  `[(hoveredResource)]`  
  This property is the basis for visual highlighting of corresponding resources in different views.
 
-->
