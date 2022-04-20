<template>
  <section>
    <available-balance
      :title="currentDate"
      :balance="currentBalance"
      :percentual="currentPercentual"
    ></available-balance>
    <day-expenses @paid-item="decrementBalance" @new-expense="adjustBalance"></day-expenses>
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
      currentBalance: 0,
      currentPercentual: 100,
      itemsSum: 0
    };
  },
  methods: {
    decrementBalance(amount) {
      this.currentPercentual = this.currentPercentual - ((this.currentPercentual * amount) / this.currentBalance);
      this.currentBalance = this.currentBalance - amount;
    },
    adjustBalance(amount, check) {
      if (check === false) {
        this.itemsSum = parseFloat(this.itemsSum) + parseFloat(amount);
        const a = this.currentPercentual + ((this.currentPercentual * amount) / this.itemsSum);
        this.currentBalance = parseFloat(this.currentBalance) + parseFloat(amount);
        this.currentPercentual = Number(a.toFixed(1));
        if (this.currentPercentual > 100) {
          this.currentPercentual = 100;
        }
        // there is a problem in percentual here
      } else {
        this.itemsSum = parseFloat(this.itemsSum) + parseFloat(amount);
        this.currentPercentual = this.currentPercentual - ((this.currentPercentual * amount) / this.itemsSum);
        this.currentBalance = this.currentBalance - amount;
        this.currentPercentual = Number(this.currentPercentual.toFixed(1));
        if (this.currentPercentual < 0) {
          this.currentPercentual = 0;
        }
      }
    }
  },
};
</script>
