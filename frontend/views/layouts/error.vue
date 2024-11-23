<template></template>

<script>
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'ErrorPage',
  layout: 'emptyLayout',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  async fetch() {
    let statusCode = null;

    switch (this.error.statusCode) {
      case 500:
        statusCode = 500;
        break;
      case 404:
        statusCode = 404;
        break;
    }

    // if (!Object.is(statusCode, null)) {
    //   // [D] 공통 플랫폼 에러페이지 리다이렉트
    //   // - 404: https://kcrealplatformdownload.blob.core.windows.net/epoch-signin/errorpage/en-us/404.html?RetUrl=
    //   // - 500: https://kcrealplatformdownload.blob.core.windows.net/epoch-signin/errorpage/en-us/500.html?RetUrl=
    //   const url = `https://kcrealplatformdownload.blob.core.windows.net/epoch-signin/errorpage/en-us`;
    //
    //   this.$nuxt.context.redirect(`${url}/${statusCode}.html?RetUrl=${this.$config.BASE_URL}`);
    // }
  }
});
</script>
