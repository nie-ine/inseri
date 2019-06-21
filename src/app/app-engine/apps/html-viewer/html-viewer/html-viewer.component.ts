import { Component, Input, OnInit } from '@angular/core';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';
import { ActivatedRoute } from '@angular/router';

/**
 * This app wraps the text-rich-innerhtml component and governs its input.
 */
@Component({
  selector: 'app-html-viewer',
  templateUrl: './html-viewer.component.html',
  styleUrls: ['./html-viewer.component.scss']
})
export class HtmlViewerComponent implements OnInit {

  /**
   * The unsanitized HTML content.
   */
  @Input() htmlContent = '<div><p class="lorem">Lorem ipsum.</p><p class="dolor">Dolor sit amet.</p></div>';

  /**
   * Style declarations that are applied on init.
   */
  @Input() styleDeclarations: Array<StyleDeclaration> = [
    {
      'type': 'tag',
      'name': 'p',
      'styles': {
        'font-family': 'Times, serif',
        'text-align': 'justify'
      }
    },
    {
      'type': 'class',
      'name': 'lorem',
      'styles': {'font-weight': 'bold'}
    },
  ];

  /**
   * Dynamic style declarations.
   */
  @Input() selectiveStyleDeclarations: SelectableEnvironments = {
    'dolor': [
      {
        'type': 'class',
        'name': 'dolor',
        'styles': {'color': 'blue'},
      }
    ],
    'all': [
      {
        'type': 'class',
        'name': 'dolor',
        'styles': {'font-style': 'italic'}
      },
      {
        'type': 'class',
        'name': 'lorem',
        'styles': {'font-style': 'italic'}
      }
    ]
  };

  /**
   * Keys of selected selectiveStyleDeclarations.
   */
  highlighted: Array<string>;

  /**
   * Constructor initializes ActivatedRoute.
   * @param _route  Enables access to query parameters.
   */
  constructor(private _route: ActivatedRoute) { }

  /**
   * On initialization of this component, subscribe to query parameters in the URL.
   */
  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.highlighted = [].concat(params.style);
    });
  }




}
