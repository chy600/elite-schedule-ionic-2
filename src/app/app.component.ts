import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { MyTeamsPage, TournamentsPage } from '../pages/pages';
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
  rootPage = MyTeamsPage;

  constructor(private platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTournament() {
    this.nav.push(TournamentsPage);
  }
}
