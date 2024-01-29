import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-title',
  templateUrl: './toolbar-title.component.html',
  styleUrls: ['./toolbar-title.component.scss']
})
export class ToolbarTitleComponent implements OnInit {
  @Input() title = "";

  iconFa = '';
  iconMat = '';
  fontSet = '';

  @Input() 
  set icon(value: string) {
    if(value.includes('fa-')){
      this.iconFa = `icon-space-fa ${value}`; 
      this.fontSet = 'fa'
    } else {
      this.iconMat = value;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
