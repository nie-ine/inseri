import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private static API_BASE_URL_COMMENT =  environment.node +  '/api/comments';

  constructor(
    private http: HttpClient
  ) { }

  createComment(comment: any): Observable<any> {
    return this.http.post(`${CommentService.API_BASE_URL_COMMENT}`, comment);
  }

  getCommentsOfPage( pageId: string ): Observable<any> {
    return this.http.get(`${CommentService.API_BASE_URL_COMMENT}/${pageId}`);
  }

  deletecomment( commentId: string ) {
    return this.http.delete(`${CommentService.API_BASE_URL_COMMENT}/${commentId}`);
  }

  updateText( commentId: string, newText: string ) {
    return this.http.put(`${CommentService.API_BASE_URL_COMMENT}/${commentId}`,
      {
        updatedText: newText
      });
  }

  getAllCommentsOfUser() {
    return this.http.get(`${CommentService.API_BASE_URL_COMMENT}`);
  }
}
