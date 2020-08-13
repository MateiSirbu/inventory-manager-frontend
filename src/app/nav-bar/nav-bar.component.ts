import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  links: string[] = ['inventory', 'scan', 'add-item', 'contact'];
  captions: string[] = ['Inventory', 'Scan', 'Add Item', 'Contact']
  activeLink: string = undefined;
  background: ThemePalette = 'primary';
  appName: string = 'Inventory Manager';
}
