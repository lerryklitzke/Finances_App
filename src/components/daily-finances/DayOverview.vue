<template>
  <section>
    <available-balance
      :title="currentDate"
      :balance="currentBalance"
      :percentual="currentPercentual"
    ></available-balance>
    <day-expenses></day-expenses>
  </section>
</template>

<script>
import AvailableBalance from "../UI/AvailableBalance.vue";
import DayExpenses from './DayExpenses.vue'

export default {
  components: {
    AvailableBalance,
    DayExpenses
  },
  inject: ['selectedDate'],
  computed: {
    currentDate() {
      return this.selectedDate();
    }
  },
  data() {
    return {
      currentBalance: 200,
      currentPercentual: 90,
    };
  }
};
</script>
