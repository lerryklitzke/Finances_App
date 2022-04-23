<template>
  <section>
    <available-balance
      title="Balance"
      :balance="incomeAmount"
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
  inject: ['incAmount'],
  computed: {
    incomeDescription() {
      return this.incDescription();
    },
    incomeAmount() {
      return this.incAmount();
    }
  },
  data() {
    return {
      currentBalance: 0,
      currentPercentual: 100,
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
