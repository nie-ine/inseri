import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KnoraV1RequestService } from '../../../../query-engine/knora/knora-v1-request.service';

/**
 * A form to display the label and property values of a resource.
 * An editing mode enables adding, changing and deleting property values and also deleting the resource.
 */
@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent implements OnInit {

  /**
   * The IRI of the resource that has to be displayed or chaned
   */
  @Input() resourceIRI: string;

  /**
   * Enables the editing mode in the component
   */
  @Input() editRights: boolean;

  /**
   * Emit an event if the resource is deleted. This enables closing the form and similar.
   * @type {EventEmitter<any>}
   */
  @Output() resourceIsDeleted: EventEmitter<any> = new EventEmitter();

  /**
   * Array of the properties possible for the resource class corresponding to the resourceIRI
   */
  propKeys: Array<string>;

  /**
   * Copy of resourceIRI if that should change.
   */
  stableResourceIRI: string;

  /**
   * The propertyTypeIRI or the valueIRI or 'label' for the field whose input is possible and stored in focusedValueContent
   * @type {string}
   */
  focusedValue = '';

  /**
   * The content of the active input field.
   */
  focusedValueContent: any;

  /**
   * List of ValueIRIs whose history is shown
   */
  valuesWithShownHistory: Set<string> = new Set();

  /**
   * The data of the resource of this component, corresponds to resourceIRI resp. stableResourceIRI
   */
  resource: any;

  constructor(private knoraV1RequestService: KnoraV1RequestService) {
  }

  /**
   * Get data of resource on init
   */
  ngOnInit() {
    this.getResourceData();
  }

  /**
   * Get the data of the resource and the possible properties' propertyTypeIRIs
   */
  getResourceData() {

    if (this.resourceIRI) {
      this.knoraV1RequestService.getResource(this.resourceIRI)
        .subscribe(res => {
            this.resource = res;
            this.propKeys = Object.keys(this.resource['props']);
          },
          err => {
            console.log(err);
          });
      this.stableResourceIRI = this.resourceIRI;
    }
  }

  /**
   *
   * @param {string} id  Depending on the field a propertyTypeIRI (adding), a valueIRI (changing or deleting) or 'label'
   * @param content  Reset the content for this property
   */
  activateValue(id: string, content) {
    this.focusedValue = id;
    this.focusedValueContent = content;
  }

  /**
   * Manually update the content for the focused property field
   * @param newValue  The value for a property in Knora's Json format
   */
  setValue(newValue) {
    this.focusedValueContent = newValue;
  }

  /**
   * Reset the label of a property, afterwards reload data
   */
  resetLabel() {
    const resourceParams = {'label': this.focusedValueContent};

    // put label or log error
    this.knoraV1RequestService.changeResourceLabel(this.stableResourceIRI, resourceParams)
      .subscribe(
        res => {
          this.getResourceData();
          this.activateValue('', null);
        },
        err => {
          console.log(err);
        }
      );
  }

  /**
   * Delete the shown resource. Emit an event for outside proceeding.
   */
  deleteResource() {

    // post property or log error
    this.knoraV1RequestService.deleteResource(this.stableResourceIRI)
      .subscribe(
        res => {
          this.resourceIsDeleted.emit();
          this.activateValue('', null);
        },
        err => {
          console.log(err);
        }
      );
  }

  /**
   * Delete a property value. Reload afterwards
   * @param {string} valueIRI The IRI of the value that will be deleted
   */
  deleteProperty(valueIRI: string) {

    // post property or log error
    this.knoraV1RequestService.deletePropertyValue(valueIRI)
      .subscribe(
        res => {
          // reload resource data
          this.getResourceData();
          this.activateValue('', null);
        },
        err => {
          console.log(err);
        }
      );
  }

  /**
   * Add a property value and reload afterwards.
   * @param {string} propertyTypeIRI The property of the value to be added
   */
  addProperty(propertyTypeIRI: string) {

    const resourceParams = this.focusedValueContent;
    resourceParams['res_id'] = this.stableResourceIRI;
    resourceParams['prop'] = propertyTypeIRI;
    resourceParams['project_id'] = this.resource['resinfo']['project_id'];

    // post property or log error
    this.knoraV1RequestService.postPropertyValue(resourceParams)
      .subscribe(
        res => {
          // reload resource data
          this.getResourceData();
          this.activateValue('', null);
        },
        err => {
          console.log(err);
        }
      );
  }

  /**
   * Change a property value and update afterwards
   * @param {string} valueIRI The IRI of the value that has to be changed.
   */
  changeProperty(valueIRI: string) {

    const resourceParams = this.focusedValueContent;
    resourceParams['project_id'] = this.resource['resinfo']['project_id'];

    // put property or log error
    this.knoraV1RequestService.changePropertyValue(valueIRI, resourceParams)
      .subscribe(
        res => {
          // reload resource data
          this.getResourceData();
          this.activateValue('', null);
        },
        err => {
          console.log(err);
        }
      );
  }

  /**
   * Add a value IRI to the set of values with shown history
   * @param valueIRI
   */
  activateValueHistory(valueIRI) {
    this.valuesWithShownHistory.add(valueIRI);
  }

  /**
   * Remove a value IRI from the set of values with shown hitstory
   * @param valueIRI
   */
  hideValueHistory(valueIRI) {
    this.valuesWithShownHistory.delete(valueIRI);
  }
}
