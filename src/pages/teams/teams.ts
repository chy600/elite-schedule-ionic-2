import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { TeamHomePage } from '../pages';
import { EliteApi } from '../../shared/shared';

import _ from 'lodash';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {
	private allTeams: any;
	private allTeamDivisions: any;
	teams = [];

	constructor(private navCtrl: NavController,
              private navParams: NavParams,
			  private loadingCtrl: LoadingController,
              private eliteApi: EliteApi) {}

	ionViewWillLoad() {
		let selectedTourney = this.navParams.data;

		let loader = this.loadingCtrl.create({
			content: 'Getting data...'
		});
		loader.present().then(() => {
			this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
				this.allTeams = data.teams;
				this.allTeamDivisions = _.chain(data.teams)
						.groupBy('division')
						.toPairs()
						.map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
						.value();
				this.teams = this.allTeamDivisions;
				loader.dismiss();
			});
		});
	}

	itemTapped($event, team) {
		this.navCtrl.push(TeamHomePage, team);
	}

}
