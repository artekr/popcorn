import { Pipe, PipeTransform } from '@angular/core';

import { Comment } from './comment.model';

@Pipe({ 
    name: 'convertToDate'
})
export class ConvertToDatePipe implements PipeTransform {
  transform(date: string) {
    var newDate = new Date(date);
    return DateDiff.getDiff(newDate, new Date());
  }
}

var DateDiff = {

  getDiff: function(d1: Date, d2: Date) {

    var minuteDiff = DateDiff.inMinutes(d1, d2);

    if (minuteDiff < 1) {
      return "刚刚"
    }

    if (minuteDiff < 60) {
      return String(minuteDiff) + " 分钟前"
    }

    var hourDiff = DateDiff.inHours(d1, d2);
    if (hourDiff < 24) {
      return String(hourDiff) + " 小时前"
    }

    var dayDiff = DateDiff.inDays(d1, d2);
    if (dayDiff <= 31) {
      return String(dayDiff) + " 天前"
    }

    var monthDiff = DateDiff.inMonths(d1, d2);
    if (monthDiff < 12) {
      return String(monthDiff) + " 个月前"
    }

    var yearDiff = DateDiff.inYears(d1, d2);    
    return String(yearDiff) + " 年前"

  },

  inMinutes: function(d1: Date, d2: Date) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();
    return Math.floor((t2-t1)/(60*1000));
  },

  inHours: function(d1: Date, d2: Date) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();
    return Math.floor((t2-t1)/(3600*1000));
  },

  inDays: function(d1: Date, d2: Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return Math.floor((t2-t1)/(24*3600*1000));
  },

  inWeeks: function(d1: Date, d2: Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return Math.floor((t2-t1)/(24*3600*1000*7));
  },

  inMonths: function(d1: Date, d2: Date) {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();
      return (d2M+12*d2Y) - (d1M+12*d1Y);
  },

  inYears: function(d1: Date, d2: Date) {
      return d2.getFullYear() - d1.getFullYear();
  }
}