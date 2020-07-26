import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';


import {
  addMonths,
  subMonths,
  startOfMonth,
  subDays,
  addDays,
  startOfDay,
  endOfMonth,
  addHours
} from 'date-fns';

import { CalendarEvent } from 'calendar-utils';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  viewDate: Date = new Date();


  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  view = 'month';

  monthList: Date[] = [];


  ngOnInit() {
    // initialize list of months
    this.monthList = this.getListOfNMonths(3);
    var userData = JSON.parse(localStorage.getItem("userData"));
    var activityPeriodsItem = [];

     for(var i =0; i < userData['activity_periods'].length; i++) {
      activityPeriodsItem.push({
        start: this.getEventDate(userData['activity_periods'][i]['start_time']),
        end: this.getEventDate(userData['activity_periods'][i]['end_time']),
        title: userData['real_name'],
        color: colors.red
      })
    }
    this.events = activityPeriodsItem;
  }

    getEventDate(eventDate) {
      var date;
      if(eventDate.indexOf("AM") !="-1") {
        date = eventDate.replace("AM",":00");
      } else if(eventDate.indexOf("PM") !="-1") {
        date= eventDate.replace("PM",":00");
      }
      return new Date(Date.parse(date));

    }
  /**
   * Callback to handle on month selection
   *
   * @param date
   */
  onMonthSelected(date: Date): void {
    this.viewDate = startOfMonth(date);
  }

  /**
   * To get the list of N previous and next months based on  @param numberOfMonths
   *
   * @param numberOfMonths
   *
   * @returns Date[]
   */
  getListOfNMonths(numberOfMonths: number): Date[] {
    const moths: Date[] = [];
    moths.push(...this.getLastNMonths(numberOfMonths));
    moths.push(new Date());
    moths.push(...this.getNextNMonths(numberOfMonths));
    return moths;
  }

  /**
   * To get the list of previous N months based on the @param date
   *
   * @param numberOfMonths
   * @param date
   *
   * @returns Date[]
   */
  private getLastNMonths(numberOfMonths: number, date: Date = new Date()): Date[] {
    const results: Date[] = [];

    for (let i = numberOfMonths; i > 0; i--) {
      results.push(subMonths(date, i));
    }

    return results;
  }

  /**
   * To get list of next N months based on the @param date
   *
   * @param numberOfMonths
   * @param date
   *
   * @returns Date[]
   */
  private getNextNMonths(numberOfMonths: number, date: Date = new Date()): Date[] {
    const results: Date[] = [];

    for (let i = 1; i <= numberOfMonths; i++) {
      results.push(addMonths(date, i));
    }

    return results;
  }
}
