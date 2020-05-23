import { VuexModule, Module, Mutation, Action, config } from 'vuex-module-decorators';

config.rawError = true;

interface UserData {
  newName: string;
  link: string;
  userId: number;
}

@Module({ namespaced: true })
class User extends VuexModule {
  public listUsers: any[] = [];
  @Mutation
  public clearStateDataUser(userId: number | string): void {
    if (this.listUsers.length && this.listUsers[0].userId) {
      this.listUsers = this.listUsers.filter((v: { userId: number | string; }) => v.userId.toString() !== userId.toString());
    }
  }

  @Mutation
  public setToStateDataUser(ctx: UserData): void {
    this.listUsers.push({
      name: ctx.newName,
      avatar: ctx.link,
      userId: ctx.userId,
    });
  }
  @Action
  public setDataUser(ctx: UserData): void {
    this.context.commit('setToStateDataUser', ctx);
  }
  @Action
  public clearDataUser(userId: number | string): void {
    this.context.commit('clearStateDataUser', userId);
  }

  get userById() {
    return (id: number): object => {
      return this.listUsers.length ? this.listUsers.find((v: { userId: number; }) => v.userId === id) : {};
    };
  }
}
export default User;
