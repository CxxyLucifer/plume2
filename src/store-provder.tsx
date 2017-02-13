import * as React from 'react'
import {Map} from 'immutable'
import Store from './store'

type TStore = typeof Store
type IMap = Map<string, any>;
type Options = {}

export default function StoreProvider(AppStore: TStore, opts?: Options) {
  return function wrapper(Base: React.Component): React.Component {
    return class WrapperComponent extends Base {
      _isMounted: boolean;
      store: Store;
      state: Object;

      static displayName = `StoreProvider(${getDisplayName(Base)})`;

      static childContextTypes = {
        plume$Store: React.PropTypes.object
      };

      getChildContext: Function = (): Object => {
        return {
          plume$Store: this.store
        };
      };


      constructor(props: Object) {
        super(props)
        this._isMounted = false
        this.store = new AppStore(opts)
        this.state = this.store.state().toObject()
        this.store.subscribe(this._handleStoreChange)
      }

      componentWillMount() {
        super.componentWillMount && super.componentWillMount()
        this._isMounted = false
      }

      componentDidMount() {
        super.componentDidMount && super.componentDidMount()
        this._isMounted = true
      }

      componentWillUpdate() {
        super.componentWillUpdate && super.componentWillUpdate()
        this._isMounted = false
      }

      componentDidUpdate() {
        super.componentDidUpdate && super.componentDidUpdate()
        this._isMounted = true
      }

      componentWillUnmount() {
        super.componentWillUnmount && super.componentWillUnmount()
        this.store.unsubscribe(this._handleStoreChange)
      }

      render() {
        return super.render()
      }

      _handleStoreChange = (state: IMap) => {
        (this as any).setState((preState) => state.toObject())
      };
    }
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
  }
}