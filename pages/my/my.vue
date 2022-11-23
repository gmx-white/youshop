<template>
  <userinfo v-if="token"></userinfo>
  <login v-else></login>
</template>

<script>
import { mapState } from 'vuex'
import badge from '../../mixins/tabbar-badge'
export default {
  data() {
    return {

    }
  },
  mixins: [badge],
  computed: {
    ...mapState('m_user', ['token'])
  },
  onLoad() {
  }
}
</script>

<style lang="scss">

</style>