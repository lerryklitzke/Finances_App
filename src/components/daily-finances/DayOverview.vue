<template>
  <section>
    <available-balance
      :key="keyIncrement"
      :title="currentDate"
      :balance="currentBalance"
      :percentual="currentPercentual"
    ></available-balance>
    <day-expenses @paid-item="itemCheck" @new-expense="adjustBalance" @delete-item="deleteItem"></day-expenses>
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
    },
    balance() {
      const a = JSON.parse(localStorage.getItem('allExpenses'));
      if(a === null) {
        return 0;
      } else {
        const b = a.values[0]
        return b;
      }
    },
    percentual() {
      const a = JSON.parse(localStorage.getItem('allExpenses'));
      if (a === null) {
        return 100;
      } else {
        const b = a.values[1];
        return b;
      }
    }
  },
  data() {
    return {
      keyIncrement: 0,
      currentBalance: 0,
      currentPercentual: 100,
      itemsSum: 0
    };
  },
  methods: {
    // when the expense is deleted from the list
    deleteItem(amount) {
      this.itemsSum = parseFloat(this.itemsSum) - amount;
      this.currentBalance = parseFloat(this.currentBalance) - amount;
      this.currentPercentual = ((100 * parseFloat(this.currentBalance)) / parseFloat(this.itemsSum)).toFixed(1);
    },
    // for checked
    itemCheck(amount, paid) {      
      if (paid === true) {
        this.currentBalance = this.currentBalance - amount;
        this.currentPercentual = ((100 * this.currentBalance) / this.itemsSum).toFixed(1);
      } else {
        this.currentBalance = parseFloat(this.currentBalance) + parseFloat(amount);
        this.currentPercentual = ((100 * this.currentBalance) / this.itemsSum).toFixed(1);
      }
    },
    // for new-expense
    adjustBalance(amount, paid) {
      if (paid === false) {
        this.itemsSum = parseFloat(this.itemsSum) + parseFloat(amount);
        this.currentBalance = parseFloat(this.currentBalance) + parseFloat(amount);
        const a = (this.currentBalance * 100) / this.itemsSum;
        this.currentPercentual = Number(a.toFixed(1));
      } else {
        this.itemsSum = parseFloat(this.itemsSum) + parseFloat(amount);
        this.currentBalance = this.currentBalance - amount + parseFloat(amount);
        const a = (this.currentBalance * 100) / this.itemsSum;
        this.currentPercentual = Number(a.toFixed(1));
      }
    }
  },
};
</script>
