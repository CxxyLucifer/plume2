import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Actor, Store, StoreProvider } from '../src/index';
import { Action } from '../src/decorator';

class HelloActor extends Actor {
  defaultState() {
    return { name: 'plume' };
  }

  @Action('change')
  change(state) {
    return state.set('name', 'plume++');
  }
}

class AppStore extends Store {
  constructor(props) {
    super(props);
    window['_store'] = this;
  }

  bindActor() {
    return [new HelloActor()];
  }

  change = () => {
    this.dispatch('change');
  };
}

@StoreProvider(AppStore)
class Home extends React.Component {
  state: { name: string };

  render() {
    return (
      <div>
        {this.state.name}
      </div>
    );
  }
}

describe('store provider test suite', () => {
  it('first render', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('store dispath change render', () => {
    const component = renderer.create(<Home />);
    const store = window['_store'] as AppStore;
    store.change();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
