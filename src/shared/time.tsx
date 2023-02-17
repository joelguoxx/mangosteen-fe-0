export class Time {
  date: Date;
  constructor(date = new Date()) {
    this.date = date;
  }
  format(pattern = 'YYYY-MM-DD') {
    const year = this.date.getFullYear()
    const month = this.date.getMonth() + 1
    const day = this.date.getDate()
    const hour = this.date.getHours()
    const minute = this.date.getMinutes()
    const second = this.date.getSeconds()
    const msecond = this.date.getMilliseconds()
    return pattern.replace(/YYYY/g, year.toString())
      .replace(/MM/, month.toString().padStart(2, '0'))
      .replace(/DD/, day.toString().padStart(2, '0'))
      .replace(/HH/, hour.toString().padStart(2, '0'))
      .replace(/mm/, minute.toString().padStart(2, '0'))
      .replace(/ss/, second.toString().padStart(2, '0'))
      .replace(/SSS/, msecond.toString().padStart(3, '0'))
  }
  firstDayOfMonth() {
    return new Time(new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0))
  }
  firstDayOfYear() {
    return new Time(new Date(this.date.getFullYear(), 0, 1, 0, 0, 0))
  }
  lastDayOfMonth() {
    return new Time(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 0, 0, 0))
  }
  lastDayOfYear() {
    new Time(new Date(this.date.getFullYear() + 1, 0, 0, 0, 0, 0))
  }
  add(amount: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond') {
    let date = new Date(this.date.getTime())
    switch (unit) {
      case 'year':
        date.setFullYear(date.getFullYear() + amount);
        break;
      case 'month':
        //获取当前月份的天数 1.31
        const d1 = date.getDate()//31天
        //重置当前月份的第一天
        date.setDate(1)//1.1
        //当期月份加一个月 
        date.setMonth(date.getMonth() + amount)//2.1
        //获取后一个月的天数
        const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0).getDate()
        //设置最后的日期
        date.setDate(Math.min(d1, d2))
        break;
      case 'day':
        date.setMonth(date.getDate() + amount);
        break;
      case 'hour':
        date.setMonth(date.getHours() + amount);
        break;
      case 'minute':
        date.setMonth(date.getMinutes() + amount);
        break;
      case 'second':
        date.setMonth(date.getSeconds() + amount);
        break;
      case 'millisecond':
        date.setMonth(date.getMilliseconds() + amount);
        break;
    }
  }
}


