<template>
  <section id="calendar">
    <base-card>
      <template #default>
        <div id="calendar-head">
          <div class="btn" @click="previousMonth">&lt;</div>
          <div class="title">{{ month }} {{ currentYear }}</div>
          <div class="btn" @click="nextMonth">&gt;</div>
        </div>
        <div id="calendar-grid">
          <div class="calendar-cell week-day">Sun</div>
          <div class="calendar-cell week-day">Mon</div>
          <div class="calendar-cell week-day">Tue</div>
          <div class="calendar-cell week-day">Wed</div>
          <div class="calendar-cell week-day">Thu</div>
          <div class="calendar-cell week-day">Fri</div>
          <div class="calendar-cell week-day">Sat</div>
          <div
            class="calendar-cell"
            :key="index"
            v-for="(empty, index) in firstDay"
          ></div>
          <div
            class="calendar-cell selected-day"
            :class="
              [this.todayIs ===
              `${this.currentMonth} ${day}, ${this.currentYear}`
                ? 'today'
                : ''
              ,
              day < this.thisDay && 
              this.currentMonth <= this.thisMonth &&
              this.currentYear <= this.thisYear ||
              this.currentMonth < this.thisMonth &&
              this.currentYear <= this.thisYear ||
              this.currentYear < this.thisYear ? 'passed-day' : ''
              ,
              this.clickedDay === day &&
              this.currentMonth === this.thisMonth &&
              this.currentYear === this.thisYear ? 'clicked' : ''
              ]
            "
            :key="index"
            v-for="(day, index) in days"
            @click="
              [$emit('selected-day', this.currentMonth, day, this.currentYear),
              pickedDay(day)]
            "
          >
            {{ day }}
          </div>
        </div>
      </template>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getYear() + 1900,
      currentMonth: new Date().getMonth(),
      thisYear: new Date().getYear() + 1900,
      thisMonth: new Date().getMonth(),
      thisDay: new Date().getDate(),
      clickedDay: null,
    };
  },
  inject: ['today'],
  emits: ['selected-day'],
  computed: {
    todayIs() {
      return this.today();
    },
    days() {
      const arrDays = [];

      function allDays(year, month) {
        return new Date(year, month, 0).getDate();
      }
      const numberOfDays = allDays(this.currentYear, this.currentMonth + 1);

      for (let i = 1; i <= numberOfDays; i++) {
        arrDays.push(i);
      }

      return arrDays;
    },
    firstDay() {
      function dayOfTheWeek(year, month) {
        return new Date(year, month, 1).getDay();
      }

      const emptyCells = dayOfTheWeek(this.currentYear, this.currentMonth);

      const emptyCellsArr = [];

      for (let i = 0; i < emptyCells; i++) {
        emptyCellsArr.push(i);
      }

      return emptyCellsArr;
    },
    month() {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return months[this.currentMonth];
    },
  },
  methods: {
    previousMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 12;
        this.currentYear--;
      }
      this.currentMonth--;
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = -1;
        this.currentYear++;
      }
      this.currentMonth++;
    },
    pickedDay(d) {
      this.clickedDay = d;
    }
  },
};
</script>

<style scoped>
#calendar {
  width: 100%;
  user-select: none;
}

#calendar-head {
  text-align: center;
  padding: 0.6rem 0;
  display: flex;
  justify-content: space-between;
  background: darkcyan;
}

#calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  padding: 0.8rem;
  font-weight: 500;
}

.calendar-cell {
  height: 2rem;
  text-align: center;
  padding-top: 4px;
  color: #333;
}

.today {
  background: #ddd;
  border-radius: 5px;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  margin: auto;
}

.week-day {
  font-weight: 400;
  color: #666;
}

.selected-day:hover {
  background: rgba(0, 139, 139, 0.6);
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  transition: 0.2s ease-in;
}

.clicked {
  background: rgba(0, 139, 139, 0.8);
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  transition: 0.2s ease-in;
}

.btn {
  cursor: pointer;
  width: 38px;
  height: 38px;
  font-size: 1.5rem;
  text-align: center;
  color: white;
  margin: 0 1rem;
}

.btn:hover {
  color: white;
  background: rgba(256, 256, 256, 0.1);
  border-radius: 50%;
}

.passed-day {
  color: #aaa;
}
</style>
