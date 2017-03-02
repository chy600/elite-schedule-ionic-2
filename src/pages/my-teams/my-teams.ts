import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TournamentsPage } from '../tournaments/tournaments';
      
@Component({
	selector: 'my-teams',
	templateUrl: 'my-teams.html'
})
export class MyTeamsPage implements OnInit {
	constructor(private nav: NavController) { }

	ngOnInit() { }

	goToTournaments() {
		this.nav.push(TournamentsPage);
	}
	
}