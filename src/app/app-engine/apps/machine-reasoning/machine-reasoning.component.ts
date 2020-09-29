import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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

  title = 'Machine Reasoning';
  init_bowl_text = '';
  init_urls_text = '...or list URLs here (line by line)';

  data_files = [];
  data_urls = [];
  data_bowl: SafeHtml;

  rule_files = [];
  rule_urls = [];
  rule_bowl: SafeHtml;

  query_files = [];
  query_urls = [];
  query_bowl: SafeHtml;

  reasoning = false;
  pathToFile: SafeResourceUrl;

  ngOnInit() {
    this.data_bowl = this.init_bowl_text;
    this.rule_bowl = this.init_bowl_text;
    this.query_bowl = this.init_bowl_text;
  }

  // Note: files from different source folder could have the same name
  // e.g. 'data.ttl'. If you save them in the Docker container, they
  // will be overwritten. You might want to add an index number to each
  // filename you received from the JSON

  readFile(file, onLoadCallback) {
    const reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsText(file);
  }

  // HTML for the file chip displayed in the GUI
  // Not a very good practice, I guess (?)
  addChips(source) {
    return source.map((object) => ([
      '<div class=\'file_chip\'>'
      + object.file
      + '</div>'])).join('');
  }

  // Resetting: when selecting a file and resetting and selecting the same file again,
  // it won't be displayed as it is still in the FileList and there was no change!!!

  resetData() {
    this.data_bowl = this.init_bowl_text;
    this.data_files = [];
    console.log(this.data_files);
  }
  resetRules() {
    this.rule_bowl = this.init_bowl_text;
    this.rule_files = [];
    console.log(this.rule_files);
  }
  resetQueries() {
    this.query_bowl = this.init_bowl_text;
    this.query_files = [];
    console.log(this.query_files);
  }

  onFileSelect(event: Event, type) {
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
      if (type === 'data') {
        this.data_files.push(thisFile);
      } else if (type === 'rule') {
        this.rule_files.push(thisFile);
      } else if (type === 'query') {
        this.query_files.push(thisFile);
      }
    }
    console.log(this.data_files);
    console.log(this.rule_files);
    console.log(this.query_files);

    // List the names of the selected files in the GUI
    if (type === 'data') {
      // this.data_bowl = this.addChips(this.data_files, 'data').bypassSecurityTrustHtml;
      this.data_bowl = this.sanitizer.bypassSecurityTrustHtml(this.addChips(this.data_files));
    } else if (type === 'rule') {
      this.rule_bowl = this.sanitizer.bypassSecurityTrustHtml(this.addChips(this.rule_files));
    } else if (type === 'query') {
      this.query_bowl = this.sanitizer.bypassSecurityTrustHtml(this.addChips(this.query_files));
    }

  }
  reason() {
    // Show spinner
    this.reasoning = true;
    // Validate the URL lists FOR REAL
    // Are there URLs?

    // Validate the file arrays FOR REAL
    // Are there files? Are the suffixes ok?
    if (this.data_files.length > 0
      && this.rule_files.length > 0
      && this.query_files.length > 0) {

      // Create the object to POST
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

      // POST the object
      this.http.post('http://localhost:50001', body, { responseType: 'blob' })
        .subscribe((val) => {
          const blob = new Blob([val as any], { type: 'text/turtle' });
          console.log(blob);
          const url = URL.createObjectURL(blob);
          this.pathToFile = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          // Hide spinner
          this.reasoning = false;
          }, error => console.log(error)
        );
    }
  }
}
