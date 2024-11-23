<template>
  <fragment>
    <div class="top-row ps-3 navbar navbar-dark">
      <div class="container-fluid">
        <a href="#" class="navbar-brand">[Docker] Dev Test</a>
        <button title="Navigation menu" class="navbar-toggler" @click="toggleNavMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>

    <div :class="navMenuCssClass" @click="toggleNavMenu">
      <nav class="flex-column">
        <div class="nav-item px-3">
          <NuxtLink to="/" exact-active-class="active" class="nav-link">
            <span class="oi oi-home" aria-hidden="true"></span> Home
          </NuxtLink>
        </div>
        <div class="nav-item px-3">
          <NuxtLink to="/fetch" active-class="active" class="nav-link">
            <span class="oi oi-list-rich" aria-hidden="true"></span> Fetch
          </NuxtLink>
        </div>
      </nav>
    </div>
  </fragment>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'NavMenuComponent',
  data() {
    return {
      collapseNavMenu: false,
      navMenuCssClass: null
    };
  },
  methods: {
    toggleNavMenu() {
      this.collapseNavMenu = !this.collapseNavMenu;
      this.navMenuCssClass = this.collapseNavMenu ? 'collapse' : null;
    }
  }
});
</script>
<style src="./NavMenu.module.scss" scoped lang="scss"></style>
