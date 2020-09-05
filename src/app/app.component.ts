import { Component } from '@angular/core';
import { transition, trigger, query, style, animate, group, animateChild } from '@angular/animations'
import { RouterOutlet, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animRoutes', [

      transition(':decrement', [
        query(':enter, :leave', style({ width: '100%' }), { optional: true }),
        group([
          query(':enter', [style({ transform: 'translateX(-100%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))], {
            optional: true,
          }),
          query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(100%)' }))], {
            optional: true,
          }),
        ]),
      ]),

      transition(':increment', [
        query(':enter, :leave', style({ width: '100%' }), { optional: true }),
        group([
          query(':enter', [style({ transform: 'translateX(100%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))], {
            optional: true,
          }),
          query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(-100%)' }))], {
            optional: true,
          }),
        ]),
      ])
    ])
  ]
})
export class AppComponent {

  constructor(private route: ActivatedRoute) { }

  animationState: number;

  onActivate($event) {
    this.animationState = this.route.firstChild.snapshot.data['routeIndex']
  }
}
