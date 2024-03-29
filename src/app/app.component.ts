import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter, fromEvent, map } from 'rxjs';
import { MenuItem } from './shared/models/menuItem';
import { menuItems } from './shared/models/menu';
import { NavigationEnd, Router } from '@angular/router';

export const TEXT_LIMIT = 60;
export const SHADOW_LIMIT = 100;
export const SCROLL_CONTAINER = 'mat-sidenav-content';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public menuName = '';
  public popText = false;
  public applyShadow = false;
  public isSmallScreen: boolean = false;
  public itemsMenu: MenuItem[] = menuItems;

  private route: Router;
  private breakpointObserver!: BreakpointObserver;

  get sideNavOpened() {
    return !this.isSmallScreen;
  }

  constructor() {
    this.route = inject(Router);
    this.breakpointObserver = inject(BreakpointObserver);
  }

  ngOnInit(): void {
    const content = document.getElementsByTagName(SCROLL_CONTAINER)[0];

    fromEvent(content, 'scroll')
      .pipe(map(() => content.scrollTop))
      .subscribe((value) => this.determineHeader(value));

      this.route.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => event as NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        let moduleName = event.urlAfterRedirects.split('/')[1]
  
        this.menuName = this.itemsMenu.filter(
          (item: MenuItem) => item.link == `/${moduleName}`
        )[0].label;
      })
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
