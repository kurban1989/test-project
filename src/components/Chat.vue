<template>
  <div class="d-flex flex relative h-100 chat">
    <template v-if="user">
      <v-navigation-drawer
        dark
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent
        class="inline-f"
      >
        <v-list-item class="px-2">
          <v-list-item-avatar>
              <img :src="user.avatar" />
          </v-list-item-avatar>

          <v-list-item-title>{{ user.name }}</v-list-item-title>

          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Contacts</v-list-item-title>
          </v-list-item>

          <v-divider />
          <template v-for="item in listUsers">
            <v-list-item
              :key="item.userId"
              link
              class="px-0"
              @click="addTo(item.userId, item.name)"
            >
              <v-list-item-avatar>
                <img :src="item.avatar" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="inline-f">{{ item.name }}</v-list-item-title>
                <v-icon v-if="userTo === item.userId" class="inline-f" right size="16">mdi-marker</v-icon>
              </v-list-item-content>
            </v-list-item>
          </template>

        </v-list>
      </v-navigation-drawer>
    </template>

    
    <Messangers :current-id="currentUserId" class="inline-f column w-100" :class="{'box-message-other': double}">
      <v-container v-if="showTextArea" fluid dark>
        <v-textarea
          name="add-message"
          v-model="text"
          filled
          :label="`Write here you message for ${userToName}`"
          auto-grow
        />

        <div class="control-textarea">
          <v-btn color="primary" dark md @click="send">Send message</v-btn>
          <v-spacer />
          <v-btn color="secondary" icon @click="collapse" title="collapse textarea" style="background: rgba(3, 169, 244, .4);">
            <v-icon>mdi-arrow-collapse-down</v-icon>
          </v-btn>
        </div>
      </v-container>
    </Messangers>

    <v-snackbar
      v-model="snackbar"
      right
      :timeout="4100"
    >
      {{ greeting }}
      <v-btn
        color="blue"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, Getter, namespace } from 'vuex-class';
import Messangers from '@/components/Messangers.vue';
const auth = namespace('Auth');
const user = namespace('User');
const msg = namespace('Msg');

@Component({
    components: {
        Messangers,
    },
})

export default class Chat extends Vue {
  @Prop() public currentOtherId!: number;
  @Prop() public double!: boolean;

  public snackbar: boolean = false;
  public drawer: boolean = true;
  public mini: boolean = true;
  public showTextArea: boolean = false;
  public userTo: number = NaN;
  public text: string = '';
  public userToName: string = '';

  @user.State
  public listUsers!: any[];
  @auth.State
  public listAuth!: any[];
  @msg.Action
  public setMessage!: (message: object) => void;

  get currentUserId(): any {
    return this.currentOtherId ? this.currentOtherId : this.$route.query.id || 0;
  }

  get isAuth(): boolean {
    return this.currentUserId && Boolean(this.listAuth.length) && this.listAuth.some((v) => String(v.userId) === String(this.currentUserId));
  }

  get greetingTest(): any {
    return this.listAuth.find((v) => String(v.userId) === String(this.currentUserId)) || null;
  }

  get greeting(): any {
    return this.greetingTest ? this.greetingTest.greeting : '';
  }

  get user(): any {
    return this.listUsers.find((v) => String(v.userId) === String(this.currentUserId)) || null;
  }

  public send(): void {
    if (this.text.length > 1) {
      this.setMessage({
        fromUserId: Number(this.currentUserId),
        toUserId: this.userTo,
        message: this.text,
        time: Date.now(),
      });

      this.text = '';
    }
  }

  public collapse(): void {
    this.showTextArea = false;
  }

  public addTo(id: number, name: string): void {
    this.showTextArea = true;
    this.userTo = id;
    this.userToName = name;
  }

  public mounted() {
    if (!this.isAuth) {
      this.$router.push({ name: 'Home' });
    } else {
      this.snackbar = true;
    }
  }
}
</script>
