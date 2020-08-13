import { Injectable } from '@angular/core';
import { ContactData } from './contact-data'
@Injectable({
  providedIn: 'root'
})
export class ContactProviderService {

  private data = <ContactData>
  {
    info: 'Storage units',
    address: 'near midtown in Atlanta, GA 30312',
    openDays: 'Monday to Friday',
    timeSlot: '9 AM - 5 PM',
    phone: '555-9876'
  }

  constructor() { }

  getData(): ContactData
  {
    return this.data;
  }
}
