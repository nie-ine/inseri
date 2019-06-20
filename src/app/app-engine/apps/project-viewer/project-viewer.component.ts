import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Project, ProjectsService, ApiServiceError } from '@knora/core';

@Component({
  selector: 'app-project-viewer',
  templateUrl: './project-viewer.component.html',
  styleUrls: ['./project-viewer.component.scss']
})
export class ProjectViewerComponent implements OnInit, OnChanges {

  // @Input() iri: string = '';

  projects: Project[];

  constructor (private _projectsService: ProjectsService) { }

  ngOnChanges() { }

  ngOnInit() {

    this._projectsService.getAllProjects().subscribe(
      (results: Project[]) => {
        this.projects = results;
      },
      (error: ApiServiceError) => {
        console.error(error);
      }
    );
  }

}
