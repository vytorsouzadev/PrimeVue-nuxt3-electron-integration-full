<template>
    <div id="app" class="flex flex-col h-screen">
        <!--config-->
        <div class="px-1 py-2 overflow-y-auto flex flex-row justify-between items-center">
            <div class="w-1/4">
                <Button id="bt-side-menu" icon="pi pi-home" aria-label="Save" />
            </div>
            <div class="w-3/4 text-right">
                <h2 class="text-lg font-medium">Menu Drawer</h2>
            </div>
        </div>
        <PanelMenu :model="items" @update:expandedKeys="handleExpandedKeysChange">
            <template #item="{ item, active }">
                <a v-ripple class="flex items-center px-4 py-2 cursor-pointer group" 
                   :class="{ 'open-menu-item': active }">
                    <span :class="[item.icon, active ? 'text-white' : 'text-primary group-hover:text-inherit']" />
                    <span :class="['ml-2', { 'font-semibold': item.items, 'text-white': active }]">{{ item.label }}</span>
                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                    <span v-if="item.shortcut" 
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



const handleExpandedKeysChange = (expandedKeys) => {
  //console.log('Menus atualmente expandidos:', expandedKeys);
  // Lógica adicional aqui
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
                shortcut: '⌘+O'
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



<style scoped>
/* Estilo para link ativo */
.active-link {
  background-color: #4ade80 !important;
  transform: translateX(5px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Estilo para menu aberto */
.open-menu-item {
  background-color: var(--primary-color, #3B82F6) !important;
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
</style>
