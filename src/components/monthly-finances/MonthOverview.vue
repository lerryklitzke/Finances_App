<template>
  <section>
    <available-balance
      title="Balance"
      :balance="incomeAmount"
      :percentual="monthBalanceBar"
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
  inject: ['incAmount', 'totAmount', 'monthBalanceB'],
  computed: {
    incomeAmount() {
      const a = this.incAmount();
      return Number(a);
    },
    totalAmount() {
      return this.totAmount();
    },
    monthBalanceBar() {
      return this.monthBalanceB();
    }
  },
};
</script>

<style scoped>
section {
  width: 100%;
}
</style>
