import SimpletonStateManager from './SimpletonStateManager';

const MODEL_NAME = 'testModel';

describe('SimpletonStateManager', () => {

  test('create instance', () => {
    const store = new SimpletonStateManager();
    expect(store).toBeInstanceOf(SimpletonStateManager);
  });
 
  /* Whenever you instanciate a SimpletonStateManager, you get the same static instance */

  test('SimpletonStateManager instance is a Singleton', () => {;
    const storeOne = new SimpletonStateManager();
    const storeTwo = new SimpletonStateManager();
    expect(storeOne).toBe(storeTwo); //toBe check that the Objects are equal BY REFERENCE (same memory pointer)
  });
 
  /*  We store an array model and set it as immutable. When we getModel we get a clone of the 
      Array so pushing new elements does not affect the original Model */
  test('Model Array should be immutable', () => {
    const store = new SimpletonStateManager();
    const original = ['aaa', 'bbb'];
    store.setModel(MODEL_NAME, original); //immutable
    const arr = store.getModel(MODEL_NAME);
    arr.push('ccc');
    const arr2 = store.getModel(MODEL_NAME);
    expect(arr2.length).toEqual(2);
    expect(arr.length).toEqual(3);
  });

  /* test subscription handler */
  test('subscribe to model, get and set model', () => {
    const store = new SimpletonStateManager();
    const subscribeCallback = jest.fn();
    store.subscribe(MODEL_NAME, subscribeCallback);
    store.setModel(MODEL_NAME, { name: 'sample' });
    let sampleModel = store.getModel(MODEL_NAME);
    expect(sampleModel.name).toEqual('sample');
    store.setModel(MODEL_NAME, { name: 'changed_name' });
    sampleModel = store.getModel(MODEL_NAME);
    expect(sampleModel.name).toEqual('changed_name');
    expect(subscribeCallback).toBeCalledTimes(2);
  });

  /* any previously stored models will display along with the new ones added here*/
  test('outputs the  model list', () => {
    const store = new SimpletonStateManager();
    const modelOne = { name: 'modelOne' };
    store.setModel('modelOne', modelOne);
    const modelTwo = { name: 'modelTwo' };
    store.setModel('modelTwo', modelTwo);
    const models = store.getModelList();
    expect(Object.keys(models).length).toBeGreaterThanOrEqual(3);
  });

  /* clears the previously stored models and sets new ones, so only those should be accounted for */
  test('unsubscribeAll and outputs the model list', () => {
    const store = new SimpletonStateManager();
    store.unsubscribeAll();
    const modelOne = { name: 'modelOne' };
    store.setModel('modelOne', modelOne);
    const modelTwo = { name: 'modelTwo' };
    store.setModel('modelTwo', modelTwo);
    const models = store.getModelList();
    expect(Object.keys(models).length).toEqual(2);
  });
});
