<template>
  <div id="balance">
    <h2>{{ title }}</h2>
    <p>
      R$ <span>{{ balance }}</span> left ({{ percentual }}%)
    </p>
    <base-card>
      <template #default>
        <div id="balance-bar">
          <div
            :style="{width: percentual + '%'}"
            :class="['available-balance', balance < 0 ? 'negative' : '']"
          ></div>
        </div>
      </template>
    </base-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: 'Today'
    },
    balance: {
      required: true
    },
    percentual: {
      required: true
    }
  }
}
</script>

<style scoped>
h2 {
  width: 100%;
  text-align: center;
  padding: 0.5rem 0;
}

p {
  margin-bottom: 0.5rem;
}

span {
  font-weight: bold;
}

#balance {
  margin-bottom: 1rem;
}

#balance-bar {
  width: 100%;
  height: 20px;
  margin: auto;
  overflow: hidden;
}

.available-balance {
  background: #00a86b;
  max-width: 100%;
  height: 100%;
}

.negative {
  background: #ff2a2a;
}
</style>
