import {
  forceUpdate,
  getRenderingRef
} from "./chunk-6BI6LT3C.js";

// node_modules/@orama/wc-components/dist/esm/index-17add49b.js
var appendToMap = (map, propName, value) => {
  const items = map.get(propName);
  if (!items) {
    map.set(propName, [value]);
  } else if (!items.includes(value)) {
    items.push(value);
  }
};
var debounce = (fn, ms) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = 0;
      fn(...args);
    }, ms);
  };
};
var isConnected = (maybeElement) => !("isConnected" in maybeElement) || maybeElement.isConnected;
var cleanupElements = debounce((map) => {
  for (let key of map.keys()) {
    map.set(key, map.get(key).filter(isConnected));
  }
}, 2e3);
var stencilSubscription = () => {
  if (typeof getRenderingRef !== "function") {
    return {};
  }
  const elmsToUpdate = /* @__PURE__ */ new Map();
  return {
    dispose: () => elmsToUpdate.clear(),
    get: (propName) => {
      const elm = getRenderingRef();
      if (elm) {
        appendToMap(elmsToUpdate, propName, elm);
      }
    },
    set: (propName) => {
      const elements = elmsToUpdate.get(propName);
      if (elements) {
        elmsToUpdate.set(propName, elements.filter(forceUpdate));
      }
      cleanupElements(elmsToUpdate);
    },
    reset: () => {
      elmsToUpdate.forEach((elms) => elms.forEach(forceUpdate));
      cleanupElements(elmsToUpdate);
    }
  };
};
var unwrap = (val) => typeof val === "function" ? val() : val;
var createObservableMap = (defaultState, shouldUpdate = (a, b) => a !== b) => {
  const unwrappedState = unwrap(defaultState);
  let states = new Map(Object.entries(unwrappedState !== null && unwrappedState !== void 0 ? unwrappedState : {}));
  const handlers = {
    dispose: [],
    get: [],
    set: [],
    reset: []
  };
  const reset = () => {
    var _a;
    states = new Map(Object.entries((_a = unwrap(defaultState)) !== null && _a !== void 0 ? _a : {}));
    handlers.reset.forEach((cb) => cb());
  };
  const dispose = () => {
    handlers.dispose.forEach((cb) => cb());
    reset();
  };
  const get = (propName) => {
    handlers.get.forEach((cb) => cb(propName));
    return states.get(propName);
  };
  const set = (propName, value) => {
    const oldValue = states.get(propName);
    if (shouldUpdate(value, oldValue, propName)) {
      states.set(propName, value);
      handlers.set.forEach((cb) => cb(propName, value, oldValue));
    }
  };
  const state = typeof Proxy === "undefined" ? {} : new Proxy(unwrappedState, {
    get(_, propName) {
      return get(propName);
    },
    ownKeys(_) {
      return Array.from(states.keys());
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    },
    has(_, propName) {
      return states.has(propName);
    },
    set(_, propName, value) {
      set(propName, value);
      return true;
    }
  });
  const on = (eventName, callback) => {
    handlers[eventName].push(callback);
    return () => {
      removeFromArray(handlers[eventName], callback);
    };
  };
  const onChange = (propName, cb) => {
    const unSet = on("set", (key, newValue) => {
      if (key === propName) {
        cb(newValue);
      }
    });
    const unReset = on("reset", () => cb(unwrap(defaultState)[propName]));
    return () => {
      unSet();
      unReset();
    };
  };
  const use = (...subscriptions) => {
    const unsubs = subscriptions.reduce((unsubs2, subscription) => {
      if (subscription.set) {
        unsubs2.push(on("set", subscription.set));
      }
      if (subscription.get) {
        unsubs2.push(on("get", subscription.get));
      }
      if (subscription.reset) {
        unsubs2.push(on("reset", subscription.reset));
      }
      if (subscription.dispose) {
        unsubs2.push(on("dispose", subscription.dispose));
      }
      return unsubs2;
    }, []);
    return () => unsubs.forEach((unsub) => unsub());
  };
  const forceUpdate2 = (key) => {
    const oldValue = states.get(key);
    handlers.set.forEach((cb) => cb(key, oldValue, oldValue));
  };
  return {
    state,
    get,
    set,
    on,
    onChange,
    use,
    dispose,
    reset,
    forceUpdate: forceUpdate2
  };
};
var removeFromArray = (array, item) => {
  const index = array.indexOf(item);
  if (index >= 0) {
    array[index] = array[array.length - 1];
    array.length--;
  }
};
var createStore = (defaultState, shouldUpdate) => {
  const map = createObservableMap(defaultState, shouldUpdate);
  map.use(stencilSubscription());
  return map;
};

export {
  createStore
};
//# sourceMappingURL=chunk-CNMOQ2TW.js.map
