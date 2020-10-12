import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {MicroserviceService} from '../../../user-action-engine/mongodb/microservice/microservice.service';
import 'ace-builds/src-noconflict/mode-turtle';
import 'ace-builds/src-noconflict/theme-chrome';
import * as $ from 'jquery';

@Component({
  selector: 'app-machine-reasoning',
  templateUrl: './machine-reasoning.component.html',
  styleUrls: ['./machine-reasoning.component.scss'],
  // Add ViewEncapsulation.None in order to apply SCSS to dynamically injected HTML
  encapsulation: ViewEncapsulation.None
})

export class MachineReasoningComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private microserviceService: MicroserviceService
  ) {
  }

  init_bowl_text = '';
  init_urls_text = 'List file URLs line by line';

  data_files = [];
  data_urls: Array<string>;
  data_bowl: SafeHtml;
  @ViewChild('hidden_upl_data') hidden_upl_data: HTMLInputElement;
  data_url_content = '';

  rule_files = [];
  rule_urls: Array<string>;
  rule_bowl: SafeHtml;
  @ViewChild('hidden_upl_rule') hidden_upl_rule: HTMLInputElement;
  rule_url_content = '';

  query_files = [];
  query_urls: Array<string>;
  query_bowl: SafeHtml;
  @ViewChild('hidden_upl_query') hidden_upl_query: HTMLInputElement;
  query_url_content = '';

  reasoning = false;
  timestamp: string;
  errorMessage;
  serviceId = 'machineReasoning';
  @ViewChild('results') results;
  isMaximized: boolean;
  @ViewChild('editor') editor;

  ngOnInit() {
    this.data_bowl = this.init_bowl_text;
    this.rule_bowl = this.init_bowl_text;
    this.query_bowl = this.init_bowl_text;
    this.editor.setTheme('chrome');
    this.editor.setMode('turtle');
    this.isMaximized = false;
  }

  readFile(file, onLoadCallback) {
    const reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsText(file);
  }

  // HTML for the file chip displayed in the GUI
  addChips(source) {
    return source.map((object) => ([
      '<div class=\'file_chip\'><b>'
      + object.file
      + '</b></div>'])).join('');
  }

  // Selecting data, rule, or query files
  onFileSelect(event: Event, target) {
    // save the FileList object
    const selectedFiles = (event.target as HTMLInputElement).files;

    // iterate over each selected file
    for (let i = 0; i < selectedFiles.length; ++i) {
      // for each file, create a new object
      const thisFile = {};

      // add key 'file' with the filename as the value to the object
      thisFile['file'] = selectedFiles[i]['name'];

      // read the content of the file...
      // ...and add the key 'content' with the file's content as text to the object
      this.readFile(selectedFiles[i], function (e) {
        thisFile['content'] = e.target.result;
      });

      // push the created object for this file to the according global array of all selected files
      if (target === 'data') {
        this.data_files.push(thisFile);
      } else if (target === 'rule') {
        this.rule_files.push(thisFile);
      } else if (target === 'query') {
        this.query_files.push(thisFile);
      }
    }

    // console.log(this.data_files);
    // console.log(this.rule_files);
    // console.log(this.query_files);

    // List the names of the selected files in the GUI
    if (target === 'data') {
      this.data_bowl = this.sanitizer.bypassSecurityTrustHtml(this.addChips(this.data_files));
    } else if (target === 'rule') {
      this.rule_bowl = this.sanitizer.bypassSecurityTrustHtml(this.addChips(this.rule_files));
    } else if (target === 'query') {
      this.query_bowl = this.sanitizer.bypassSecurityTrustHtml(this.addChips(this.query_files));
    }

    // Empty the current button's FileList
    (event.target as HTMLInputElement).value = '';
  }

  // Function to remove selected files (from GUI and arrays)
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

  reason() {
    // Remove any currently displayed error messages
    this.errorMessage = false;

    // Create new URL arrays, if according textarea is not empty and not only whitespace
    if  (this.data_url_content.trim() !== '') {
      this.data_urls = this.data_url_content.split(/\r?\n/);
    } else {
      this.data_urls = [];
    }
    if  (this.rule_url_content.trim() !== '') {
      this.rule_urls = this.rule_url_content.split(/\r?\n/);
    } else {
      this.rule_urls = [];
    }
    if  (this.query_url_content.trim() !== '') {
      this.query_urls = this.query_url_content.split(/\r?\n/);
    } else {
      this.query_urls = [];
    }

    // Check if there's at least one input for data, rules, and queries (files or URLs)
    if (this.data_files.concat(this.data_urls).length > 0
      && this.rule_files.concat(this.rule_urls).length > 0
      && this.query_files.concat(this.query_urls).length > 0) {

      const nowDate = new Date();
      this.timestamp = nowDate.getFullYear().toString()
        + (nowDate.getMonth() + 1).toString()
        + nowDate.getDate().toString()
        + nowDate.getHours().toString()
        + nowDate.getMinutes().toString();

      // Empty any already shown results
      this.editor.text = '';

      // Show the spinner
      this.reasoning = true;

      // Create the body to POST
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
      // https://github.com/nie-ine/microservice-reasoning-task
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
      // Empty any already shown results
      this.editor.text = '';
      this.errorMessage = 'Data, rule, or query input is missing';
      // Hide the spinner
      this.reasoning = false;
    }
  }

  download() {
    const a = document.createElement('a');
    const textToBLOB = new Blob([this.editor.text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(textToBLOB);
    a.href = url;
    if (this.timestamp) {
      a.download = 'inseriReasoningResults_' + this.timestamp + '.ttl';
    } else {
      a.download = 'inseriReasoningApp.ttl';
    }
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }
}
