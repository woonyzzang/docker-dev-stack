<template>
  <fragment>
      <div class="card">
        <h3 class="card-header">[SSR] API Data (IP 통신) = Server To Server</h3>
        <ul v-for="(todo, i) of this.ssrTodos" :key="i" class="list-group list-group-flush">
          <li class="list-group-item"><span class="badge bg-secondary">date</span> {{ todo?.date }}</li>
          <li class="list-group-item"><span class="badge bg-secondary">temperatureC</span> {{ todo?.temperatureC }}</li>
          <li class="list-group-item"><span class="badge bg-secondary">temperatureF</span> {{ todo?.temperatureF }}</li>
          <li class="list-group-item"><span class="badge bg-secondary">summary</span> {{ todo?.summary }}</li>
        </ul>
      </div>

      <br>

      <div class="card">
        <h3 class="card-header">[CSR] API Data (도메인 통신) = Client to Server</h3>
        <ul v-for="(todo, i) of this.csrTodos" :key="i" class="list-group list-group-flush">
          <li class="list-group-item"><span class="badge bg-secondary">date</span> {{ todo?.date }}</li>
          <li class="list-group-item"><span class="badge bg-secondary">temperatureC</span> {{ todo?.temperatureC }}</li>
          <li class="list-group-item"><span class="badge bg-secondary">temperatureF</span> {{ todo?.temperatureF }}</li>
          <li class="list-group-item"><span class="badge bg-secondary">summary</span> {{ todo?.summary }}</li>
        </ul>
      </div>
  </fragment>
</template>

<script>
import {defineComponent} from '@nuxtjs/composition-api';

import CommonMixin from '~/mixins/CommonMixin';

export default defineComponent({
  name: 'FetchPage',
  mixins: [
    CommonMixin
  ],
  async asyncData({$api}) {
    let ssrTodos = [];

    try {
      const res = await $api.get('/test');

      const {data} = res;

      ssrTodos = data;
    } catch (err) {
      // console.log(err);
    }

    return {
      ssrTodos
    };
  },
  data() {
    return {
      csrTodos: []
    };
  },
  async mounted() {
    try {
      const res = await this.$api.get('/test');

      const {data} = res;

      this.csrTodos = data;
    } catch (err) {
      // console.log(err);
    }
  }
});
</script>
