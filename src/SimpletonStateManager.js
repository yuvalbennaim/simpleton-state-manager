
export default class SimpletonStateManager {
  static instance = null;
  #models = {}; //private member
  #subscribers = {}; //privare member

  constructor() {
    if (!SimpletonStateManager.instance) { //Singleton
      SimpletonStateManager.instance = this;
      this.modelsProxy = new Proxy(this.#models, this.proxyHandler);
    } else {
      return SimpletonStateManager.instance;
    }
  }

  proxyHandler = {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    set(obj, prop, value) {getIn
      Reflect.set(obj, prop, value);
      SimpletonStateManager.instance.modelChanged(prop);
      return true;
    },
  };

  setModel(modelName, model) {
    this.modelsProxy[modelName] = model;
  }

  notifyModelListeners(modelName) {
    this.modelChanged(modelName);
  }

  getModel(modelName) {
    const model = this.modelsProxy[modelName];
    const isArr = model instanceof Array;
    const isObj = model instanceof Object;

    if (model != null) {
      if(model instanceof Function) {
        return model;
      }
      else if (!isObj) {
        return model;
      } if (isArr) {
        const copy = JSON.parse(JSON.stringify(model));
        return JSON.parse(JSON.stringify(model));
      } 
      return { ...model };
    }

    return model;
  }

  getModelList() {
    return { ...this.modelsProxy };
  }

  subscribers(modelName) {
    if (this.#subscribers[modelName] == null) {
      this.#subscribers[modelName] = [];
    }

    return this.#subscribers[modelName];
  }

  subscribe(modelName, key, callback) {
    const modelSubscribers = this.subscribers(modelName);
    modelSubscribers[`${key}`] = callback;
  }

  unsubscribe(modelName, key) {
    const modelSubscribers = this.#subscribers[modelName];
    if (modelSubscribers) {
      delete modelSubscribers[key];
    }
  }

  unsubscribeAll() {
    this.#models = {};
    this.#subscribers = {};
    this.modelsProxy = new Proxy(this.#models, this.proxyHandler);
  }

  modelChanged(modelName) {
    const value = this.modelsProxy[modelName];
    const modelSubscribers = this.#subscribers[modelName];

    if (modelSubscribers) {
      for (const key of Object.keys(modelSubscribers)) {
        const callback = modelSubscribers[key];
        if (callback) {
          callback(value);
        }
      }
    }
  }
}