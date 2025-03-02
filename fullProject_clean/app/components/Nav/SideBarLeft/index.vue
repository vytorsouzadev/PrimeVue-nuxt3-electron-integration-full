<template>
    <div id="app" class="flex flex-col h-screen transition-all duration-300" :class="[sidebarStore.isOpen ? 'w-full' : 'w-16']">
        <!--header with toggle button-->
        <div class="px-1 py-2 overflow-y-auto flex flex-row justify-between items-center">
            <div class="w-1/4 px-1">
                <Button size="large" id="bt-side-menu" icon="pi pi-bars" aria-label="Toggle Menu" @click="sidebarStore.toggle" />
            </div>
            <div class="w-3/4 text-right" v-if="sidebarStore.isOpen">
                <h2 class="text-lg font-medium">Menu Drawer</h2>
            </div>
        </div>
      
        <!--panel menu with conditional text display-->
        <PanelMenu :model="items" @update:expandedKeys="handleExpandedKeysChange">
            <template #item="{ item, active }" >
                <a v-ripple class="flex items-center px-4 py-2 cursor-pointer group my-1" 
                 :class="{ 'open-menu-item': active, 'justify-center': !sidebarStore.isOpen}">
                    <span :class="[item.icon, active ? 'text-white' : 'text-primary group-hover:text-inherit']" />
                    <span v-if="sidebarStore.isOpen" :class="['ml-2', { 'font-semibold': item.items, 'text-white': active }]">
                        {{ item.label }}
                    </span>
                    <Badge v-if="item.badge && sidebarStore.isOpen" class="ml-auto" :value="item.badge" />
                    <span v-if="item.shortcut && sidebarStore.isOpen" 
                          :class="['ml-auto border rounded text-xs p-1', 
                                  active ? 'border-white bg-primary-dark text-white' : 'border-surface bg-emphasis text-muted-color']">
                        {{ item.shortcut }}
                    </span>
                </a>
            </template>
        </PanelMenu>
    </div>
</template>
  <script setup>
  const sidebarStore = useSidebarStore();
  // Adicione esta linha:
  const expandedKeys = ref({});

  // Adicione esta função:
  const handleExpandedKeysChange = (keys) => {
    expandedKeys.value = keys;
  };

  const toggleSidebar = () => {
    sidebarStore.toggle();
    
    // If closing the sidebar, collapse all expanded menu items
    if (!sidebarStore.isOpen) {
        expandedKeys.value = {};
    }
  };

  const items = ref([
      {
          label: 'Mail',
          icon: 'pi pi-envelope',
          badge: 5,
          items: [
              {
                  label: 'Compose',
                  icon: 'pi pi-file-edit',
                  shortcut: '⌘+N'
              },
              {
                  label: 'Inbox',
                  icon: 'pi pi-inbox',
                  badge: 5
              },
              {
                  label: 'Sent',
                  icon: 'pi pi-send',
                  shortcut: '⌘+S'
              },
              {
                  label: 'Trash',
                  icon: 'pi pi-trash',
                  shortcut: '⌘+T'
              },
          ]
      },
      {
          label: 'Reports',
          icon: 'pi pi-chart-bar',
          shortcut: '⌘+R',
          items: [
              {
                  label: 'Sales',
                  icon: 'pi pi-chart-line',
                  badge: 3
              },
              {
                  label: 'Products',
                  icon: 'pi pi-list',
                  badge: 6,
                  items: [
                      {
                          label: 'Add',
                          icon: 'pi pi-plus',
                          shortcut: '⌘+A'
                      },
                      {
                          label: 'List',
                          icon: 'pi pi-list',
                          shortcut: '⌘+L'
                      },
                      {
                          label: 'Details',
                          icon: 'pi pi-eye',
                          shortcut: '⌘+D'
                      }
                  ]
              }
          ]
      },
      {
          label: 'Profile',
          icon: 'pi pi-user',
          shortcut: '⌘+W',
          items: [
              {
                  label: 'Settings',
                  icon: 'pi pi-cog',
                  shortcut: '⌘+O',
                  items:[
                    {
                        label: 'Account',
                        icon: 'pi pi-user',
                        shortcut: '⌘+A',
                    },
                    {
                        label: 'Notifications',
                        icon: 'pi pi-bell',
                        shortcut: '⌘+N',
                    }
                  ]
              },
              {
                  label: 'Privacy',
                  icon: 'pi pi-shield',
                  shortcut: '⌘+P'
              }
          ]
      }
  ]);
  </script>
<style lang="scss" scoped>
/* Estilo para link ativo */
.active-link {
  background-color: #4ade80 !important;
  transform: translateX(5px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Estilo para menu aberto */
.open-menu-item {
  //background-color: var(--primary-color, #5c98f7) !important;
  background-color: var(--primary-color, #5c98f7) !important;
  color: white !important;
  transform: translateX(5px);
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.p-button:hover {
  transform: translateX(3px);
  transition: transform 0.2s ease;
}

//estilos customizados para o collpase menu

/* Additional styles for the collapsed state */
.w-16 .p-panelmenu .p-panelmenu-header-link {
    justify-content: center;
    padding: 0.75rem;
}

.w-16 .p-panelmenu .p-submenu-list {
    position: absolute;
    left: 100%;
    top: 0;
    z-index: 10;
    background-color: var(--surface-overlay, white);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    min-width: 200px;
    display: none;
}

.w-16 .p-panelmenu .p-panelmenu-header:hover .p-submenu-list {
    display: block;
}

/* Animation */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}

.duration-300 {
    transition-duration: 300ms;
}
</style>
