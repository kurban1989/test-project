import { VuexModule, Module, Mutation, Action, config } from 'vuex-module-decorators';

config.rawError = true;

interface AuthObj {
  isAuth?: boolean;
  greeting: string;
  userId: number;
}

@Module({ namespaced: true })
class Auth extends VuexModule {
  public listAuth: any[any] = [];

  @Mutation
  public setAuth(ctx: AuthObj): void {
    this.listAuth.push({
      isAuth: true,
      greeting: ctx.greeting,
      userId: ctx.userId,
    });
  }
  @Mutation
  public logoutUser(userId: number | string): void {
    if (this.listAuth.length && this.listAuth[0].userId) {
      this.listAuth = this.listAuth.filter((v: { userId: number | string; }) => v.userId.toString() !== userId.toString());
    }
  }

  @Action
  public updateAuth(ctx: AuthObj): void {
    this.context.commit('setAuth', ctx);
  }
  @Action
  public logout(userId: number | string): void {
    this.context.commit('logoutUser', userId);
  }
}
export default Auth;
