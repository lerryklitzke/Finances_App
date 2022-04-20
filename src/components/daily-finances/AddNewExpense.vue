<template>
  <base-card>
    <form
      @submit.prevent="
        $emit(
          'new-expense',
          this.$refs.amount.value,
          this.checkbox,
          this.$refs.description.value
        );
        submitted()
      ">
      <h2>Add New Expense</h2>
      <label for="description">Description</label>
      <input class="input-value" type="text" ref="description" required />
      <label for="amount">Amount</label>
      <div class="currency">
        <p class="currency-label">{{ currency }}</p>
        <input
          class="input-value input-number"
          type="number"
          ref="amount"
          required
        />
      </div>
      <div class="checkbox">
        <label for="paid">
          <input type="checkbox" @click="checkboxStatus" />
          Mark as paid
        </label>
      </div>
      <input class="btn" type="submit" value="Add Expense" />
      <base-dialog v-if="formIsSubmitted">
        <template #default>
          <h3>Success</h3>
        </template>
      </base-dialog>
    </form>
  </base-card>
</template>

<script>
export default {
  emits: ['new-expense'],
  data() {
    return {
      currentDate: "any date",
      currency: "US$",
      checkbox: false,
      formIsSubmitted: false,
    };
  },
  watch: {
    formIsSubmitted() {
      if (this.formIsSubmitted === true) {
        const that = this;
        setTimeout(function () {
          that.formIsSubmitted = false;
        }, 1000);
      }
    },
  },
  methods: {
    submitted() {
      this.$refs.description.value = "";
      this.$refs.amount.value = "";

      this.formIsSubmitted = true;
    },
    checkboxStatus() {
      if (this.checkbox === false) {
        this.checkbox = true;
      } else if (this.checkbox === true) {
        this.checkbox = false;
      }
    },
  },
};
</script>

<style scoped>
form {
  position: relative;
  padding: 1.2rem;
  display: grid;
  grid-template-columns: 2fr 2fr;
  grid-gap: 1rem;
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
  grid-column: 1 / span 2;
}

h3 {
  font-size: 25px;
  color: white;
}

/* Classes */
.input-value {
  height: 1.6rem;
  font-size: 16px;
  padding: 0 0.3rem;
  border: #ccc 1px solid;
  max-width: 100%;
}

.btn {
  padding: 0.8rem;
  background: #008b8b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  grid-column: 1 / span 2;
}

.currency {
  display: flex;
}

.currency-label {
  padding: 0 15px;
  border: #ccc 1px solid;
  border-right: 0;
  background: #f4f4f4;
}

.checkbox {
  grid-column: 2 / span 1;
}
</style>
