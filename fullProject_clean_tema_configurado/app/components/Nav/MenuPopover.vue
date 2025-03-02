<template>
  <Transition name="menu-fade">
    <div v-if="visible" class="menu-popover" :style="positionStyle" @click.stop>
      <MenuConfig />
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import MenuConfig from './MenuConfig.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  position: {
    type: Object,
    default: () => ({ top: 0, right: 0 })
  }
});

const emit = defineEmits(['close']);

const positionStyle = computed(() => {
  return {
    top: `${props.position.top}px`,
    right: `${props.position.right}px`
  };
});
</script>

<style scoped>
.menu-popover {
  position: absolute;
  z-index: 1000;
  background-color: var(--surface-card);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  min-width: 250px;
  max-height: 80vh;
  overflow-y: auto;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.2s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
