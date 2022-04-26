<template>
  <TheHeader />
  <main>
    <MonthOverview @selected-day="dayMonthYear" />
    <DayOverview
      @new-income="adjustBalance"
      @paid-item="paidItem"
      @new-expense="subtractFromBalanceB"
      @delete-item="addToBalance"
    />
  </main>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue';
import MonthOverview from './components/monthly-finances/MonthOverview.vue';
import DayOverview from './components/daily-finances/DayOverview.vue';

export default {
  components: {
    TheHeader,
    MonthOverview,
    DayOverview,
  },
  data() {
    return {
      date: 'Today',
      day: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getYear() + 1900,
      incomeAmount: 0,
      totalAmount: 0,
      monthBalanceBar: 100,
    };
  },
  provide() {
    return {
      selectedDate: () => this.date, // Month Day, Year
      selectedDay: () => this.day,
      selectedMonth: () => this.month,
      selectedYear: () => this.year,
      today: () => this.today,
      incAmount: () => this.incomeAmount,
      totAmount: () => this.totalAmount,
      monthBalanceB: () => this.monthBalanceBar,
    };
  },
  computed: {
    today() {
      const day = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getYear() + 1900;

      return `${month} ${day}, ${year}`;
    },
  },
  methods: {
    dayMonthYear(month, day, year) {
      const monthsArr = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      this.day = day;
      this.month = month;
      this.year = year;

      const selectedDate = `${monthsArr[month]} ${day}, ${year}`;

      if (`${month} ${day}, ${year}` === this.today) {
        this.date = 'Today';
      } else {
        this.date = selectedDate;
      }
    },
    // new income
    adjustBalance(amount) {
      this.incomeAmount = parseFloat(this.incomeAmount) + parseFloat(amount);
      this.totalAmount = parseFloat(this.totalAmount) + parseFloat(amount);
      this.monthBalanceBar =
        parseFloat(this.incomeAmount * 100) /
        parseFloat(this.totalAmount).toFixed(1);
    },
    // paid
    paidItem(amount, paid) {
      if (paid === true) {
        this.incomeAmount = this.incomeAmount - amount;
      } else {
        this.incomeAmount = parseFloat(this.incomeAmount) + parseFloat(amount);
      }
      this.monthBalanceBar =
        parseFloat(this.incomeAmount * 100) /
        parseFloat(this.totalAmount).toFixed(1);
    },
    // new item
    subtractFromBalanceB(amount, paid) {
      if (paid === true) {
        this.incomeAmount = this.incomeAmount - amount;
        this.monthBalanceBar =
          parseFloat(this.incomeAmount * 100) /
          parseFloat(this.totalAmount).toFixed(1);
      }
    },
    // delete item
    addToBalance(amount, paid) {
      if (paid === true) {
        this.incomeAmount = parseFloat(this.incomeAmount) + parseFloat(amount);
        this.monthBalanceBar =
          parseFloat(this.incomeAmount * 100) /
          parseFloat(this.totalAmount).toFixed(1);
      }
    },
  },
};
</script>

<style scoped>
main {
  width: 80%;
  margin: auto;
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  grid-gap: 5%;
}

template {
  top: 0;
  left: 0;
}
</style>
