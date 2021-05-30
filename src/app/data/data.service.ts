import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class DataService {
  private missionAnnouncedSource = new Subject<any>();
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  announceMission(mission: any) {
    this.missionAnnouncedSource.next(mission);
  }
}
