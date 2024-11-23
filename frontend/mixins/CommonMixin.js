import {
  defineComponent,
  computed,
  useContext,
  useRoute,
  useStore,
  wrapProperty
} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'CommonMixin',
  layout: 'desktopLayout'
  // layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobileLayout' : 'desktopLayout'
});
