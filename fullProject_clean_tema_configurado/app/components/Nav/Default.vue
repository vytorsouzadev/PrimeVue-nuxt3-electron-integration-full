
<template>
  <nav class="m-2">
  <div class="card shadow-sm ">
    <!--brekpoint define quando  o menu deve diminuir -->
      <Menubar :model="items" breakpoint="620px">
          <template #start>
              <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8">
                  <path
                      d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                      fill="var(--p-primary-color)"
                  />
                  <path
                      d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                      fill="var(--p-text-color)"
                  />
              </svg>
          </template>
          <template #item="{ item, props, hasSubmenu, root }">
              <a v-ripple class="flex items-center" v-bind="props.action">
                  <span>{{ item.label }}</span>
                  <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                  <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                  <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
              </a>
          </template>
          <template #end>
              <div class="flex items-center gap-2">
                  <div 
                  class="transition-all duration-300 overflow-hidden" 
                  :class="[
                      (isFocused || !!inputSearch || isHovered) ? 'w-60' : 'w-10',
                      (isFocused || !!inputSearch || isHovered) ? 'p-iconfield-expanded' : 'p-iconfield-collapsed'
                  ]"
                  @mouseenter="isHovered = true"
                  @mouseleave="isHovered = false"
                  >
                  <IconField class="w-full">
                      <InputText 
                      v-model="inputSearch" 
                      variant="filled" 
                      placeholder="Pesquisar..."
                      @focus="isFocused = true"
                      @blur="isFocused = false"
                      @input="handleInput"
                      class="transition-all"
                      />
                      <InputIcon :class="['cursor-pointer', isTyping ? 'pi pi-spin pi-spinner' : 'pi pi-search']" />
                  </IconField>
                  </div>
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                  
                  <!-- Theme Selector Dropdown -->
                <Dropdown 
  v-model="selectedTheme" 
  :options="themeOptions" 
  option-label="name"
  placeholder="Select Theme"
  class="w-auto"
>
  <template #value="slotProps">
    <div class="flex items-center">
      <div 
        class="w-6 h-6 mr-2 rounded border border-gray-300 flex flex-row overflow-hidden" 
      >
        <div class="w-1/2 h-full" :style="{ backgroundColor: slotProps.value?.linkColor || '#ccc' }"></div>
        <div class="w-1/2 h-full" :style="{ backgroundColor: slotProps.value?.selectedBackground || '#eee' }"></div>
      </div>
      <div>{{ slotProps.value ? slotProps.value.name : 'Select Theme' }}</div>
    </div>
  </template>
  <template #option="slotProps">
    <div class="flex items-center p-2 cursor-pointer hover:bg-gray-100">
      <div 
        class="w-6 h-6 mr-2 rounded border border-gray-300 flex flex-row overflow-hidden" 
      >
        <div class="w-1/2 h-full" :style="{ backgroundColor: slotProps.option.linkColor }"></div>
        <div class="w-1/2 h-full" :style="{ backgroundColor: slotProps.option.selectedBackground }"></div>
      </div>
      <div>{{ slotProps.option.name }}</div>
      <Badge v-if="slotProps.option.isDark" value="Dark" severity="info" class="ml-2"></Badge>
    </div>
  </template>
</Dropdown>
                  <div class="card flex justify-center relative">
                        <!-- Botão que mostra o menu -->
                        <Button 
                          ref="menuButton" 
                          type="button" 
                          icon="pi pi-bars" 
                          @click="toggleMenu"
                          aria-haspopup="true" 
                        />
                        
                        <!-- Menu popover -->
                        <NavMenuPopover 
                          :visible="menuVisible"
                          :position="menuPosition"
                          @close="menuVisible = false"
                        />
                    </div>
                </div>
            </template>
        </Menubar>
    </div>
    
    </nav>
</template>

<script setup>

const router = useRouter();


// Suas referências existentes
const inputSearch = ref('');
const isFocused = ref(false);
const isHovered = ref(false);

// Theme store
const themeStore = useThemeStore();
const selectedTheme = computed({
  get: () => themeStore.currentTheme,
  set: (value) => {
    if (value && value.id) {
      themeStore.setTheme(value.id);
    }
  }
});

// Create options for dropdown
const themeOptions = computed(() => themeStore.themes);

//controla o config Menu
// Nova referência para controlar o painel lateral
const menuButton = ref(null);
const menuVisible = ref(false);
const menuPosition = ref({ top: 0, right: 0 });

// Função para alternar o menu
const toggleMenu = (event) => {
  event.stopPropagation();
  
  if (!menuVisible.value) {
    calculateMenuPosition();
  }
  
  menuVisible.value = !menuVisible.value;
};

// Calcular a posição do menu baseado no botão
const calculateMenuPosition = () => {
  if (menuButton.value) {
    const rect = menuButton.value.$el.getBoundingClientRect();
    menuPosition.value = {
      top: rect.bottom + 5,
      right: window.innerWidth - rect.right
    };
  }
};

// Fechar o menu quando clicar fora dele
const handleClickOutside = (event) => {
  if (menuVisible.value && !event.target.closest('.menu-popover') && 
      menuButton.value && !menuButton.value.$el.contains(event.target)) {
    menuVisible.value = false;
  }
};

// Adicionar e remover event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', calculateMenuPosition);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', calculateMenuPosition);
});

// Nova referência para controlar o estado do ícone
const isTyping = ref(false);
let typingTimer = null;

// Função para lidar com o evento de digitação
const handleInput = () => {
  // Ativa o ícone de loading
  isTyping.value = true;
  
  // Limpa o timer anterior se existir
  if (typingTimer) clearTimeout(typingTimer);
  
  // Define um novo timer - o ícone volta ao normal após 800ms sem digitação
  typingTimer = setTimeout(() => {
    isTyping.value = false;
  }, 800);
};
//menu center bar
const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          router.push('/');
        }
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',
        badge: 3,
        items: [
            {
                label: 'Core',
                icon: 'pi pi-bolt',
                shortcut: '⌘+S'
            },
            {
                label: 'Blocks',
                icon: 'pi pi-server',
                shortcut: '⌘+B'
            },
            {
                separator: true
            },
            {
                label: 'UI Kit',
                icon: 'pi pi-pencil',
                shortcut: '⌘+U'
            }
        ]
    }
]);
</script>


<style lang="scss" scoped>
.navbar {
    background-color: #1e293b;
    padding: 1.5rem 2rem;
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #1e293b;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.nav-link {
    background: #1e293b;
    color: #ffffff;
    text-decoration: none;
    padding: 0.75rem 1.25rem;
    border-radius: 0.375rem;
    font-family: 'Arial', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    border: 1px solid #ffcc00;
}

.nav-link:hover {
    background-color: #ffcc00;
    color: #1e293b;
}


//efeitos de transiçao do input search
/* Adicione estes estilos para o efeito de transição */
.p-iconfield-collapsed .p-inputtext {
  padding-left: 0.5rem !important;
  padding-right: 2.5rem !important;
}

.p-iconfield-collapsed .p-inputicon {
  z-index: 10;
}

/* Este estilo faz o placeholder desaparecer quando contraído */
.p-iconfield-collapsed .p-inputtext{
    opacity: 0;
    transition: opacity 3s;
}
.p-iconfield-collapsed .p-inputtext::placeholder {
  opacity: 0;
  transition: opacity 0.2s;
}


.p-iconfield-expanded .p-inputtext{
    opacity: 1;
    transition: opacity 0.9s ease 0.1s;
}
.p-iconfield-expanded .p-inputtext::placeholder {
  opacity: 1;
  transition: opacity 0.3s ease 0.1s;
}

</style>
