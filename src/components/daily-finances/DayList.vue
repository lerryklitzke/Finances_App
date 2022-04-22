<template>
  <base-card>
    <div class="item" v-for="(item, index) in dayExpensesArr" :key="index">
      <i
        v-if="dayExpensesArr[index].name !== 'Nothing here'"
        class="fa-solid fa-circle-xmark delete-icon"
        @click="deleteItem(item.id)"
      ></i>
      <div class="item-info" :class="item.paid === true ? 'paid' : ''">
        <p>{{ item.name }}</p>
        <p v-if="dayExpensesArr[index].price !== ''">US$ {{ item.price }}</p>
      </div>
      <input
        v-if="dayExpensesArr[index].name !== 'Nothing here'"
        type="checkbox"
        @click="paid(item.id, item.price)"
      />
    </div>
  </base-card>
</template>

<script>
export default {
  inject: ['selectedDay', 'selectedMonth', 'selectedYear'],
  data() {
    return {

    };
  },
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

      if (
        allExpenses === null ||
        allExpenses[this.year] === undefined ||
        allExpenses[this.year][this.month] === undefined ||
        allExpenses[this.year][this.month][this.day] === undefined ||
        allExpenses[this.year][this.month][this.day].length === 0
      ) {
        const arr = [{ name: 'Nothing here', price: '' }];
        return arr;
      }

      const dayExpenses = allExpenses[this.year][this.month][this.day];

      for (let i = 0; i < dayExpenses.length; i++) {
        if (dayExpenses[i].paid === false) {
          expensesArr.unshift(dayExpenses[i]);
        } else {
          expensesArr.push(dayExpenses[i]);
        }
      }

      return expensesArr;
    },
  },
  methods: {
    deleteItem(id) {
      const allExpenses = JSON.parse(localStorage.getItem('allExpenses'));

      const i = allExpenses[this.year][this.month][this.day].findIndex(
        (item) => item.id === id
      );
      this.$emit('delete-item', allExpenses[this.year][this.month][this.day][i].price);

      allExpenses[this.year][this.month][this.day].splice(i, 1);

      localStorage.setItem('allExpenses', JSON.stringify(allExpenses));
    },
    paid(id, price) {
      const allExpenses = JSON.parse(localStorage.getItem('allExpenses'));
      const dayExpensesArr = allExpenses[this.year][this.month][this.day];
      const expenseIndex = dayExpensesArr.findIndex((item) => item.id === id);
      const newArr = [];
      newArr.push(dayExpensesArr[expenseIndex]);
      newArr[0].paid = !newArr[0].paid;

      if(newArr[0].paid === false) {
        allExpenses[this.year][this.month][this.day].splice(expenseIndex, 1);
        allExpenses[this.year][this.month][this.day].unshift(newArr[0]);
      } else {
        allExpenses[this.year][this.month][this.day].splice(expenseIndex, 1);
        allExpenses[this.year][this.month][this.day].push(newArr[0]);
      }

      this.$emit('paid-item', price, newArr[0].paid);

      localStorage.setItem('allExpenses', JSON.stringify(allExpenses));
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

.paid {
  text-decoration: line-through;
  color: #aaa;
}
</style>
