<template>
  <base-card>
    <div class="item" v-for="(item, index) in dayExpensesArr" :key="index">
      <i class="fa-solid fa-circle-xmark delete-icon"></i>
      <div class="item-info">
        <p>{{ item.name }}</p>
        <p>US$ {{ item.price }}</p>
      </div>
      <input type="checkbox" />
    </div>
  </base-card>
</template>

<script>
export default {
  inject: ['selectedDay', 'selectedMonth', 'selectedYear'],
  computed: {
    day() {
      return this.selectedDay();
    },
    month() {
      return this.selectedMonth();
    },
    year() {
      return this.selectedYear();
    },
    dayExpensesArr() {
      const expensesArr = [];

      const allExpenses = JSON.parse(localStorage.getItem('allExpenses'));

      if (allExpenses === null) {
        const arr = [{ name: '. . . Add a New Expense 👆', price: '' }];
        return arr;
      }

      const dayExpenses = allExpenses[this.year][this.month][this.day];

      for (let i = 0; i < dayExpenses.length; i++) {
        expensesArr.unshift(dayExpenses[i]);
      }

      return expensesArr;
    },
  },
};
</script>

<style scoped>
input {
  cursor: pointer;
}

.item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.item-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  text-align: center;
  user-select: none;
}

.delete-icon {
  color: #aaa;
  cursor: pointer;
}
</style>
