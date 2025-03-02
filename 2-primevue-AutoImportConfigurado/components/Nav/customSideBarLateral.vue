<template>
    <div id="app" class="flex flex-col h-screen">
        <PanelMenu :model="items">
    <template #item="{ item }">
        <a v-ripple class="flex items-center px-4 py-2 cursor-pointer group">
            <span :class="[item.icon, 'text-primary group-hover:text-inherit']" />
            <span :class="['ml-2', { 'font-semibold': item.items }]">{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
        </a>
    </template>
</PanelMenu>
<hr class="my-4">
<i class="pi pi-check"></i>
<i class="pi pi-times"></i>
<span class="pi pi-search"></span>
<span class="pi pi-user"></span>
<hr class="my-4">
<p-button label="Click Me">
            <nuxt-link to="/primevue">Primevue</nuxt-link>
        </p-button>
        <p-button label="Click Me">
            <nuxt-link to="/chart/1">chart</nuxt-link>
        </p-button>
        <p-button label="Click Me">
            <nuxt-link to="/toast">toast</nuxt-link>
        </p-button>
        <p-button label="Click Me">
            <nuxt-link to="/tasks">Tasks</nuxt-link>
        </p-button>
        <p-button label="Click Me">
            <nuxt-link to="/">Home</nuxt-link>
        </p-button>
        <p-button label="Click Me">
            <nuxt-link to="/tailwind">Tailwind</nuxt-link>
        </p-button>
    </div>
  </template>
  
  <script setup>




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
            }
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
                badge: 6
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
