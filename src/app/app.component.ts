import { Component, ViewChild } from '@angular/core';
import { Events, Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { MyTeamsPage, TeamHomePage, TournamentsPage } from '../pages/pages';
import { EliteApi, UserSettings } from '../shared/shared';

@Component({
  templateUrl: 'app.html',
  providers: [
    EliteApi,
    UserSettings
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any = MyTeamsPage;

  constructor(
    private events: Events,
    private platform: Platform,
    private userSettings: UserSettings,
    private eliteApi: EliteApi,
    private loadingController: LoadingController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.refreshFavorites();

      this.events.subscribe('favorites:changed', () => this.refreshFavorites());
    });
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTournament() {
    this.nav.push(TournamentsPage);
  }

  goToTeam(favorite) {
    let loader = this.loadingController.create({
      content: 'Fetching...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId)
      .subscribe(l => this.nav.push(TeamHomePage));
  }

  refreshFavorites() {
    this.favoriteTeams = this.userSettings.getAllFavorites();
  }
}
