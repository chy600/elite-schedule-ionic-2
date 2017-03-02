import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { MyTeamsPage, GamePage, TeamDetailPage, TeamsPage, TournamentsPage, TeamHomePage, StandingsPage } from '../pages/pages';

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage,
    TeamHomePage,
    StandingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamDetailPage,
    TeamsPage,
    TournamentsPage,
    TeamHomePage,
    StandingsPage
  ],
  providers: []
})
export class AppModule {}
