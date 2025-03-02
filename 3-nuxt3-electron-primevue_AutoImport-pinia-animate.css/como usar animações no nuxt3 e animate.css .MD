```markdown
# Tutorial Completo: Usando Animações no Nuxt 3 com Animate.css

*   [Introdução](#introdução)
*   [Configuração e Instalação](#configuração-e-instalação)
    *   [Passo 1: Instalar o Animate.css](#passo-1-instalar-o-animatecss)
    *   [Passo 2: Adicionar o Animate.css aos seus arquivos CSS globais](#passo-2-adicionar-o-animatecss-aos-seus-arquivos-css-globais)
*   [Criando uma Diretiva Vue Personalizada para Animações](#criando-uma-diretiva-vue-personalizada-para-animações)
    *   [Passo 3: Crie um Plugin para a Diretiva de Animação](#passo-3-crie-um-plugin-para-a-diretiva-de-animação)
    *   [Passo 4: Registre o Plugin no `nuxt.config.ts`](#passo-4-registre-o-plugin-no-nuxtconfigts)
*   [Usando a Diretiva de Animação](#usando-a-diretiva-de-animação)
*   [20 Exemplos Avançados de Uso da Diretiva `v-animate`](#20-exemplos-avançados-de-uso-da-diretiva-v-animate)
    *   [1. Entrada com Fade combinado com Movimento](#1-entrada-com-fade-combinado-com-movimento)
    *   [2. Animação ao Hover com Vue Refs](#2-animação-ao-hover-com-vue-refs)
    *   [3. Animação Controlada por Estado com Composables](#3-animação-controlada-por-estado-com-composables)
    *   [4. Animação Sequencial com Atrasos](#4-animação-sequencial-com-atrasos)
    *   [5. Combinando com Transições Vue](#5-combinando-com-transições-vue)
    *   [6. Animação de Loading com Infinite](#6-animação-de-loading-com-infinite)
    *   [7. Animação em Listas com `v-for`](#7-animação-em-listas-com-v-for)
    *   [8. Animação Trigger com Intersection Observer](#8-animação-trigger-com-intersection-observer)
    *   [9. Animação com Entrada e Saída Diferentes](#9-animação-com-entrada-e-saída-diferentes)
    *   [10. Animação de Notificação](#10-animação-de-notificação)
    *   [11. Animação Controlada por Scroll](#11-animação-controlada-por-scroll)
    *   [12. Botão com Animação de Carregamento](#12-botão-com-animação-de-carregamento)
    *   [13. Combinando Múltiplas Animações Sequencialmente](#13-combinando-múltiplas-animações-sequencialmente)
    *   [14. Animação Baseada em Dispositivo (Mobile vs Desktop)](#14-animação-baseada-em-dispositivo-mobile-vs-desktop)
    *   [15. Animação de Gráfico com Dados Dinâmicos](#15-animação-de-gráfico-com-dados-dinâmicos)
    *   [16. Animação de Marca D'água](#16-animação-de-marca-dágua)
    *   [17. Transição de Página Animada](#17-transição-de-página-animada)
    *   [18. Efeito de Typing usando Animate.css e CSS](#18-efeito-de-typing-usando-animatecss-e-css)

## Introdução

Neste tutorial, vamos aprender como integrar e utilizar a biblioteca **[Animate.css](https://animate.style/)** em um projeto **[Nuxt 3](https://nuxt.com/)** para adicionar animações elegantes e responsivas aos seus componentes. O Animate.css é uma biblioteca de animações CSS *cross-browser* pronta para uso, que pode ser facilmente integrada ao seu projeto Nuxt 3.

## Configuração e Instalação

### Passo 1: Instalar o Animate.css

```bash
npm install animate.css
```

### Passo 2: Adicionar o Animate.css aos seus arquivos CSS globais

No seu arquivo `nuxt.config.ts`, adicione `animate.css` às suas importações CSS:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // ...outras configs
  css: [
    '~/assets/css/main.css', // Se você tiver um arquivo CSS principal
    'animate.css' // Importa o animate.css globalmente
  ],
  // ...outras configs
})
```

## Criando uma Diretiva Vue Personalizada para Animações

Para facilitar o uso das animações, criaremos uma diretiva Vue personalizada que adiciona automaticamente as classes necessárias.

### Passo 3: Crie um Plugin para a Diretiva de Animação

Crie um arquivo em `plugins/animate.ts`:

```typescript
// plugins/animate.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('animate', {
    mounted(el, binding) {
      // Adiciona a classe base de animação
      el.classList.add('animate__animated');

      // Adiciona a classe de animação específica, se fornecida
      if (binding.value) {
        el.classList.add(`animate__${binding.value}`);
      }

      // Trata modificadores como delay, velocidade, etc.
      if (binding.modifiers) {
        Object.keys(binding.modifiers).forEach(modifier => {
          if (modifier.startsWith('delay-')) {
            el.classList.add(`animate__${modifier}`);
          } else if (['faster', 'fast', 'slow', 'slower'.includes(modifier)) {
            el.classList.add(`animate__${modifier}`);
          } else if (modifier === 'infinite') {
            el.classList.add('animate__infinite');
          }
        });
      }
    }
  });
});
```

