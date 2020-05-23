<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
        <v-card class="elevation-12 mt-10">
          <v-toolbar
            dark
            flat
          >
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model.trim="nick"
                label="Enter your nick name"
                name="nick"
                prepend-icon="mdi-account-box"
                type="text"
              />
              
              <v-text-field
                v-model.trim="avatar"
                label="Paste link for your avatar"
                name="avatar"
                prepend-icon="mdi-file-image"
                type="text"
              />

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="logIn">Login</v-btn>
          </v-card-actions>
        </v-card>

        <template v-if="error">
          <v-alert class="mt-5" type="error">
            {{ messageError }}
          </v-alert>
        </template>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, namespace } from 'vuex-class';
const auth = namespace('Auth');
const user = namespace('User');

@Component
export default class Home extends Vue {

  @user.Action
  public setDataUser!: (data: object) => void;

  @auth.Action
  public updateAuth!: (data: object) => void;

  private nick: string = '';
  private avatar: string = '';
  private messageError: string = '';
  private id: number = Math.ceil(Math.random() * 100);
  private error: boolean = false;

  public async logIn(): Promise<any> {
    const regexImg = /(http(s?):)(.*?)*\.(?:jpg|gif|png|jpeg)/gi;
    this.error = false;

    if (!this.nick.length) {
      this.messageError = 'Enter your nick name!';
      this.error = true;
      return;
    }

    if (!regexImg.test(this.avatar)) {
      this.messageError = 'Invalid link for image url!';
      this.error = true;
      return;
    }

    this.setDataUser({ newName: this.nick, link: this.avatar, userId: this.id });
    this.updateAuth({ greeting: `Hi ${this.nick}!`, userId: this.id });

    await this.$nextTick();
    this.$router.push(`/chat?id=${this.id}`);

  }
}
</script>
