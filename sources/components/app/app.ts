import { Component, View, bootstrap } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, routerInjectables } from 'angular2/router';

import { Start } from '../start/start';
import { Impressum } from '../impressum/impressum';

@Component({
    selector: 'mc-app'
})

@RouteConfig([
    { path: '/', component: Start, as: 'start' },
    { path: '/impressum', component: Impressum, as: 'impressum' }
])

@View({
    templateUrl: 'components/app/app.html',
    directives: [ RouterOutlet, RouterLink ]
})

class App {}


bootstrap( App, [ routerInjectables ] );
