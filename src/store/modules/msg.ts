import { VuexModule, Module, Mutation, Action, config } from 'vuex-module-decorators';

config.rawError = true;

interface Message {
  fromUserId: number;
  toUserId: number;
  message: string;
  time: string;
}

@Module({ namespaced: true })
class Msg extends VuexModule {
  public listMessage: any[any] = [];

  @Mutation
  public setStateMessage(messageObj: Message): void {
    this.listMessage.push({
      fromUserId: messageObj.fromUserId,
      toUserId: messageObj.toUserId,
      message: messageObj.message,
      time: messageObj.time,
    });
  }

  @Action
  public setMessage(messageObj: Message): void {
    this.context.commit('setStateMessage', messageObj);
  }

  get getAll(): any[any] {
    return this.listMessage;
  }
  get getByFromUserId()  {
    return (id: number): any[any] => {
      return this.listMessage.length ? this.listMessage.map((v: { fromUserId: number; }) => {
        if (v.fromUserId === id) {
          return {
            ...v,
            type: 'outgoing',
          };
        }
      }).filter((v: any) => typeof v !== 'undefined') : [];
    };
  }
  get getByToUserId() {
    return (id: number): any[any] => {
      return this.listMessage.length ? this.listMessage.map((v: { toUserId: number; })  => {
        if (v.toUserId === id) {
          return {
            ...v,
            type: 'incoming',
          };
        }
      }).filter((v: any) => typeof v !== 'undefined') : [];
    };
  }
}
export default Msg;
