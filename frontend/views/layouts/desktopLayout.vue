<template>
  <div id="app">
    <div class="page">
      <aside class="sidebar">
        <NavMenuComponent />
      </aside>

      <main>
        <div class="top-row px-4">
          <a>
            <span class="badge rounded-pill bg-primary">Proxy Server: Nginx</span> +
            <span class="badge rounded-pill bg-success">App Server: Nuxt2</span> +
            <span class="badge rounded-pill bg-warning">Api Server: .Net6</span>
          </a>
        </div>

        <article class="content px-4">
          <Nuxt />
        </article>
      </main>
    </div>
  </div>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api';

import NavMenuComponent from '~/components/NavMenu/NavMenu.component.vue';

export default defineComponent({
  name: 'DesktopLayout',
  components: {
    NavMenuComponent
  }
});
</script>
<style src="@/assets/scss/layout.scss" scoped lang="scss"></style>
