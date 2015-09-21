import { Component, View, bootstrap } from 'angular2/angular2';
import { RouteConfig } from 'angular2/router';
import { ROUTER_BINDINGS, ROUTER_DIRECTIVES } from 'angular2/router';

import { Start } from '../start/start';
import { Impressum } from '../impressum/impressum';

@Component({
    selector: 'mc-app'
})

@RouteConfig([
    { path: '/',            component: Start,       as: 'start' },
    { path: '/impressum',   component: Impressum,   as: 'impressum' }
])

@View({
    templateUrl: 'components/app/app.html',
    directives: [ ROUTER_DIRECTIVES ]
})

class App {}


bootstrap( App, [ROUTER_BINDINGS] );
