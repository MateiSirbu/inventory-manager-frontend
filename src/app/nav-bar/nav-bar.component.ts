import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  links: string[] = ['inventory', 'scan', 'add-item', 'contact'];
  captions: string[] = ['Inventory', 'Scan', 'Add Item', 'Contact'];
  icons: string[] = ['list', 'qr_code_scanner', 'add', 'contact_support']
  activeLink: string = undefined;
  background: ThemePalette = 'primary';
  appName: string = 'Inventory Manager';

  highlightActiveLink()
  {
    let path = document.location.pathname.toLowerCase();
    this.activeLink = path.substring(1);
  }

  ngOnInit() {
    this.highlightActiveLink();
  }
}
