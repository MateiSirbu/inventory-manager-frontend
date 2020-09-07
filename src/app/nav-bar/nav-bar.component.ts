import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  links: string[] = ['inventory', 'scan', 'add-item', 'contact'];
  captions: string[] = ['Inventory', 'Scan', 'Add Item', 'Contact'];
  icons: string[] = ['list', 'qr_code_scanner', 'add', 'contact_support']
  activeLink: string = '';
  background: ThemePalette = 'primary';
  appName: string = 'Inventory Manager';

  constructor(private router: Router) {
    router.events.subscribe(_ => this.highlightActiveLink());
  }

  highlightActiveLink()
  {
    let path = document.location.pathname.toLowerCase();
    this.activeLink = path.substring(1);
  }

  ngOnInit() {
    this.highlightActiveLink();
  }
}
