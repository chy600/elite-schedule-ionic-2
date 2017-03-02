import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { TeamsPage } from '../pages';
import { EliteApi } from '../../shared/shared';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html'
})
export class TournamentsPage {

  tournaments: any;

  constructor(private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private eliteApi: EliteApi) {}

  itemTapped($event, item) {
  	this.navCtrl.push(TeamsPage, item);
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: 'Getting tournaments...',
      // spinner: 'dots'
    });
    loader.present().then(() => {
      this.eliteApi.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      });
    });
  }

}
