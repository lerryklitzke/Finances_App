<template>
  <base-card>
    <div class="item" v-for="(item, index) in dayExpensesArr" :key="index">
      <i
        v-if="dayExpensesArr[index].name !== 'Nothing here'"
        class="fa-solid fa-circle-xmark delete-icon"
        @click="deleteItem(item.id)"
      ></i>
      <div class="item-info">
        <p>{{ item.name }}</p>
        <p v-if="dayExpensesArr[index].price !== ''">US$ {{ item.price }}</p>
      </div>
      <input
        v-if="dayExpensesArr[index].name !== 'Nothing here'"
        type="checkbox"
      />
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

      const dayExpenses = allExpenses[this.year][this.month][this.day];

      if (
        allExpenses === null ||
        dayExpenses === undefined ||
        dayExpenses.length === 0
      ) {
        const arr = [{ name: 'Nothing here', price: '' }];
        return arr;
      }

      for (let i = 0; i < dayExpenses.length; i++) {
        expensesArr.unshift(dayExpenses[i]);
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
      allExpenses[this.year][this.month][this.day].splice(i, 1);

      localStorage.setItem('allExpenses', JSON.stringify(allExpenses));

      this.$emit('delete-item');
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
