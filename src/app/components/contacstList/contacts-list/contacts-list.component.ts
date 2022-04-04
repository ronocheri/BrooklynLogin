import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONTACTS } from 'src/app/db';
import { IContact } from 'src/app/interfaces/contact';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts=CONTACTS;
  selectedContact?: IContact;

    // dummyComponent = BlaComponent;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  onSelect(contact: IContact): void {
    this.selectedContact = contact;
  }
}
