
/**
 * 
 * @param {vue} store 
 * @param {qiankun props} props 
 */
function registerGlobalModule (store, props = {}) {

  if (!store || !store.hasModule) {
    return;
  }
 
  const initState = props.getGlobalState && props.getGlobalState() || {
    menu: [],
    user: {}
  };
 
  if (!store.hasModule('global')) {
    const globalModule = {
      namespaced: true,
      state: initState,
      actions: { 
        setGlobalState ({ commit }, payload) {
          commit('setGlobalState', payload);
          commit('emitGlobalState', payload);
        }, 
        initGlobalState ({ commit }, payload) {
          commit('setGlobalState', payload);
        },
      },
      mutations: {
        setGlobalState (state, payload) {
          // eslint-disable-next-line
          state = Object.assign(state, payload);
        }, 
        emitGlobalState (state) {
          if (props.setGlobalState) {
            props.setGlobalState(state);
          }
        },
      },
    };
    store.registerModule('global', globalModule);
  } else { 
    store.dispatch('global/initGlobalState', initState);
  }
};

export default registerGlobalModule;
