import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss']
})
export class ToolbarMenuComponent implements OnInit {

  @Input() menuName = '';
  @Input() shadow = false;
  @Input() popText = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
