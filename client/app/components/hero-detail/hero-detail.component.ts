import {Component, Input, OnInit} from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { HeroService } from '../../services/hero.service';
import {Hero} from '../../models/hero';

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/components/hero-detail/hero-detail.component.html',
    styleUrls: ['app/components/hero-detail/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
    constructor(
        private _heroService: HeroService,
        private _routeParams: RouteParams
    ){
        console.log('hero detail constructor');
    };
    ngOnInit() {
        let id = +this._routeParams.get('id');
        console.log("get detail for %d", id);
        this._heroService.getHero(id)
            .then(hero => {
                this.hero = hero;
                console.log("found hero id= %d, name = %s", hero.id, hero.name);
            });
    }
    goBack() {
        window.history.back();
    }

    @Input() 
    hero: Hero;
}
