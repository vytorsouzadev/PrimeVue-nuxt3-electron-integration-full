Ok, vamos criar um tutorial completo sobre transições de página no Nuxt 3, com foco em como configurar e personalizar essas transições, incluindo vários exemplos criativos.

## Índice

1.  [Introdução](#introducao)
2.  [Configuração Básica (nuxt.config.ts)](#configuracao-basica)
3.  [Transições Globais (app.vue)](#transicoes-globais)
4.  [Transições por Rota (Dentro das Páginas)](#transicoes-por-rota)
5.  [Transições com Animate.css](#transicoes-animatecss)
6.  [20+ Exemplos Criativos de Transições](#exemplos-criativos)
7.  [Conclusão](#conclusao)

## 1. Introdução <a name="introducao"></a>

As transições de página no Nuxt 3 (e no Vue.js em geral) melhoram a experiência do usuário, tornando a navegação entre as rotas mais fluida e visualmente agradável.  O Nuxt oferece várias maneiras de implementar essas transições, desde configurações simples até personalizações avançadas.

## 2. Configuração Básica (nuxt.config.ts) <a name="configuracao-basica"></a>

O primeiro passo é habilitar as transições de página no arquivo `nuxt.config.ts`. Isso define um comportamento padrão para todas as transições:

```typescript nuxt.config.ts
export default defineNuxtConfig({
  // ... outras configurações
  app: {
    pageTransition: {
      name: 'page', // Nome padrão da transição (pode ser qualquer nome)
      mode: 'out-in', // Modo da transição (explicado abaixo)
    },
    layoutTransition: { // Opcional: Se você estiver usando layouts diferentes
      name: 'layout',
      mode: 'out-in',
    },
  },
  // ...
});
```

**Explicação do `mode`:**

*   **`out-in` (Recomendado):**  A página atual sai primeiro (animação de saída), e então a nova página entra (animação de entrada).  Isso evita problemas de layout que podem ocorrer se ambas as páginas estiverem visíveis ao mesmo tempo.
*   **`in-out`:** A nova página entra primeiro, e então a página atual sai.
*   **`default` (ou omitir):** Ambas as páginas entram e saem simultaneamente.  Isso pode causar problemas se as páginas tiverem elementos que ocupem o mesmo espaço na tela.

**Importante:** Se você estiver alternando entre layouts *e* páginas, a transição `pageTransition` definida aqui *não* será executada.  Em vez disso, use `layoutTransition`.  Se você quiser uma transição tanto para a mudança de layout quanto para o conteúdo da página, você precisará lidar com isso de forma mais personalizada (por exemplo, usando um componente de layout que também inclua a transição da página).

## 3. Transições Globais (app.vue) <a name="transicoes-globais"></a>

Depois de configurar o `nuxt.config.ts`, você pode adicionar estilos CSS globais para definir as animações em `app/app.vue`:

```vue app/app.vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Transição padrão (slide suave) */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(20px); /* Move a página para fora da tela */
}

/* Transição de layout (exemplo) - use se você tiver layouts diferentes */
.layout-enter-active, .layout-leave-active {
    transition: opacity 0.4s;
}
.layout-enter-from, .layout-leave-to {
    opacity: 0;
}
</style>
```

**Explicação:**

*   **`.page-enter-active`, `.page-leave-active`:**  Essas classes são aplicadas durante a transição.  `transition: all 0.4s;` define que todas as propriedades CSS (como `opacity` e `transform`) serão animadas ao longo de 0.4 segundos.
*   **`.page-enter-from`, `.page-leave-to`:**  Essas classes definem o estado *inicial* da animação de entrada (`page-enter-from`) e o estado *final* da animação de saída (`page-leave-to`).
    *   `opacity: 0;`:  A página começa/termina invisível.
    *   `transform: translateX(20px);`:  A página começa/termina 20 pixels à direita (você pode usar outros valores ou transformações, como `translateY`, `scale`, etc.).

## 4. Transições por Rota (Dentro das Páginas) <a name="transicoes-por-rota"></a>

Você também pode definir transições específicas para páginas individuais.  Isso sobrescreve as transições globais.  Para fazer isso, adicione os estilos CSS *dentro* do componente da página (por exemplo, `app/pages/index.vue`, `app/pages/about.vue`):

```vue app/pages/about.vue
<template>
  <div>
    <h1>Sobre</h1>
    <!-- Conteúdo da página -->
  </div>
</template>

<style scoped>
/* Transição específica para a página "about" (exemplo: fade e scale) */
.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease; /* Adiciona um easing para suavizar */
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: scale(0.8); /* Começa/termina menor */
}
</style>
```
**Importante:** Use `<style scoped>` para garantir que os estilos da transição se apliquem apenas a essa página específica, e não a outras.

## 5. Transições com Animate.css <a name="transicoes-animatecss"></a>
Para usar o animate.css com as transições, você pode importar o animate.css como mostrado nos tutoriais anteriores e usar as classes do animate.css diretamente.
Se você usou a diretiva customizada (plugin), como mostrado no tutorial anterior, não precisa fazer mais nada, pois o plugin ja cuida de adicionar as classes do animate.css. Caso contrario, você precisará adicionar manualmente as classes `animate__animated` e a classe de animação específica.

```vue
<template>
  <div>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
  </div>
</template>

<style>
/*Usando animate.css com transições*/

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.page-enter-from {
    opacity: 0;
    transform: translateX(-100%);
}

.page-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

/*Se quiser usar as classes diretamente*/
.page-enter-active .my-component,
.page-leave-active .my-component{
    animation-duration: 1s; /*Ajuste se necessário*/
}

.page-enter-from .my-component{
  animation-name: fadeIn; /*Do animate.css*/
}

.page-leave-to .my-component{
  animation-name: fadeOut; /*Do animate.css*/
}

</style>
```
**Importante:** Nesse caso, como estamos usando o animate.css *dentro* das classes de transição do Vue, *não* usamos as classes `animate__animated`, `animate__fadeIn`, etc., diretamente no elemento `<NuxtPage>`.  Em vez disso, aplicamos `animation-name` dentro das classes `.page-enter-from` e `.page-leave-to`. Isso dá mais controle, mas exige um pouco mais de configuração CSS.
A propriedade `animation-duration` precisa ser configurada, ou a animação não funcionará corretamente.

## 6. 20+ Exemplos Criativos de Transições <a name="exemplos-criativos"></a>

Aqui estão mais de 20 exemplos de transições que você pode usar, combinando diferentes transformações, durações e easings.  Você pode colocar esses estilos dentro de `<style scoped>` em suas páginas individuais ou em `<style>` no `app.vue` para transições globais.  Lembre-se de ajustar os valores para obter o efeito desejado.

Agora, quando você visualizar o arquivo Markdown (por exemplo, no GitHub, GitLab, VS Code com uma extensão de visualização Markdown, ou qualquer outra ferramenta que suporte Markdown), os links no índice levarão diretamente às seções correspondentes.  Isso torna a navegação no tutorial muito mais fácil.


## 6. 20+ Exemplos Criativos de Transições <a name="exemplos-criativos"></a>

Aqui estão mais de 20 exemplos de transições que você pode usar, combinando diferentes transformações, durações e easings.  Você pode colocar esses estilos dentro de `<style scoped>` em suas páginas individuais ou em `<style>` no `app.vue` para transições globais.  Lembre-se de ajustar os valores para obter o efeito desejado.

**Importante:**  Todos os exemplos abaixo assumem que você está usando o modo `out-in` (configurado no `nuxt.config.ts`). Se você estiver usando um modo diferente, os resultados podem variar.


**Exemplo 1: Fade Simples**

```css
/* Efeito de fade-in e fade-out suave. */
.page-enter-active, .page-leave-active {
  transition: opacity 0.5s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
}
```

**Exemplo 2: Slide da Esquerda**

```css
/* A página nova entra da esquerda, e a antiga sai para a esquerda. */
.page-enter-active, .page-leave-active {
  transition: all 0.4s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
```

**Exemplo 3: Slide da Direita**

```css
/* A página nova entra da direita, e a antiga sai para a direita. */
.page-enter-active, .page-leave-active {
  transition: all 0.4s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

**Exemplo 4: Slide de Cima**

```css
/* A página nova entra de cima, e a antiga sai para cima. */
.page-enter-active, .page-leave-active {
  transition: all 0.4s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
```

**Exemplo 5: Slide de Baixo**

```css
/* A página nova entra de baixo, e a antiga sai para baixo. */
.page-enter-active, .page-leave-active {
  transition: all 0.4s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
```

**Exemplo 6: Zoom In**

```css
/* A página nova entra com um efeito de zoom, e a antiga sai diminuindo. */
.page-enter-active, .page-leave-active {
  transition: all 0.4s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
```

**Exemplo 7: Zoom Out**

```css
/* A página nova entra aumentando, e a antiga sai com um efeito de zoom out. */
.page-enter-active, .page-leave-active {
  transition: all 0.4s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: scale(1.2);
}
```

**Exemplo 8: Rotação 3D (Eixo Y)**

```css
/* A página nova entra com uma rotação no eixo Y, e a antiga sai com uma rotação no eixo Y. */
.page-enter-active, .page-leave-active {
  transition: all 0.5s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: rotateY(90deg);
}
```

**Exemplo 9: Rotação 3D (Eixo X)**

```css
/*  A página nova entra com uma rotação no eixo X, e a antiga sai com uma rotação no eixo X. */
.page-enter-active, .page-leave-active {
  transition: all 0.5s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: rotateX(90deg);
}
```

**Exemplo 10: Flip Horizontal**

```css
/* Efeito de flip horizontal. */
.page-enter-active, .page-leave-active {
    transition: all 0.5s;
}
.page-enter-from {
    opacity: 0;
    transform: perspective(400px) rotateY(90deg);
}
.page-leave-to {
    opacity: 0;
    transform: perspective(400px) rotateY(-90deg);
}
```

**Exemplo 11: Flip Vertical**

```css
/* Efeito de flip vertical. */
.page-enter-active, .page-leave-active {
    transition: all 0.5s;
}
.page-enter-from {
    opacity: 0;
    transform: perspective(400px) rotateX(90deg);
}
.page-leave-to {
    opacity: 0;
    transform: perspective(400px) rotateX(-90deg);
}
```

**Exemplo 12: Combinação (Slide + Fade)**

```css
/* Combina slide horizontal com fade. */
.page-enter-active, .page-leave-active {
  transition: all 0.4s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
```

**Exemplo 13: Combinação (Zoom + Fade)**

```css
/* Combina zoom com fade. */
.page-enter-active, .page-leave-active {
  transition: all 0.4s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
```

**Exemplo 14: Combinação (Rotate + Fade)**

```css
/* Combina rotação com fade. */
.page-enter-active, .page-leave-active {
  transition: all 0.5s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: rotate(45deg);
}
```

**Exemplo 15: Efeito Blur**

```css
/* Aplica um efeito de desfoque (blur) na entrada e saída. */
.page-enter-active, .page-leave-active {
  transition: all 0.5s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  filter: blur(5px);
}
```

**Exemplo 16: Skew (Inclinação) Horizontal**

```css
/* Inclina a página horizontalmente. */
.page-enter-active, .page-leave-active {
    transition: all 0.4s ease;
}

.page-enter-from, .page-leave-to {
    opacity: 0;
    transform: skewX(30deg);
}
```

**Exemplo 17: Skew (Inclinação) Vertical**

```css
/* Inclina a página verticalmente. */
.page-enter-active, .page-leave-active {
    transition: all 0.4s ease;
}

.page-enter-from, .page-leave-to {
    opacity: 0;
    transform: skewY(15deg);
}
```

**Exemplo 18: Combinação (Slide + Scale)**

```css
/* Combina slide e scale para um efeito mais complexo. */
.page-enter-active, .page-leave-active {
    transition: all 0.5s ease;
}
.page-enter-from {
    opacity: 0;
    transform: translateX(-50%) scale(0.8);
}
.page-leave-to {
    opacity: 0;
    transform: translateX(50%) scale(0.8);
}
```

**Exemplo 19: Transição com diferentes timings (entrada mais rápida)**

```css
/* A página nova entra mais rápido do que a página antiga sai. */
.page-enter-active {
    transition: all 0.3s ease;
}
.page-leave-active {
    transition: all 0.6s ease;
}
.page-enter-from, .page-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
```

**Exemplo 20: Transição com diferentes timings (saída mais rápida)**

```css
/* A página antiga sai mais rápido do que a página nova entra. */
.page-enter-active {
    transition: all 0.6s ease;
}
.page-leave-active {
    transition: all 0.3s ease;
}
.page-enter-from, .page-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
```

**Exemplo 21: Bounce (com easing diferente)**

```css
/* Efeito de "bounce" com um easing personalizado para um movimento mais elástico. */
.page-enter-active, .page-leave-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Easing personalizado */
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
```

**Exemplo 22: Back (com easing diferente)**

```css
/* Efeito "back" com um easing que faz a página recuar um pouco antes de entrar/sair. */
.page-enter-active, .page-leave-active {
    transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Easing "back" */
}

.page-enter-from,
.page-leave-to {
    transform: translateY(-50px);
    opacity: 0;
}
```

## 7. Conclusão <a name="conclusao"></a>
Com esses exemplos e explicações, você tem agora um bom conhecimento das transições de página no Nuxt, e pode adiconar transições.