import { Store, IOptions } from 'plume2';
import LikeActor from './actor/like-actor';
import actionCreator from './action-creator';

export default class AppStore extends Store {
  constructor(props: IOptions) {
    super(props);
    if (__DEV__) {
      (window as any)._store = this;
    }
  }

  bindActor() {
    return [new LikeActor()];
  }

  inc = () => {
    this.dispatch(actionCreator.INCREMENT);
  };
}
