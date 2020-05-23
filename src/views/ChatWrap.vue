<template>
  <div class="d-flex flex relative h-100" :class="{'message__double-screen': double}">
    <chat :double="false" />
    <chat :current-other-id="255" :double="double" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Chat from '@/components/Chat.vue';

@Component({
    components: {
        Chat,
    },
})

export default class ChatWrap extends Vue {
  public double: boolean = true;
}
</script>