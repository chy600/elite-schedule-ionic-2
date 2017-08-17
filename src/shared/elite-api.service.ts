import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {
	private baseUrl = 'https://elite-schedule-app-i2-71758.firebaseio.com';
	private tourneyData: any = {};
	currentTourney: any = {};

	constructor(private http: Http) { }

	getTournaments() {
		return new Promise(resolve => {
			this.http.get(`${this.baseUrl}/tournaments.json`)
				.subscribe(res => resolve(res.json()));
		});
	}

	getTournamentData(tourneyId, forceRefresh: boolean = false): Observable<any> {
		if(!forceRefresh && this.tourneyData[tourneyId]) {
			this.currentTourney = this.tourneyData[tourneyId];
			return Observable.of(this.currentTourney);
		}
	  return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
      .map((response: Response) => {
				this.tourneyData[tourneyId] = response.json();
	      this.currentTourney = this.tourneyData[tourneyId];
	      return this.currentTourney;
      });
  }

	getCurrentTourney() {
		return this.currentTourney;
	}

	refreshCurrentTourney() {
		return this.getTournamentData(this.currentTourney.tournament.id, true);
	}
}
