<template>
  <div class="theme-customizer p-3 border rounded-lg shadow-sm">
    <h3 class="text-lg font-semibold mb-3">Theme Customizer</h3>
    
    <!-- Theme Presets -->
    <div class="mb-4">
      <label class="block mb-2 font-medium">Preset Themes</label>
      <div class="flex flex-wrap gap-2">
        <Button 
          v-for="theme in themeStore.themes" 
          :key="theme.id"
          class="theme-preset-button p-button-sm"
          :class="{ 'p-button-outlined': theme.id !== currentTheme.id }"
          :style="{
            backgroundColor: theme.id === currentTheme.id ? theme.linkColor : 'transparent!important',
            color: theme.id === currentTheme.id ? '#fff' : theme.linkColor+'!important',
            borderColor: theme.linkColor
          }"
          @click="selectTheme(theme.id)"
        >
          <div class="flex items-center">
            <div class="color-preview mr-2 border" :style="{ backgroundColor: theme.linkColor }"></div>
            {{ theme.name }}
          </div>
        </Button>
      </div>
    </div>
    
    <!-- Custom Colors -->
    <div class="mb-4">
      <label class="block mb-2 font-medium">Customize Colors</label>
      
      <div class="grid grid-cols-2 gap-3">
        <div class="color-picker-group">
          <label class="block text-sm mb-1">Primary</label>
          <div class="flex items-center">
            <ColorPicker v-model="customColors.primary" format="hex" />
            <span class="ml-2 text-xs">{{ customColors.primary }}</span>
          </div>
        </div>
        
        <div class="color-picker-group">
          <label class="block text-sm mb-1">Secondary</label>
          <div class="flex items-center">
            <ColorPicker v-model="customColors.secondary" format="hex" />
            <span class="ml-2 text-xs">{{ customColors.secondary }}</span>
          </div>
        </div>
        
        <div class="color-picker-group">
          <label class="block text-sm mb-1">Text</label>
          <div class="flex items-center">
            <ColorPicker v-model="customColors.text" format="hex" />
            <span class="ml-2 text-xs">{{ customColors.text }}</span>
          </div>
        </div>
        
        <div class="color-picker-group">
          <label class="block text-sm mb-1">Background</label>
          <div class="flex items-center">
            <ColorPicker v-model="customColors.background" format="hex" />
            <span class="ml-2 text-xs">{{ customColors.background }}</span>
          </div>
        </div>
      </div>
      
      <Button label="Apply Custom Theme" icon="pi pi-check" class="mt-3 p-button-sm" @click="applyCustomTheme" />
    </div>
    
    <!-- Theme Elements -->
    <div>
      <label class="block mb-2 font-medium">Theme Preview</label>
      <div class="theme-preview p-3 border rounded">
        <div class="flex flex-col gap-2">
          <Button label="Primary Button" />
          <Button label="Secondary Button" class="p-button-secondary" />
          <div>
            <a href="#" class="mr-2">Link Example</a>
            <span class="text-sm">Text example</span>
          </div>
          <div class="flex gap-2">
            <Badge value="New" />
            <Badge value="Updated" severity="success" />
            <Badge value="Alert" severity="danger" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.currentTheme);

// Custom color values
const customColors = ref({
  primary: '#4F46E5',
  secondary: '#10B981',
  text: '#1F2937',
  background: '#ffffff'
});

// Initialize custom colors based on current theme
onMounted(() => {
  customColors.value.primary = currentTheme.value.linkColor;
  customColors.value.secondary = currentTheme.value.selectedBackground;
  customColors.value.text = currentTheme.value.textColor;
  customColors.value.background = currentTheme.value.background;
});

// Select a preset theme
function selectTheme(themeId) {
  themeStore.setTheme(themeId);
  
  // Update custom colors to match selected theme
  customColors.value.primary = currentTheme.value.linkColor;
  customColors.value.secondary = currentTheme.value.selectedBackground;
  customColors.value.text = currentTheme.value.textColor;
  customColors.value.background = currentTheme.value.background;
}

// Apply custom theme
function applyCustomTheme() {
  // Generate a unique ID for the custom theme
  const customThemeId = `custom-${Date.now()}`;
  
  // Create a custom theme
  const customTheme = {
    id: customThemeId,
    name: 'Custom Theme',
    background: customColors.value.background,
    selectedBackground: customColors.value.secondary,
    textColor: customColors.value.text,
    linkColor: customColors.value.primary,
    linkHoverColor: adjustColor(customColors.value.primary, -20), // Slightly darker for hover
    isDark: isColorDark(customColors.value.background)
  };
  
  // Add the custom theme to the store
  themeStore.addCustomTheme(customTheme);
  
  // Apply the custom theme
  themeStore.setTheme(customThemeId);
}

// Helper function to determine if a color is dark
function isColorDark(hexColor) {
  // Remove # if present
  hexColor = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  
  // Calculate brightness (YIQ formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Return true if the color is dark (brightness < 128)
  return brightness < 128;
}

// Helper function to adjust a color's brightness
function adjustColor(hexColor, percent) {
  // Remove # if present
  hexColor = hexColor.replace('#', '');
  
  // Convert hex to RGB
  let r = parseInt(hexColor.substr(0, 2), 16);
  let g = parseInt(hexColor.substr(2, 2), 16);
  let b = parseInt(hexColor.substr(4, 2), 16);
  
  // Adjust each component
  r = Math.max(0, Math.min(255, r + percent));
  g = Math.max(0, Math.min(255, g + percent));
  b = Math.max(0, Math.min(255, b + percent));
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
</script>

<style scoped>
.theme-customizer {
  width: 340px;
  background-color: var(--app-background);
}

.color-preview {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.theme-preset-button {

  min-width: 100px;
}

:deep(.p-colorpicker) {
  width: 30px;
  height: 30px;
}

:deep(.p-colorpicker-panel) {
  z-index: 9999;
}
</style>
