import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Hero}           from './hero';
import {Observable}     from 'rxjs/Observable';


@Injectable()
export class HeroService {

  constructor(private http: Http) { }

  getHero(id: number): Observable<Hero> {
    return this.getHeroes().map(heroes => heroes.filter(hero => hero.id === id)[0]);
  }

  private _heroesUrl = 'app/heroes.json';  // URL to web api

  getHeroes (): Observable<Hero[]> {
    return this.http.get(this._heroesUrl)
                    .map(res => <Hero[]> res.json().heroes)
                    .do(data => console.log(data)) // eyeball results in the console
                    .catch(this.handleError);
  }

  private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
