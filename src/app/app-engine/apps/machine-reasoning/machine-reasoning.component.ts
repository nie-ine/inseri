import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

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
    private http: HttpClient
  ) {
  }

  init_bowl_text = '';
  init_urls_text = 'List file URLs line by line';

  data_files = [];
  data_urls: Array<string>;
  data_bowl: SafeHtml;
  @ViewChild('hidden_upl_data') hidden_upl_data: HTMLInputElement;
  // @ViewChild('data_url_list') data_url_list: HTMLTextAreaElement;
  data_url_content = '';


  rule_files = [];
  rule_urls: Array<string>;
  rule_bowl: SafeHtml;
  @ViewChild('hidden_upl_rule') hidden_upl_rule: HTMLInputElement;
  // @ViewChild('rule_url_list') rule_url_list: HTMLTextAreaElement;
  rule_url_content = '';

  query_files = [];
  query_urls: Array<string>;
  query_bowl: SafeHtml;
  @ViewChild('hidden_upl_query') hidden_upl_query: HTMLInputElement;
  // ViewChild('query_url_list') query_url_list: HTMLTextAreaElement;
  query_url_content = '';

  reasoning = false;
  errorMessage;
  pathToFile: SafeResourceUrl;

  ngOnInit() {
    this.data_bowl = this.init_bowl_text;
    this.rule_bowl = this.init_bowl_text;
    this.query_bowl = this.init_bowl_text;
  }

  // Note: files from different source folder could have the same name
  // e.g. 'data.ttl'. If you save them in the Docker container, they
  // will be overwritten. ==> HANDLE AT MICROSERVICE'S END

  readFile(file, onLoadCallback) {
    const reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsText(file);
  }

  // HTML for the file chip displayed in the GUI
  // Bad practice?
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
    // Remove any currently displayed reasoning results
    this.pathToFile = false;

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

      console.log('POSTing:');
      console.log(body);

      // POST the object to the reasoning microservice
      // https://github.com/nie-ine/microservice-reasoning-task
      // Receive the response as blob
      this.http.post('http://localhost:50001', body, { responseType: 'blob' })
        .subscribe((val) => {
          const blob = new Blob([val as any], { type: 'text/turtle' });
          console.log('Response:');
          console.log(blob);
          const url = URL.createObjectURL(blob);
          // Setting the pathToFile variable
          // This will invoke an iframe in the view showing the content of the response
          this.pathToFile = this.sanitizer.bypassSecurityTrustResourceUrl(url);

          // Hide the spinner
          this.reasoning = false;
          }, error => {
            // Display error message
            console.log('Error:');
            console.log(error);
            this.errorMessage = error.message;
            // Hide the spinner
            this.reasoning = false;
          }
        );
    } else { // If there's no data, no rules, or queries
      this.errorMessage = 'Data, rule, or query input is missing';
      // Hide the spinner
      this.reasoning = false;
    }
  }
}
