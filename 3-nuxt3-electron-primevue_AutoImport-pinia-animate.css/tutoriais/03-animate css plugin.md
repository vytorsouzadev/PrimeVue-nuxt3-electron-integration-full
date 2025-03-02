Ok, vamos criar um tutorial detalhado sobre como usar o `animate.css` com uma diretiva personalizada (plugin) em Nuxt 3, permitindo um controle mais granular das animações.

## Índice

1.  [Introdução](#introducao)
2.  [Instalação do animate.css](#instalacao-animatecss)
3.  [Configuração Global (nuxt.config.ts)](#configuracao-global)
4.  [Criação do Plugin (Diretiva Personalizada)](#criacao-plugin)
5.  [Utilização da Diretiva `v-animate`](#utilizacao-diretiva)
    *   [Uso Básico](#uso-basico)
    *   [Com Modificadores](#com-modificadores)
    *   [Apenas a Classe Base](#apenas-classe-base)
6.  [Exemplos Adicionais](#exemplos-adicionais)
7.  [Conclusão](#conclusao)

## 1. Introdução <a name="introducao"></a>

O `animate.css` é uma biblioteca popular que fornece animações CSS prontas para uso. Embora possamos usá-lo importando-o globalmente (como no tutorial anterior), criar um plugin (uma diretiva personalizada no Vue) nos dá mais flexibilidade e controle sobre como e quando as animações são aplicadas.

## 2. Instalação do animate.css <a name="instalacao-animatecss"></a>

Se você ainda não instalou o `animate.css`, faça isso agora:

```bash
npm install animate.css
# ou
yarn add animate.css
# ou
pnpm add animate.css
```

## 3. Configuração Global (nuxt.config.ts) <a name="configuracao-global"></a>

Mesmo criando um plugin, ainda é recomendado importar o `animate.css` globalmente para garantir que os estilos base estejam disponíveis:

```typescript nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  // ... outras configurações
  css: [
    'animate.css', // Importa o animate.css
    // ... outros arquivos CSS
  ],
  // ...
});
```

## 4. Criação do Plugin (Diretiva Personalizada) <a name="criacao-plugin"></a>

Crie um arquivo `animate.ts` dentro da pasta `app/plugins`:

```typescript app/plugins/animate.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('animate', {
    mounted(el, binding) {
      // Adiciona a classe base animate__animated (obrigatório)
      el.classList.add('animate__animated');

      // Adiciona a classe de animação específica, se fornecida
      if (binding.value) {
        el.classList.add(`animate__${binding.value}`);
      }

      // Lida com modificadores (delay, speed, repeat)
      if (binding.modifiers) {
        Object.keys(binding.modifiers).forEach((modifier) => {
          if (modifier.startsWith('delay-')) {
            // Suporte para delays como delay-2s, delay-500ms, etc.
            el.classList.add(`animate__${modifier}`);
          } else if (['faster', 'fast', 'slow', 'slower'].includes(modifier)) {
            // Suporte para velocidades: faster, fast, slow, slower
            el.classList.add(`animate__${modifier}`);
          } else if (modifier === 'infinite') {
            // Suporte para repetição infinita
            el.classList.add('animate__infinite');
          }
        });
      }
    },
    // updated é opcional, mas pode ser útil se você precisar
    //  reaplicar a animação quando o valor da diretiva mudar
    updated(el, binding) {
        if (binding.value !== binding.oldValue) {
            //Remove previous animation
            if(binding.oldValue){
              el.classList.remove(`animate__${binding.oldValue}`);
            }

            el.classList.add('animate__animated');

            if (binding.value) {
                el.classList.add(`animate__${binding.value}`);
            }
        }
    }

  });
});
```

**Explicação:**

*   **`defineNuxtPlugin`:**  Função do Nuxt para registrar plugins.
*   **`nuxtApp.vueApp.directive('animate', ...)`:**  Registra uma diretiva Vue chamada `animate`.
*   **`mounted(el, binding)`:**  Função que é executada quando o elemento ao qual a diretiva está vinculada é inserido no DOM.
    *   **`el`:**  O elemento DOM ao qual a diretiva está vinculada.
    *   **`binding`:**  Um objeto que contém informações sobre a diretiva, como o valor (`binding.value`) e os modificadores (`binding.modifiers`).
    *   **`el.classList.add('animate__animated')`:**  Adiciona a classe base `animate__animated`, que é *essencial* para que o `animate.css` funcione.
    *   **`el.classList.add(\`animate\_\_${binding.value}\`)`:**  Adiciona a classe de animação específica passada como valor para a diretiva (por exemplo, `v-animate="'fadeIn'"` adicionaria `animate__fadeIn`).
    *   **`Object.keys(binding.modifiers).forEach(...)`:**  Itera sobre os modificadores da diretiva (por exemplo, `v-animate.delay-2s.infinite="'bounce'"` teria os modificadores `delay-2s` e `infinite`).
*   **`updated`:** (Opcional) Executado sempre que o valor da diretiva é atualizado.  Isso permite que você altere a animação dinamicamente.  Remove a classe de animação antiga e adiciona a nova.

## 5. Utilização da Diretiva `v-animate` <a name="utilizacao-diretiva"></a>

Agora você pode usar a diretiva `v-animate` em seus componentes:

### 5.1 Uso Básico <a name="uso-basico"></a>

```vue
<div v-animate="'fadeIn'">Este elemento terá a animação fadeIn</div>
```

### 5.2 Com Modificadores <a name="com-modificadores"></a>

```vue
<div v-animate.delay-2s.infinite="'bounce'">
  Este elemento terá a animação bounce, com um atraso de 2 segundos e repetição infinita
</div>
```

### 5.3 Apenas a Classe Base <a name="apenas-classe-base"></a>

```vue
<div v-animate>Este elemento terá apenas a classe animate__animated (útil para controlar a animação manualmente)</div>
```

## 6. Exemplos Adicionais <a name="exemplos-adicionais"></a>

Aqui estão mais 10 exemplos de uso da diretiva `v-animate`:

```vue
<template>
    <div id="teste-custom-plugin" class="border m-2 rounded p-4">
    <h1 class="w-full text-center text-2xl">Exemplos de Animação com v-animate</h1>

    <!-- Exemplo 1: Fade In Up -->
    <div v-animate="'fadeInUp'" class="mt-4">Fade In Up</div>

    <!-- Exemplo 2: Zoom In com delay -->
    <div v-animate.delay-1s="'zoomIn'" class="mt-4">Zoom In com 1 segundo de atraso</div>

    <!-- Exemplo 3: Slide In Left, mais rápido -->
    <div v-animate.faster="'slideInLeft'" class="mt-4">Slide In Left (mais rápido)</div>

    <!-- Exemplo 4: Pulse, infinito -->
    <div v-animate.infinite="'pulse'" class="mt-4">Pulse (infinito)</div>

    <!-- Exemplo 5: Shake X, mais lento -->
    <div v-animate.slower="'shakeX'" class="mt-4">Shake X (mais lento)</div>

    <!-- Exemplo 6: Flip In Y -->
    <div v-animate="'flipInY'" class="mt-4">Flip In Y</div>

    <!-- Exemplo 7: Back In Down, com delay de 500ms -->
    <div v-animate.delay-500ms="'backInDown'" class="mt-4">Back In Down (delay de 500ms)</div>

    <!-- Exemplo 8: Light Speed In Right, rápido -->
    <div v-animate.fast="'lightSpeedInRight'" class="mt-4">Light Speed In Right (rápido)</div>

    <!-- Exemplo 9: Rotate In, infinito e lento -->
    <div v-animate.infinite.slow="'rotateIn'" class="mt-4">Rotate In (infinito e lento)</div>

    <!-- Exemplo 10: Tada, com delay de 1.5s -->
    <div v-animate.delay-1500ms="'tada'" class="mt-4">Tada (delay de 1.5s)</div>

     <!-- Exemplo base: Fade In -->
    <div v-animate="'fadeIn'" class="mt-4">Fade In</div>

    <!-- Exemplo com modificadores: Bounce com delay e infinito -->
    <div v-animate.delay-2s.infinite="'bounce'" class="mt-4">Bounce (delay de 2s, infinito)</div>

    <!-- Exemplo apenas com a classe base -->
    <div v-animate class="mt-4">Apenas animate__animated</div>
  </div>
</template>
```
**Importante:**

-   Coloque todos os exemplos, incluindo os básicos, dentro de um único bloco `<template>`.  Isso facilita a cópia e a utilização em seu componente.
- Adicionei uma div com id para você pode adicionar mais estilos.
- Adicionei classes `mt-4` para dar um espaçamento entre os exemplos.
-   Usei classes de animação diferentes do `animate.css` (você pode encontrar a lista completa na documentação oficial: [https://animate.style/](https://animate.style/)).

## 7. Conclusão <a name="conclusao"></a>

Com este plugin, você tem um controle preciso sobre as animações do `animate.css` em seu aplicativo Nuxt 3.  A diretiva `v-animate` torna a aplicação de animações simples e expressiva, e o uso de modificadores permite personalizar ainda mais o comportamento das animações.  O hook `updated` garante que as animações sejam atualizadas corretamente quando os valores mudam, permitindo animações dinâmicas.
