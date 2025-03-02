Ok, vamos criar um tutorial passo a passo sobre como implementar um loading animado com "animate.css" em um projeto Nuxt 3, utilizando Pinia para gerenciar o estado do loading.

## Índice

1.  [Introdução](#introdução)
2.  [Pré-requisitos](#pré-requisitos)
3.  [Instalação das Dependências](#instalação-das-dependências)
    *   [Instalando Pinia](#instalando-pinia)
    *   [Instalando animate.css](#instalando-animatecss)
4.  [Configuração do Pinia (Store)](#configuração-do-pinia-store)
5.  [Configuração do `nuxt.config.ts`](#configuração-do-nuxtconfigts)
6.  [Criação do Componente de Loading](#criação-do-componente-de-loading)
7.  [Utilização do Componente no Layout Principal (app.vue)](#utilização-do-componente-no-layout-principal-appvue)
8.  [Testando a Animação](#testando-a-animação)
9. [Conclusão](#conclusão)

## 1. Introdução <a name="introdução"></a>

Neste tutorial, vamos aprender como adicionar um indicador de carregamento ("loading") visualmente atraente a um aplicativo Nuxt 3. Usaremos a biblioteca `animate.css` para animações CSS prontas e o Pinia para gerenciar o estado global do loading, permitindo que ele seja controlado e exibido em diferentes partes da aplicação.

## 2. Pré-requisitos <a name="pré-requisitos"></a>

*   Node.js (versão 18 ou superior) e npm (ou yarn/pnpm) instalados.
*   Um projeto Nuxt 3 existente. Se você não tiver um, crie um novo com `npx nuxi@latest init <nome-do-projeto>`.
*   Conhecimento básico de Vue.js e Nuxt 3.

## 3. Instalação das Dependências <a name="instalação-das-dependências"></a>

### 3.1 Instalando Pinia <a name="instalando-pinia"></a>

Se você ainda não tem o Pinia instalado, use o seguinte comando:

```bash
npx nuxi@latest module add pinia
```

Se, por algum motivo, apenas o `@pinia/nuxt` for instalado e o `pinia` não, instale-o manualmente:

```bash
npm install pinia
# ou
yarn add pinia
# ou
pnpm add pinia
```

### 3.2 Instalando animate.css <a name="instalando-animatecss"></a>

```bash
npm install animate.css
# ou
yarn add animate.css
# ou
pnpm add animate.css
```

## 4. Configuração do Pinia (Store) <a name="configuração-do-pinia-store"></a>

Crie um arquivo `loading.ts` dentro da pasta `app/stores`:

```typescript app/stores/loading.ts
export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: true, // Começa como true para mostrar o loading inicialmente
  }),
  actions: {
    toggleIsLoading() {
      this.isLoading = !this.isLoading;
    },
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
    resetIsLoading() {
      this.isLoading = true; // Reset para o estado inicial.
    },
  },
});
```

## 5. Configuração do `nuxt.config.ts` <a name="configuração-do-nuxtconfigts"></a>

Adicione o `Pinia` e o `animate.css` ao seu `nuxt.config.ts`:

```typescript nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
    // ... outras configurações
    modules: [
        '@pinia/nuxt',
        // ... outros módulos
    ],
    css: [
        'animate.css', // Importa o animate.css globalmente
        // ... outros arquivos CSS
    ],
    // ... outras configurações
    app: {
      pageTransition: { name: 'page', mode: 'out-in' },
      layoutTransition: { name: 'layout', mode: 'out-in' }
    },
});


```
**Importante:** A inclusão do `animate.css` na seção `css` do `nuxt.config.ts` o torna disponível globalmente em seu aplicativo.  O `app` configura as transições globais.

## 6. Criação do Componente de Loading <a name="criação-do-componente-de-loading"></a>

Crie um componente `Loading/index.vue` dentro da pasta `app/components`:

```vue app/components/Loading/index.vue
<template>
  <Transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div v-if="loadingStore.isLoading" class="is-loading-progress-bar">
      <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
      <!--  Você pode adicionar outros elementos visuais aqui, se desejar -->
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useLoadingStore } from '~/stores/loading'; // Importe o store
import ProgressBar from 'primevue/progressbar';

const loadingStore = useLoadingStore(); // Use o store no componente
</script>

<style scoped>
.is-loading-progress-bar {
  position: fixed; /* Fixa o loading no topo da tela */
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999; /* Garante que fique acima de outros elementos */
}
</style>
```

**Explicação:**

*   **`v-if="loadingStore.isLoading"`:**  O componente só é renderizado se `isLoading` no store for `true`.
*   **`<Transition>`:**  O componente `<Transition>` do Vue.js envolve o conteúdo do loading.  Ele aplica as classes CSS de `animate.css` para as animações de entrada (enter) e saída (leave).
*   **`enter-active-class` e `leave-active-class`:**  Esses atributos definem as classes do `animate.css` que serão usadas.  `animate__fadeIn` faz o elemento aparecer gradualmente, e `animate__fadeOut` faz ele desaparecer gradualmente.  `animate__animated` é uma classe base necessária para o `animate.css` funcionar.
*   **`ProgressBar`:** Usamos o componente ProgressBar do PrimeVue.
* **`is-loading-progress-bar`:** A classe CSS `is-loading-progress-bar` posiciona a barra de progresso de forma fixa no topo da página, garantindo que ela seja visível mesmo se o usuário rolar a página. O `z-index` alto assegura que ela fique sobreposta a outros elementos.

## 7. Utilização do Componente no Layout Principal (app.vue) <a name="utilização-do-componente-no-layout-principal-appvue"></a>

Importe e use o componente `Loading` no seu arquivo `app/app.vue`:

```vue app/app.vue
<template>
  <div class="flex flex-col h-screen">
    <Loading />
    <Toast position="top-right" />

    <Toolbar class="bg-gray-800 shadow-md">
      <template #start>
        <Button
          label="Primary"
          class="mx-2"
          @click="loadingStore.toggleIsLoading"
          title="change loading"
        />
        <div class="border-l-2 border-gray-300 h-6 mx-2">
          Status: {{ loadingStore.isLoading }}
        </div>
        <h1 class="text-xl text-center text-blue-300 font-semibold">
          Nuxt3 and ElectronJS - Simple IPC-Communication Project
        </h1>
        <br />
        <span class="text-sm text-gray-300 ml-2">Bem vindo, {{ name }}</span>
      </template>
    </Toolbar>

    <Splitter class="flex-1">
      <SplitterPanel :size="20" class="bg-gray-100">
        <div class="p-4 h-full overflow-y-auto">
          <h2 class="text-lg font-medium mb-4">Menu Drawer</h2>
          <NavCustomSideBarLateral />
        </div>
      </SplitterPanel>

      <SplitterPanel :size="75" class="p-0">
        <div class="p-6 h-full overflow-y-auto">
          <NuxtPage />
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import Loading from '~/components/Loading/index.vue'; // Importe o componente
import { useLoadingStore } from '~/stores/loading';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Toast from 'primevue/toast';

const loadingStore = useLoadingStore();

const name = ref('User'); // Exemplo de dado reativo

</script>

<style>
/* Transições de página */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
```

**Explicação:**

*   **`import Loading from '~/components/Loading/index.vue';`:**  Importa o componente de loading.
*   **`<Loading />`:**  Adiciona o componente de loading ao template. Como ele está fora de qualquer condicional específica (além do `v-if` dentro do próprio componente), ele será exibido sempre que `isLoading` for `true` no store.
*  **`loadingStore.toggleIsLoading`:** No botão "Primary" foi adicionado um `@click` para chamar a action `toggleIsLoading`, que fará o loading aparecer e desaparecer ao clicar no botão.

## 8. Testando a Animação <a name="testando-a-animação"></a>

1.  **Inicie o servidor de desenvolvimento:**  Execute `npm run dev` (ou o comando equivalente para seu gerenciador de pacotes).
2.  **Abra o aplicativo no navegador:**  Acesse `http://localhost:3000` (ou a porta configurada).
3. **Verifique o loading:** Ao carregar a página pela primeira vez devera ver o loading. Clique no botão, o loading devera sumir e aparecer.

## 9. Conclusão <a name="conclusão"></a>

Parabéns! Você agora tem um indicador de loading animado e gerenciado centralmente em seu aplicativo Nuxt 3. Você pode usar o `useLoadingStore` em qualquer componente para mostrar ou ocultar o loading, tornando a experiência do usuário muito mais agradável, especialmente em operações que levam algum tempo para serem concluídas.  Você também aprendeu a integrar o `animate.css` para animações CSS reutilizáveis.
