<template>
  <v-app app dark>
    <v-layout column>
      <v-app-bar
        dense
        dark
      >
        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn v-if="isAuth" icon @click="exit" title="logout">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-app-bar>
      <v-content>
        <router-view />
      </v-content>
    </v-layout>
  </v-app>
</template>
<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { Action, namespace } from 'vuex-class';
const auth = namespace('Auth');
const user = namespace('User');

interface otherUser {
  link: string;
  newName: string;
  userId: number;
}

@Component
export default class App extends Vue {
  public title: string = 'Main page';
  public otherUser: otherUser = {
    link:"https://images-na.ssl-images-amazon.com/images/M/MV5BNTk2OGU4NzktODhhOC00Nzc2LWIyNzYtOWViMjljZGFiNTMxXkEyXkFqcGdeQXVyMTE1NTQwOTk@._V1_UY256_CR12,0,172,256_AL_.jpg",
    newName: "Иван Иванов",
    userId: 255,
  };

  @auth.State
  public listAuth!: any[];
  @user.State
  public listUsers!: any[];
  @auth.Action
  public logout!: (userId: any) => void;
  @user.Action
  public clearDataUser!: (userId: any) => void;
  @user.Action
  public setDataUser!: (data: object) => void;
  @auth.Action
  public updateAuth!: (data: object) => void;

  get currentUserId(): any {
    return this.$route.query.id ? this.$route.query.id : null;
  }

  get isAuth(): boolean {
    return this.currentUserId && Boolean(this.listAuth.length) && this.listAuth.some((v) => String(v.userId) === String(this.currentUserId));
  }

  public exit(): void {
    this.logout(this.currentUserId);
    this.clearDataUser(this.currentUserId);
    this.$router.push({ name: 'Home' });
  }

  @Watch('$route', { immediate: false, deep: true })
  public test(val: any) {
    if (val.path === '/chat') {
      this.title = 'Chat page';
    } else {
      this.title = 'Main page';
    }
  }

  mounted() {
    this.setDataUser(this.otherUser);
    this.updateAuth({ greeting: `Hi ${this.otherUser.newName}!`, userId: this.otherUser.userId });
  }
}
</script>

<style lang="scss">
@import 'assets/scss/style';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
