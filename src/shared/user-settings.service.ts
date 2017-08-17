import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserSettings {
    constructor(private storage: Storage,
                private events: Events) { }

    favoriteTeam(team, tournamentId, tournamentName) {
        let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName};
        this.storage.set(team.id, JSON.stringify(item));
        this.events.publish('favorites:changed');
    }

    unfavoriteTeam(team) {
        this.storage.remove(team.id);
        this.events.publish('favorites:changed');
    }

    isFavoriteTeam(teamId) {
        return this.storage.get(teamId).then(result => result ? true : false);
    }

    getAllFavorites() {
        let items = [];
        this.storage.forEach((val, key) => {
            items.push(JSON.parse(val));
        });
        return items;
    }
}