import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { SiteMapService } from '../app-logic/site-map.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  sitemap: any;
  activeLink: string = '';
  background: ThemePalette = 'primary';
  appName: string = 'Inventory Manager';

  constructor(private router: Router, private sitemapservice: SiteMapService) {
    router.events.subscribe(_ => this.highlightActiveLink());
    this.sitemap = sitemapservice.getData();
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
