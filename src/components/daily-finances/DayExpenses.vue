<template>
  <section id="day-expenses">
    <div id="buttons">
      <button>Go to Today</button>
      <button :class="buttonClass" @click="toggleComponent">
        {{ toggleButtonName }}
      </button>
    </div>
    <keep-alive>
      <component
        :is="currentComponent"
        @new-expense="addExpense"
        @delete-item="keyIncrement"
        @paid-item="keyIncrement"
        :key="componentKey"
      />
    </keep-alive>
  </section>
</template>

<script>
import DayList from './DayList.vue';
import AddNewExpense from './AddNewExpense.vue';

export default {
  components: {
    DayList,
    AddNewExpense,
  },
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
  },
  data() {
    return {
      componentKey: 0,
      currentComponent: 'DayList',
      toggleButtonName: 'Add New Expense',
      buttonClass: 'expense',
      allExpenses: {},
    };
  },
  methods: {
    toggleComponent() {
      if (this.currentComponent === 'AddNewExpense') {
        this.currentComponent = 'DayList';
        this.toggleButtonName = 'Add New Expense';
        this.buttonClass = 'expense';
        this.componentKey += 1;
      } else {
        this.currentComponent = 'AddNewExpense';
        this.toggleButtonName = 'Back to List';
        this.buttonClass = 'back-to-list';
        this.componentKey += 1;
      }
    },
    keyIncrement() {
      this.componentKey += 1;
    },
    addExpense(description, amount, checkbox) {
      const that = this;
      const expense = {
        id: Math.random(),
        date: `${that.month + 1} ${that.day}, ${that.year}`,
        name: description,
        price: amount,
        paid: checkbox,
      };

      const obj = {
        [this.year]: {
          [this.month]: {
            [this.day]: [expense],
          },
        },
      };

      const allExpensesExist = localStorage.getItem('allExpenses');

      if (allExpensesExist === null) {
        localStorage.setItem('allExpenses', JSON.stringify(this.allExpenses));
      }

      const a = JSON.parse(localStorage.getItem('allExpenses'));

      if (Object.prototype.hasOwnProperty.call(a, this.year) === false) {
        a[this.year] = obj[this.year];
      } else if (
        Object.prototype.hasOwnProperty.call(a[this.year], this.month) === false
      ) {
        a[this.year][this.month] = obj[this.year][this.month];
      } else if (
        Object.prototype.hasOwnProperty.call(
          a[this.year][this.month],
          this.day
        ) === false
      ) {
        a[this.year][this.month][this.day] =
          obj[this.year][this.month][this.day];
      } else {
        a[this.year][this.month][this.day].unshift(expense);
      }

      localStorage.setItem('allExpenses', JSON.stringify(a));
    },
  },
};
</script>

<style scoped>
#buttons {
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: 1rem;
  margin-bottom: 1rem;
}

.expense {
  background: #ff2a2a;
}

.back-to-list {
  background: #00a86b;
}
</style>
