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
	private searchQuery: string;
	private filteredTeams: any[] = [];

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
				this.filteredTeams = this.allTeams;
				this.processTeamsData();
				loader.dismiss();
			});
		});
	}

	private processTeamsData() {
		this.allTeamDivisions = _.chain(this.filteredTeams)
			.groupBy('division')
			.toPairs()
			.map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
			.value();
		this.teams = this.allTeamDivisions;
	}

	itemTapped($event, team) {
		this.navCtrl.push(TeamHomePage, team);
	}

	filterTeams(ev: any) {
		this.filteredTeams = this.allTeams;
    // if the value is an empty string don't filter the teams
    if (this.searchQuery && this.searchQuery.trim() != '') {
      this.filteredTeams = this.allTeams.filter((team) => {
        return (team.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1);
			});
    }
		this.processTeamsData();
	}

}
