<template>
  <section>
    <available-balance
      title="Month Balance"
      :balance="currentBalance"
      :percentual="currentPercentual"
    ></available-balance>
    <month-calendar v-bind="$attrs"></month-calendar>
  </section>
</template>

<script>
import AvailableBalance from "../UI/AvailableBalance.vue";
import MonthCalendar from "./MonthCalendar.vue";

export default {
  components: {
    AvailableBalance,
    MonthCalendar,
  },
  data() {
    return {
      currentBalance: 7000,
      currentPercentual: 75,
    };
  },
  methods: {
    test(month, day, year) {
      this.anything = `${month} ${day}, ${year}`;
    }
  }
};
</script>

<style scoped>
section {
  width: 100%;
}
</style>