### Passo 4: Registre o Plugin no `nuxt.config.ts`

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // ...outras configs
  plugins: [
    // ...outros plugins
    '~/plugins/animate.ts' // Certifique-se de que o caminho está correto
  ],
  // ...outras configs
})
```

## Usando a Diretiva de Animação

Agora você pode usar a diretiva `v-animate` em qualquer elemento do seu projeto:

```vue
<!-- Uso básico -->
<div v-animate="'fadeIn'">Este elemento terá animate__animated e animate__fadeIn</div>

<!-- Com modificadores -->
<div v-animate.delay-2s.infinite="'bounce'">Bounce com delay de 2s e infinito</div>

<!-- Apenas a classe base (não faz nada sozinho, precisa de uma animação) -->
<div v-animate>Apenas animado</div>
```

## 20 Exemplos Avançados de Uso da Diretiva `v-animate`

### 1. Entrada com Fade combinado com Movimento

```vue
<div v-animate="'fadeInUp'">Fade entrando de baixo para cima</div>
```

### 2. Animação ao Hover com Vue Refs

```vue
<template>
  <div
    ref="hoverElement"
    @mouseenter="addAnimation('pulse')"
    @mouseleave="removeAnimation"
  >
    Passe o mouse sobre mim
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hoverElement = ref<HTMLElement | null>(null);

function addAnimation(animation: string) {
  hoverElement.value?.classList.add('animate__animated', `animate__${animation}`);
}

function removeAnimation() {
  hoverElement.value?.classList.remove('animate__animated', 'animate__pulse');
}
</script>
```

### 3. Animação Controlada por Estado com Composables

```vue
<template>
  <div v-if="isVisible" v-animate="'bounceIn'">
    Apareço com bounce quando visível
  </div>
  <button @click="toggleVisibility">Toggle Visibilidade</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const isVisible = ref(false);

function toggleVisibility() {
  isVisible.value = !isVisible.value;
}
</script>
```

### 4. Animação Sequencial com Atrasos

```vue
<div class="flex flex-col space-y-4">
  <div v-animate.delay-1s="'fadeIn'">Aparece primeiro</div>
  <div v-animate.delay-2s="'fadeIn'">Aparece depois de 1s</div>
  <div v-animate.delay-3s="'fadeIn'">Aparece depois de 2s</div>
</div>
```

### 5. Combinando com Transições Vue

```vue
<Transition
  enter-active-class="animate__animated animate__fadeIn"
  leave-active-class="animate__animated animate__fadeOut"
>
  <div v-if="isVisible">Conteúdo com transição customizada</div>
</Transition>
```

### 6. Animação de Loading com Infinite

```vue
<div v-if="isLoading" class="flex justify-center">
  <div v-animate.infinite="'pulse'" class="loading-indicator">
    Carregando...
  </div>
</div>
```

### 7. Animação em Listas com `v-for`

```vue
<template>
  <ul>
    <li
      v-for="(item, index) in items"
      :key="item.id"
      v-animate="'fadeInLeft'"
      :style="`animation-delay: ${index * 0.1}s`"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
]);
</script>
```

### 8. Animação Trigger com Intersection Observer

```vue
<template>
  <div v-for="(section, index) in sections" :key="index" class="h-screen">
    <div
      ref="sectionRefs"
      :class="{ 'animate__animated animate__fadeIn': sectionVisible[index }"
    >
      {{ section.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

const sections = ref([
  { title: 'Seção 1' },
  { title: 'Seção 2' },
  { title: 'Seção 3' },
]);

const sectionRefs = ref<HTMLElement[]>([]);
const sectionVisible = ref(sections.value.map(() => false));

onMounted(() => {
  sectionRefs.value.forEach((el, index) => {
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        sectionVisible.value[index] = true;
      }
    });
  });
});
</script>
```

### 9. Animação com Entrada e Saída Diferentes

```vue
<div
  v-if="isVisible"
  class="animate__animated"
  :class="isEntering ? 'animate__bounceIn' : 'animate__bounceOut'"
>
  Conteúdo com animações diferentes
</div>
```

(Você precisaria de lógica adicional para definir `isEntering`.)

### 10. Animação de Notificação

```vue
<template>
  <div class="fixed top-5 right-5 z-50">
    <div
      v-if="showNotification"
      v-animate="'slideInRight'"
      class="bg-green-500 text-white p-4 rounded shadow-lg"
    >
      Nova notificação!
    </div>
  </div>
  <button @click="triggerNotification">Mostrar Notificação</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const showNotification = ref(false);

function triggerNotification() {
  showNotification.value = true;
  setTimeout(() => {
    showNotification.value = false;
  }, 3000);
}
</script>
```

### 11. Animação Controlada por Scroll

```vue
<template>
  <div class="h-[2000px] relative">
    <div
      class="sticky top-0"
      :class="scrollClasses"
    >
      Elemento que anima conforme o scroll
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core';
import { computed } from 'vue';

const { y } = useScroll(window);

