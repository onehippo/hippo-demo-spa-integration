import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import { BloomreachContext } from "./types/bloomreach-context.type";
import { baseUrls } from './env-vars';


@Injectable()
export class ContentService {
  pageData: any;
  bloomreachContext: BloomreachContext;

  private getOptions = {
    withCredentials: true
  };

  private postOptions = {
    withCredentials: true,
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
  };

  constructor(
    private http: HttpClient) { }

  setBloomreachContext(bloomreachContext) {
    if (bloomreachContext) {
      this.bloomreachContext = bloomreachContext;
    }
  }

  getPage (): Observable<any> {
    const apiUrl: string = this.buildApiUrl();
    return this.http.get<any>(apiUrl, this.getOptions)
      .pipe(
        tap(content => this.pageData = content),
        catchError(this.handleError('getPage', []))
      );
  }

  updateComponent(componentId, propertiesMap) {
    const body = this.toUrlEncodedFormData(propertiesMap);
    const url: string = this.buildApiUrl(componentId);
    return this.http.post<any>(url, body, this.postOptions)
      .pipe(
        tap(response => {
          // update documents by merging with original documents map
          if (response.documents) {
            let documents = this.pageData.documents;
            Object.assign(documents, response.documents);
            // documents = Object.assign(documents, response.documents);
          }
          return response;
        }),
        catchError(this.handleError('updateComponent', []))
      );
  }

  getContentItem (uuid: string): any {
    if (this.pageData && this.pageData.documents && this.pageData.documents[uuid] && this.pageData.documents[uuid].document) {
      return this.pageData.documents[uuid];
    } else {
      return null;
    }
  }

  // from rendering.service.js
  private toUrlEncodedFormData(json) {
    return Object.keys(json)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`)
      .join('&');
  }

  private buildApiUrl(componentId?: string): string {
    let url: string = baseUrls.cmsBaseUrl;
    // add api path to URL, and prefix with contextPath and preview-prefix if used
    if (this.bloomreachContext.contextPath) {
      url += '/' + this.bloomreachContext.contextPath;
    }
    if (this.bloomreachContext.preview) {
      url += '/_cmsinternal';
    }
    url += baseUrls.cmsApiPath;
    if (this.bloomreachContext.pathInfo) {
      url += '/' + this.bloomreachContext.pathInfo;
    }
    // if component ID is supplied, URL should be a component rendering URL
    if (componentId) {
      url += baseUrls.cmsApiComponentRenderingUrlSuffix + componentId;
    }
    return url;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
