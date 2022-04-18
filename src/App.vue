<template>
  <TheHeader />
  <main>
    <MonthOverview @selected-day="dayMonthYear" />
    <DayOverview />
  </main>
</template>

<script>
import TheHeader from "./components/layouts/TheHeader.vue";
import MonthOverview from "./components/monthly-finances/MonthOverview.vue";
import DayOverview from "./components/daily-finances/DayOverview.vue";

export default {
  components: {
    TheHeader,
    MonthOverview,
    DayOverview,
  },
  data() {
    return {
      date: "Today",
      day: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getYear() + 1900,
    };
  },
  provide() {
    return {
      selectedDate: () => this.date, // Month Day, Year
      selectedDay: () => this.day, 
      selectedMonth: () => this.month,
      selectedYear: () => this.year,
      today: () => this.today,
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
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      this.day = day;
      this.month = month;
      this.year = year;

      const selectedDate = `${monthsArr[month]} ${day}, ${year}`;

      if (`${month} ${day}, ${year}` === this.today) {
        this.date = "Today";
      } else {
        this.date = selectedDate;
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
