import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {MicroserviceService} from '../../../user-action-engine/mongodb/microservice/microservice.service';
import 'ace-builds/src-noconflict/mode-turtle';
import 'ace-builds/src-noconflict/theme-chrome';

// This app communicates with the machine reasoning microservice (https://github.com/nie-ine/microservice-reasoning-task)

@Component({
  selector: 'app-machine-reasoning',
  templateUrl: './machine-reasoning.component.html',
  styleUrls: ['./machine-reasoning.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MachineReasoningComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private microserviceService: MicroserviceService
  ) {
  }

  // The initial text to be displayed in the div of the selected files
  init_bowl_text = '';
  // The initial text ot be displayed in the div of possible file URLs
  init_urls_text = 'List file URLs line by line';

  // The list of data files to be used in the reasoning session
  // This will be an array of objects like [ { "file": "rule1.n3", "content": ... }, { "file": "rule2.n3", "content": ... } ]
  data_files = [];
  // Array of URLs instead of local data files
  data_urls: Array<string>;
  // The HTML representation of the selected data files
  data_bowl: SafeHtml;
  // The hidden HTML input of type="file" to upload multiple data files
  // This input is triggered by the according material button in the HTML template
  @ViewChild('hidden_upl_data', { static: true }) hidden_upl_data: HTMLInputElement;
  // Default string for listed data URLs
  data_url_content = '';

  // The list of rule files to be used in the reasoning session
  // This will be an array of objects like [ { "file": "data1.ttl", "content": ... }, { "file": "data2.ttl", "content": ... } ]
  rule_files = [];
  // Array of URLs instead of local rule files
  rule_urls: Array<string>;
  // The HTML representation of the selected rule files
  rule_bowl: SafeHtml;
  // The hidden HTML input of type="file" to upload multiple rule files
  // This input is triggered by the according material button in the HTML template
  @ViewChild('hidden_upl_rule', { static: true }) hidden_upl_rule: HTMLInputElement;
  // Default string for listed data URLs
  rule_url_content = '';

  // The list of query files to be used in the reasoning session
  // This will be an array of objects like [ { "file": "query1.n3", "content": ... }, { "file": "query2.n3", "content": ... } ]
  query_files = [];
  // Array of URLs instead of local query files
  query_urls: Array<string>;
  // The HTML representation of the selected query files
  query_bowl: SafeHtml;
  // The hidden HTML input of type="file" to upload multiple query files
  // This input is triggered by the according material button in the HTML template
  @ViewChild('hidden_upl_query', { static: true }) hidden_upl_query: HTMLInputElement;
  // Default string for listed data URLs
  query_url_content = '';

  // State of the reasoning session. True if reasoning microservice is reasoning.
  reasoning = false;
  // Prepare a timestamp string to use for results file
  timestamp: string;
  // Something to display an error message (or not)
  errorMessage;
  // Used by inseri
  serviceId = 'machineReasoning';
  // Div to display the reasoning results
  @ViewChild('results', { static: false }) results;
  // Boolean to indicate whether reasoning results are maximized or not
  isMaximized: boolean;
  // Div of the ace editor to display the reasoning results
  @ViewChild('editor', { static: true }) editor;

  ngOnInit() {
    // Don't display any selected files as the user did not select files yet
    this.data_bowl = this.init_bowl_text;
    this.rule_bowl = this.init_bowl_text;
    this.query_bowl = this.init_bowl_text;
    // Set the theme for the ace editor
    this.editor.setTheme('chrome');
    // Set the syntax of the ace editor
    this.editor.setMode('turtle');
    // Do not maximize the reasoning results
    this.isMaximized = false;
  }

  // Function to read contents of a selected file
  readFile(file, onLoadCallback) {
    const reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsText(file);
  }

  // Function to create the HTML for the file chips of selected files
  addChips(source) {
    return source.map((object) => ([
      '<div class=\'file_chip\'><b>'
      + object.file
      + '</b></div>'])).join('');
  }

  // Selecting data, rule, or query files
  onFileSelect(event: Event, target) {
    // Save the FileList object
    const selectedFiles = (event.target as HTMLInputElement).files;

    // Iterate over each selected file
    for (let i = 0; i < selectedFiles.length; ++i) {
      // For each file, create a new object
      const thisFile = {};

      // Ad key 'file' with the filename as the value to the object
      thisFile['file'] = selectedFiles[i]['name'];

      // Read the content of the file...
      // ...and add the key 'content' with the file's content as text to the object
      this.readFile(selectedFiles[i], function (e) {
        thisFile['content'] = e.target.result;
      });

      // Push the created object for this file to the according global array of all selected files
      if (target === 'data') {
        this.data_files.push(thisFile);
      } else if (target === 'rule') {
        this.rule_files.push(thisFile);
      } else if (target === 'query') {
        this.query_files.push(thisFile);
      }
    }

    // List the names of the selected files in the view
    if (target === 'data') {
      this.data_bowl = this.sanitizer.bypassSecurityTrustHtml(this.addChips(this.data_files));
    } else if (target === 'rule') {
      this.rule_bowl = this.sanitizer.bypassSecurityTrustHtml(this.addChips(this.rule_files));
    } else if (target === 'query') {
      this.query_bowl = this.sanitizer.bypassSecurityTrustHtml(this.addChips(this.query_files));
    }

    // Always empty the current button's FileList after file selection
    (event.target as HTMLInputElement).value = '';
  }

  // Function to remove selected files (from view and arrays)
  // A bit redundant
  resetFiles(target) {
    if (target === 'data') {
      this.data_bowl = this.init_bowl_text;
      this.data_files = [];
    } else if (target === 'rule') {
      this.rule_bowl = this.init_bowl_text;
      this.rule_files = [];
    } else if (target === 'query') {
      this.query_bowl = this.init_bowl_text;
      this.query_files = [];
    }
  }

  // Function to communicate with the machine reasoning microservice
  reason() {
    // Remove any currently displayed error messages in the view
    this.errorMessage = false;

    // Create array of URL strings, if according textarea is not empty and not only whitespace
    // Otherwise create empty array

    // ...for data
    if  (this.data_url_content.trim() !== '') {
      this.data_urls = this.data_url_content.split(/\r?\n/);
    } else {
      this.data_urls = [];
    }
    // ...for rules
    if  (this.rule_url_content.trim() !== '') {
      this.rule_urls = this.rule_url_content.split(/\r?\n/);
    } else {
      this.rule_urls = [];
    }
    // ... for queries
    if  (this.query_url_content.trim() !== '') {
      this.query_urls = this.query_url_content.split(/\r?\n/);
    } else {
      this.query_urls = [];
    }

    // Check if there's at least one input for data, rules, and queries (files or URLs)
    if (this.data_files.concat(this.data_urls).length > 0
      && this.rule_files.concat(this.rule_urls).length > 0
      && this.query_files.concat(this.query_urls).length > 0) {

      // Get current timestamp
      const nowDate = new Date();
      this.timestamp = nowDate.getFullYear().toString()
        + (nowDate.getMonth() + 1).toString()
        + nowDate.getDate().toString()
        + nowDate.getHours().toString()
        + nowDate.getMinutes().toString();

      // Remove any already shown results of a previous reasoning session
      this.editor.text = '';

      // Show the spinner to indicate that the microservice is reasoning
      this.reasoning = true;

      // Create the body to POST to the microservice
      const body = {
        'data': {
          'files': this.data_files,
          'urls': this.data_urls
        },
        'rules': {
          'files': this.rule_files,
          'urls': this.rule_urls
        },
        'queries': {
          'files': this.query_files,
          'urls': this.query_urls
        }
      };

      console.log('POST', body);

      // POST the object to the reasoning microservice
      this.microserviceService.postToMicroservice( this.serviceId, body, {} )
        .subscribe((val) => {
          console.log('Response:', val);
          this.editor.text = val.output;

          // Hide the spinner
          this.reasoning = false;
          }, error => {
            // Display error message
            console.log('Error', error);
            this.errorMessage = error.message;
            // Hide the spinner
            this.reasoning = false;
          }
        );
    } else { // If there's no data, no rules, or queries
      // Remove any already shown results of a previous reasoning session
      this.editor.text = '';
      this.errorMessage = 'Data, rule, or query input is missing';
      // Hide the spinner
      this.reasoning = false;
    }
  }

  // Function to download reasoning results as a .ttl file
  download() {
    const a = document.createElement('a');
    const textToBLOB = new Blob([this.editor.text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(textToBLOB);
    a.href = url;
    // Use the timestamp of the reasoning session as part of the filename
    a.download = 'inseriReasoningResults_' + this.timestamp + '.ttl';
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }
}
