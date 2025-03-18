import {AfterViewInit, Component} from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    gsap.to('.avatar', {
      rotationY: 20,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: 'power1.inOut',
      transformOrigin: 'center center',
    });

    gsap.to('.gear_1', {
      rotation: 360,
      repeat: -1,
      duration: 30,
      ease: 'linear',
      transformOrigin: 'center center',
    });

    gsap.to('.gear_2', {
      rotation: -360,
      repeat: -1,
      duration: 15,
      ease: 'linear',
      transformOrigin: 'center center',
    });

    gsap.to('.gear_3', {
      rotation: -360,
      repeat: -1,
      duration: 15,
      ease: 'linear',
      transformOrigin: 'center center',
    });
  }

}
