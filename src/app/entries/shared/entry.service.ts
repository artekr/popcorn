import { Injectable } from '@angular/core';

import { Entry } from './entry.model';
import { ENTRIES } from '../../mock-entries';

@Injectable()
export class EntryService {

  constructor() { }

  getEntries(): Entry[] {
    return ENTRIES;
  }

}
