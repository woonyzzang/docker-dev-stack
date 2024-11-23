<template>
  <nuxt />
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'EmptyLayout',
  head() {
    return {
      script: [
        {src: `${this.$config.EPOCH_CDN_HOST}/${this.$config.EPOCH_CDN_PUBLIC_PATH}/latest/epoch-sdk.js?v=${this.$config.timestamp}`}
      ]
    }
  }
});
</script>
