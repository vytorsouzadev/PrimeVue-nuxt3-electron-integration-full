  <template>
    <div class="flex flex-col h-screen w-full overflow-hidden">
      <!-- Top Navbar -->
      <div class="bg-gray-800 text-white p-4 shadow-md z-10">
        <h1 class="text-xl font-semibold">Nuxt3 and ElectronJS - Simple IPC-Communication Project</h1>
      </div>

      <!-- Main Container with Sidebar and Content -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Sidebar (30%) -->
        <aside class="w-[30%] bg-gray-100 shadow-md overflow-y-auto">
          <div class="p-4">
            <h2 class="text-lg font-medium mb-4">Menu Drawer</h2>
            <NavCustomSideBarLateral />
          </div>
        </aside>

        <!-- Main Content (70%) -->
        <main class="w-[70%] p-6 overflow-y-auto bg-white">
          <nuxtPage />
        </main>
      </div>
    </div>
  </template>

  <style>
  /* Global styles if needed */
  </style>
