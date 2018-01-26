import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
  // Observable string sources
  private emitTagIdSource = new Subject<any>();
  private emitEntryNameSource = new Subject<any>();

  // Observable string streams
  tagIdEmitted$ = this.emitTagIdSource.asObservable();
  entryNameEmitted$ = this.emitEntryNameSource.asObservable();
  
  // Service message commands
  emitTagId(change: any) {
    this.emitTagIdSource.next(change);
  }
  emitEntryName(change: any) {
    this.emitEntryNameSource.next(change);
  }

}