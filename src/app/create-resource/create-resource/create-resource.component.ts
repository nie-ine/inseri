import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KnoraV1RequestService } from '../../shared/knora/knora-v1-request.service';

/**
 * Form to fill in the data of a resource and then create it on a running instance of Knora
 */
@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.scss']
})
export class CreateResourceComponent implements OnInit {

  /**
   * Vocabularies on an instance
   */
  vocabularies: Array<any>;

  /**
   * The vocabulary IRI, that the resource we want to create, belongs to.
   * @type {string}
   */
  selectedVocabulary = '';

  /**
   * The description for the vocabulary 'selectedVocabulary'
   * @type {string}
   */
  selectedVocabularyDescription = '';

  /**
   * The resource classes in 'selectedVocabulary'
   */
  resourceClasses: Array<any>;

  /**
   * The resource class IRI for the new resource
   * @type {string}
   */
  selectedResourceClass = '';

  /**
   * The description for the resource class in 'selectedResourceClass'
   */
  selectedResourceClassDescription = '';

  /**
   * The properties available for 'selectedResourceClass'
   */
  properties: Array<any>;

  /**
   * The used properties and their values for the new resource
   */
  selectedProperties: Array<any>;

  /**
   * Input for the select tag in the template
   * @type {string}
   */
  dropdownProperty = '';

  /**
   * The label of the new resource
   * @type {string}
   */
  resourceLabel = '';

  /**
   * Makes the select tag in the template appear or disappear depending in the values that should be set before
   * @type {boolean}
   */
  showPropertySelect = true;

  /**
   * each resource must belog to a project. Therefore have the project IRI as input.
   */
  @Input() projectIRI: string;

  /**
   * After the resource has been posted, the new IRI is given as output that it can be used in other parts of the program.
   * @type {EventEmitter<string>}
   */
  @Output() resourceIRI: EventEmitter<string> = new EventEmitter<string>();

  constructor(private knora1RequestService: KnoraV1RequestService) {
  }

  /**
   * Get all the instance's vocabularies on init
   */
  ngOnInit() {
    // get available vocabularies

    this.knora1RequestService.getVocabularies()
      .subscribe(
        res => this.vocabularies = res['vocabularies']
      );
  }

  /**
   * After selecting a vocabulary, get the corresponding resource classes.
   * Clear dependent data.
   */
  resetVocabulary() {
    // set selected vocabulary
    // get resource classes defined in this vocabulary
    // get description for this vocabulary
    // reset resource class and property data

    this.knora1RequestService.getResourcesOfVocabulary(this.selectedVocabulary)
      .subscribe(
        res => this.resourceClasses = res['resourcetypes']
      );

    for (const v of this.vocabularies) {
      if (v['uri'] === this.selectedVocabulary) {
        this.selectedVocabularyDescription = v['description'];
      }
    }

    this.selectedResourceClass = '';
    this.selectedResourceClassDescription = '';
    this.selectedProperties = [];
    this.resourceLabel = '';
  }

  /**
   * After selecting a resource class, get the resource class information, like description and available properties.
   * Clear dependent data.
   */
  resetResourceClass() {
    // get properties for this resource class
    // reset property data for this resource
    // get description for the selected resource class

    this.knora1RequestService.getResourceClass(this.selectedResourceClass)
      .subscribe(res => {
        this.properties = res['restype_info']['properties'];
        this.selectedResourceClassDescription = res['restype_info']['description'];
       });
    this.selectedProperties = [];
    this.resourceLabel = '';
  }

  /**
   * Adds a property to the selected properties and initialize with empty value.
   * @param {string} propertyIRI  The propertyIRI of a property that is added to the list to later be filled.
   */
  addProperty(propertyIRI: string) {
    // add property with selected property IRI to this new resource
    // save property description from Knora in 'structure' and initialize field 'value'
    // TODO: reset dropdown does not work - fix it

    let propertyStructure;

    if (propertyIRI !== '') {

        for (const p of this.properties) {
          if (p['id'] === propertyIRI) {
            propertyStructure = p;
          }
        }

        this.selectedProperties.push({'structure': propertyStructure, 'value': ''});
    }
    this.dropdownProperty = '';
  }

  /**
   * remove property at index index
   * @param {number} index  The place in the property data array that has to be deleted
   */
  deleteProperty(index: number) {
    this.selectedProperties.splice(index, 1);
  }

  /**
   * Set the value for a specific property (depending on its index)
   * @param newValue  The value of a yet unset property
   * @param {number} index  The place in the property data array where the new value is set
   */
  setValue(newValue, index: number) {
    this.selectedProperties[index]['value'] = newValue;
  }

  /**
   * Fill in the resource parameters for the new resource and send them to a post request.
   * Emits an event from the component if the post succeeded, containing the new IRI.
   */
  postResource() {
    // create JSON representation for this resource
    const resourceParams = {
      'restype_id': this.selectedResourceClass,
      'properties': { },
      'label': this.resourceLabel,
      'project_id': this.projectIRI
    };

    // add each property with its value to this JSON
    for (const p of this.selectedProperties) {
      try {
        resourceParams['properties'][p['structure']['id']].push(p['value']);
      } catch (e) {
        resourceParams['properties'][p['structure']['id']] = [p['value']];
      }
    }

    // post resource or log error
    // on success, give IRI as output of this component
    this.knora1RequestService.postResource(resourceParams)
      .subscribe(
      res => {
        this.resourceIRI.emit(res['res_id']);
      },
      err => {
        console.log(err);
      }
    );

  }

}
