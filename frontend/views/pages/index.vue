<template>
  <Tutorial />
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api';

import CommonMixin from '~/mixins/CommonMixin';

export default defineComponent({
  name: 'IndexPage',
  mixins: [
    CommonMixin
  ]
});
</script>
