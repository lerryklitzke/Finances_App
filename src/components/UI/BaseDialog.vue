<template>
  <dialog open>
    <slot></slot>
  </dialog>
</template>

<style scoped>
dialog {
  width: 100%;
  height: 100%;
  border: none;
  background: #00a86b;
  padding: 0.5rem 1rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>