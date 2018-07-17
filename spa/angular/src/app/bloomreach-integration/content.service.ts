import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import * as jsonpointer from 'jsonpointer';

import { BloomreachContext } from './types/bloomreach-context.type';
import baseUrls from './utils/cms-urls';
import findChildById from './utils/find-child-by-id';

@Injectable()
export class ContentService {
  pageModel: any;
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

  fetchPageModel (): Observable<any> {
    const apiUrl: string = this.buildApiUrl();
    return this.http.get<any>(apiUrl, this.getOptions)
      .pipe(
        tap(content => this.pageModel = content),
        catchError(this.handleError('fetchPageModel', []))
      );
  }

  getPageModel() {
    return this.pageModel;
  }

  updateComponent(componentId, propertiesMap) {
    // find the component that needs to be updated in the page structure object using its ID
    const componentToUpdate = findChildById(this.pageModel, componentId);
    if (componentToUpdate !== undefined) {
      const body = this.toUrlEncodedFormData(propertiesMap);
      const url: string = this.buildApiUrl(componentId);
      return this.http.post<any>(url, body, this.postOptions)
        .pipe(
          tap(response => {
            // update configuration of changed component in existing page model
            if (response.page) {
              componentToUpdate.parent[componentToUpdate.idx] = response.page;
            }
            // update documents by merging with original documents map
            if (response.content) {
              // if page has no associated content there is no content map, create it
              if (!this.pageModel.content) {
                this.pageModel.content = {};
              }
              Object.assign(this.pageModel.content, response.content);
            }
            return this.pageModel;
          }),
          catchError(this.handleError('updateComponent', []))
        );
    }
  }

  getContentViaReference (contentRef: string): any {
    if (contentRef && typeof contentRef === 'string') {
      return jsonpointer.get(this.pageModel, contentRef);
    }
    return null;
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
    if (baseUrls.cmsContextPath !== '') {
      url += '/' + baseUrls.cmsContextPath;
    }
    if (this.bloomreachContext.preview) {
      url += '/' + this.bloomreachContext.preview;
    }
    if (baseUrls.cmsChannelPath  !== '') {
      url += '/' + baseUrls.cmsChannelPath;
    }
    url += '/' + baseUrls.cmsApiPath;
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