const scrollClasses = computed(() => {
  if (y.value < 200) return 'animate__animated animate__fadeIn';
  if (y.value < 400) return 'animate__animated animate__pulse';
  if (y.value < 600) return 'animate__animated animate__headShake';
  return 'animate__animated animate__bounce';
});
</script>
```

### 12. Botão com Animação de Carregamento

```vue
<template>
  <button
    @click="submitForm"
    class="px-4 py-2 bg-blue-500 text-white rounded"
    :disabled="isLoading"
  >
    <span v-if="!isLoading">Enviar</span>
    <span v-else v-animate.infinite="'pulse'">Processando...</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const isLoading = ref(false);

function submitForm() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
}
</script>
```

### 13. Combinando Múltiplas Animações Sequencialmente

```vue
<template>
  <div ref="multiAnimationRef" class="p-4 bg-gray-100 rounded">
    Múltiplas animações em sequência
  </div>
  <button @click="runAnimationSequence">Iniciar Sequência</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const multiAnimationRef = ref<HTMLElement | null>(null);

async function runAnimationSequence() {
  const el = multiAnimationRef.value;
  if (!el) return;

  // Função helper para animar e esperar
  const animateAndWait = (animation: string, duration = 1000) => {
    el.classList.add('animate__animated', `animate__${animation}`);
    return new Promise(resolve => {
      setTimeout(() => {
        el.classList.remove('animate__animated', `animate__${animation}`);
        resolve();
      }, duration);
    });
  };

  await animateAndWait('bounce');
  await animateAndWait('flash');
  await animateAndWait('rubberBand');
  await animateAndWait('tada');
}
</script>
```

### 14. Animação Baseada em Dispositivo (Mobile vs Desktop)

```vue
<template>
  <div v-animate="animationType">
    Animação adaptativa ao dispositivo
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core';
import { computed } from 'vue'

const breakpoints = useBreakpoints({
  mobile: 640,
  desktop: 1024,
});

const isMobile = breakpoints.smaller('desktop');

const animationType = computed(() => {
  return isMobile.value ? 'fadeIn' : 'bounceIn';
});
</script>
```

### 15. Animação de Gráfico com Dados Dinâmicos

```vue
<template>
  <div class="flex h-64 items-end space-x-2">
    <div
      v-for="(value, index) in chartData"
      :key="index"
      class="bg-blue-500 w-8"
      v-animate="'fadeInUp'"
      :style="`height: ${value}%; animation-delay: ${index * 0.1}s`"
    ></div>
  </div>
  <button @click="updateChartData">Atualizar Dados</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const chartData = ref([25, 40, 60, 75, 30, 50, 65]);

function updateChartData() {
  chartData.value = chartData.value.map(() => Math.floor(Math.random() * 100));
}
16. **Animação de Marca D'água:**

    ```vue
     <template>
      <div class="relative h-64 border rounded p-4">
        <div
          class="absolute inset-0 flex items-center justify-center text-4xl text-gray-200 opacity-30 pointer-events-none"
          v-animate.infinite.slow="'pulse'"
        >
          RASCUNHO
        </div>
        <div class="relative z-10">
          Conteúdo do documento...
        </div>
      </div>
    </template>
    ```

17. **Transição de Página Animada:**
    ```vue
    <template>
      <div>
        <transition name="page">
          <component :is="currentPage" />
        </transition>
        <div class="mt-4 flex space-x-4">
          <button @click="currentPage = 'PageOne'">Página 1</button>
          <button @click="currentPage = 'PageTwo'">Página 2</button>
        </div>
      </div>
    </template>

    <script setup lang="ts">
    import { ref, shallowRef } from 'vue';
    import PageOne from '~/components/PageOne.vue'; // Crie esses componentes
    import PageTwo from '~/components/PageTwo.vue'; // Crie esses componentes

    const currentPage = shallowRef(PageOne);
    </script>

    <style>
    .page-enter-active {
      animation: animate__fadeIn 0.5s;
    }
    .page-leave-active {
      animation: animate__fadeOut 0.5s;
    }
    </style>
    ```
    Certifique-se de ter os componentes `PageOne.vue` e `PageTwo.vue` criados em seu diretório `components`.

18. **Efeito de Typing usando Animate.css e CSS:**
    ```vue
    <template>
      <div
        v-animate="'fadeIn'"
        class="typing-effect"
      >
        Texto com efeito de digitação combinado com fade
      </div>
    </template>

    <style scoped>
    .typing-effect {
      width: fit-content;
      overflow: hidden;
      white-space: nowrap;
      border-right: 3px solid;
      animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
    }

    @keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }

    @keyframes blink-caret {
      from, to { border-color: transparent }
      50% { border-color: black; } /* ou a cor do seu texto */
    }
    </style>
    ```
    Neste exemplo, combinamos o fadeIn do Animate.css com animações CSS puras para criar o efeito de digitação.  Ajuste os valores de `steps()` e duração da animação `typing` para controlar a velocidade e o número de caracteres.

Este tutorial fornece uma base sólida para usar animações em seus projetos Nuxt 3 com Animate.css.  Explore a documentação do Animate.css para ver todas as animações disponíveis e personalize-as para criar efeitos visuais impressionantes.  A diretiva