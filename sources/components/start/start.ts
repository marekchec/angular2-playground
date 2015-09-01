import { Component, View } from 'angular2/angular2';
import { RouterLink } from 'angular2/router';

@Component({
    selector: 'start'
})

@View({
    templateUrl: './components/start/start.html',
    directives: [ RouterLink ]
})

export class Start {}
