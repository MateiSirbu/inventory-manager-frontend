import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SiteMapService {

    links = ['inventory', 'scan', 'add-item', 'contact'];
    captions = ['Inventory', 'Scan', 'Add Item', 'Contact'];
    icons = ['list', 'qr_code_scanner', 'add', 'contact_support']

    constructor() { }

    getData(): { links: string[]; captions: string[]; icons: string[] } {
        return {
            links: this.links,
            captions: this.captions,
            icons: this.icons
        }
    }
}
