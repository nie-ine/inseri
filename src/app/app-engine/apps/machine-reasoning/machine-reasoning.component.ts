import {Component, OnInit, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-machine-reasoning',
  templateUrl: './machine-reasoning.component.html',
  styleUrls: ['./machine-reasoning.component.scss'],
  // Add ViewEncapsulation.None in order to apply SCSS to dynamically injected HTML
  encapsulation: ViewEncapsulation.None
})

export class MachineReasoningComponent implements OnInit {
  title = 'Machine Reasoning';

  data_files = [];
  @ViewChild('data_uploads') data_uploads: ElementRef;
  data_urls = [];
  data_bowl;

  rule_files = [];
  @ViewChild('rule_uploads') rule_uploads: ElementRef;
  rule_urls = [];
  rule_bowl;

  query_files = [];
  @ViewChild('query_uploads') query_uploads: ElementRef;
  query_urls = [];
  query_bowl;
  private elRef: any;

  constructor() {
  }

  ngOnInit() {
    this.data_bowl = 'Upload data files...';
    this.rule_bowl = 'Upload rule files...';
    this.query_bowl = 'Upload query files...';
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

  // wtf(event: Event) {
  //   console.log('wtfff');
  //   const remove_btns = document.getElementsByClassName('remove_btn');
  //   const values = Array.prototype.map.call(remove_btns, function(el) {
  //     return el.value;
  //   });
  //   console.log(values);
  //   for (let i = 0; i < values.length; i++) {
  //     values[i].addEventListener('click', function () {
  //       console.log('hello button');
  //     });
  //   }


    // const remove_btns = document.querySelectorAll('.remove_btn');
    // console.log(remove_btns);
    // for (let i = 0; i < remove_btns.length; i++) {
    //   remove_btns[i].addEventListener('click', function () {
    //     console.log('hello button');
    //   });
    // }
  // }

  addChips(source) {
    return source.map((object) => ([
      '<div class=\'file_chip\'>'
      + object.file
      + '<span class=\'remove_btn\'>&times;</span>'
      + '</div>'])).join('');
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
      this.readFile(selectedFiles[i], function(e) { thisFile['content'] = e.target.result; });

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
      this.data_bowl = this.addChips(this.data_files);
    } else if (type === 'rule') {
      this.rule_bowl = this.addChips(this.rule_files);
    } else if (type === 'query') {
      this.query_bowl = this.addChips(this.query_files);
    }
  }


}
