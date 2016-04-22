import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {Hero} from '../../models/hero';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import {HeroService} from '../../services/hero.service';
import {OnInit} from 'angular2/core';


@Component({
    directives: [HeroDetailComponent],
    selector: 'my-heroes',
    styleUrls: ['app/components/heroes/heroes.component.css'],
    templateUrl: 'app/components/heroes/heroes.component.html'
})
        
export class HeroesComponent implements OnInit {
    ngOnInit() {
        this.getHeroes();
    }
    constructor(
        private _heroService: HeroService,
        private _router: Router
    ) { }

    selectedHero: Hero;
    heroes: Hero[];
    onSelect(hero: Hero) { this.selectedHero = hero; };
    gotoDetail() {
        let link = ['HeroDetail', { id: this.selectedHero.id }];
        this._router.navigate(link);
    }
    getHeroes() {
        this._heroService.getHeroes().then(heroes => 
            this.heroes = heroes
        );
    }
}
