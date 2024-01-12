import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { fromEvent, map } from 'rxjs';

export const TEXT_LIMIT = 60;
export const SHADOW_LIMIT = 100;
export const SCROLL_CONTAINER = 'mat-sidenav-content';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isSmallScreen: boolean = false;
  public popText = false;
  public applyShadow = false;

  get sideNavOpened() {
    return !this.isSmallScreen;
  }

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    const content = document.getElementsByTagName(SCROLL_CONTAINER)[0];

    console.log('content: ', content);

    fromEvent(content, 'scroll')
      .pipe(map(() => content.scrollTop))
      .subscribe((value) => this.determineHeader(value));
  }

  determineHeader(value: number): void {
    this.popText = value >= TEXT_LIMIT;
    this.applyShadow = value >= SHADOW_LIMIT;
  }

  ngAfterContentInit() {
    this.breakpointObserver
      .observe(['(max-width: 800px)'])
      .subscribe((res) => (this.isSmallScreen = res.matches));
  }
}
