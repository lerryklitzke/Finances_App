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
  inject: ['incAmount', 'totAmount'],
  computed: {
    incomeAmount() {
      return this.incAmount();
    },
    totalAmount() {
      return this.totAmount();
    },
  },
  data() {
    return {
      currentPercentual: 100,
    };
  },
};
</script>

<style scoped>
section {
  width: 100%;
}
</style>
