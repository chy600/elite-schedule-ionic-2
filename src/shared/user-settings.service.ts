import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserSettings {
    constructor(private storage: Storage) {
    }

    favoriteTeam(team, tournamentId, tournamentName) {
        let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName};
        this.storage.set(team.id, JSON.stringify(item));
    }

    unfavoriteTeam(team) {
        this.storage.remove(team.id);
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