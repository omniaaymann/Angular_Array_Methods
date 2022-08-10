import { NumberSymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { User } from './user.type=model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dom_Array_Methods';
  data = [];
  user = {};
  wealth;
  newUser: User;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getRandomUser();
    this.getRandomUser();
    this.getRandomUser();
  }


  getRandomUser() {
    this.http
      .get<any>('https://randomuser.me/api')
      .pipe(
        map((response) => {
          this.user = response.results[0].name;
          this.newUser = {
            name: response.results[0].name.first,
            money: Math.floor(Math.random() * 1000000),
          };
          return this.newUser;
        })
      )
      .subscribe((response) => {
        console.log(response);
        this.addData(this.newUser);
      });
  }

  addData(object) {
    this.data.push(object);
  }

  doubleMoney() {
    this.data = this.data.map((person) => {
      return { ...person, money: person.money * 2 };
    });
  }

  sortByRichest() {
    this.data.sort((a, b) => b.money - a.money);
  }

  showMillionaires() {
    this.data = this.data.filter((person) => {
      return person.money > 1000000;
    });
  }

  calculateWealth() {
    const wealth = this.data.reduce((acc, person) =>
      (acc += person.money)
      , 0);
    this.wealth = wealth;
  }
}
