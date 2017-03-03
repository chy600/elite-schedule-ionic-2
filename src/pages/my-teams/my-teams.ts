import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { TournamentsPage, TeamHomePage } from '../pages';
import { EliteApi, UserSettings } from '../../shared/shared';
@Component({
	selector: 'my-teams',
	templateUrl: 'my-teams.html'
})
export class MyTeamsPage {

	favorites = [];
	constructor(private nav: NavController, 
				private loadingCtrl: LoadingController,
				private eliteApi: EliteApi,
				private userSettings: UserSettings) { }

	favoriteTapped($event, favorite) {
		let loader = this.loadingCtrl.create({
			content: 'Getting data...',
			dismissOnPageChange: true
		});
		loader.present();
		this.eliteApi.getTournamentData(favorite.tournamentId)
			.subscribe(t => this.nav.push(TeamHomePage, favorite.team));
	}

	goToTournaments() {
		this.nav.push(TournamentsPage);
	}

	ionViewDidEnter() {
		this.favorites = this.userSettings.getAllFavorites();
	}
	
}