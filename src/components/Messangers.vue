<template>
  <div v-bind="$attrs">
    <div class="message">
      <div class="message__card" v-for="item in history" :key="item.time + Math.random()" :class="`message__card--${item.type}`">
        <div class="message__avatar" :class="`message__avatar--${item.type}`">
          <img :src="getImg(item.fromUserId)" alt="">
        </div>
        <div class="message__cotainer" :class="`message__cotainer--${item.type}`">
          {{ item.message }}
          <time class="message__time" :class="`message__time--${item.type}`" :datetime="new Date(item.time).toLocaleDateString('en', optionDate)">
            {{ new Date(item.time).toLocaleDateString('en', optionDate) }}
          </time>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, Getter, namespace } from 'vuex-class';
const msg = namespace('Msg');
const user = namespace('User');

@Component
export default class Messangers extends Vue {
  @Prop() public currentId!: number;

  public optionDate: object = {
    month: 'long',
    weekday: 'long',
    day: 'numeric',
  };

  @msg.Getter('getByToUserId')
  public getByToUserId!: (id: number) => any;
  @msg.Getter('getByFromUserId')
  public getByFromUserId!: (id: number) => any;
  @msg.Getter('getAll')
  public messages!: any[];
  @user.Getter('userById')
  public userById!: (id: number) => object;

  public isEmpty(target: any) {
    return (typeof target === 'object' && !Array.isArray(target) && Object.keys(target).length === 0);
  }

  public getImg(id: number | string): string {
    const userObj: any = this.userById(Number(id));
    return !this.isEmpty(userObj) ? userObj.avatar : '';
  }

  get incoming(): any[] {
    const arrMes = this.getByToUserId(Number(this.currentId));
    return arrMes;
  }
  get outgoing(): any[] {
    const arrMes = this.getByFromUserId(Number(this.currentId));
    return arrMes;
  }
  get history(): any[] {
    const willSorted = this.incoming.concat(this.outgoing);
    return willSorted.sort((a, b) => {
      if (a.time > b.time) {
        return 1;
      }
      if (a.time < b.time) {
        return -1;
      }
      return 0;
    });
  }
}
</script>