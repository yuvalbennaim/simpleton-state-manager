# Simpleton State Manager

A super simple State Manager for your modern Web Application.
In fact, it's so simple, that simple is in its name.

Whether you use an MVC framework such as React, Angular, Vue, WebComponents or plain Vanilla JavaScript,
this universal, lightweight solution is all you need to manage your Application's Frontend state, no matter how complex it gets.

For any questions, comments or complaints: **yuvalbenniam@gmail.com**

## The Fundamentals

This State Manager is a plain JavaScript class which follows the Singleton Design Pattern.
There is ever only a single instance of the class that is constructed per a browser window context.
Every invocation of the constructor returns the very same object reference.

The Models are stored in the class's private member (identified by the "#" prefix) that is protected from the outside code and is accessed exclusively through a Proxy object.

Once you instantiate a SimpletonStateManager you can use it to store an almost limitless amount of individual Models, 
retrieve them as needed and subscribe to their changes.

You can even store functions as models.

### Instantiating a SimpletonStateManager

```javascript
  const store = new SimpletonStateManager(); //everyone gets the same static instance
```

### Setting a Model

Models are any JavaScript Entity (Object, Array, Function or primitive)
Whether you construct a new Model, or obtain it from an API call or by any other means you use the SimpletonStateManager to register this Model with a **unique name**.
Be advised, there is no "updateModel" operation. Registering a new Model with the same name will overwrite the existing Model and notify all subscribers.

```javascript
  const modelOne = { name: 'modelOne', value: 3 };
  store.setModel('modelOne', modelOne);
```

### Getting a Model

Use the SimpletonStateManager instance to explicitly obtain a clone of the stored Model. The stored models are immutable, and you are never getting the actual reference:

```javascript
  const sampleModel = store.getModel('modelOne');
  //do whatever you want to do with this model like render the UI
```

### Subscribing to Model Changes

To be notified when a model is created or modified, you subscribe to a model by it's name, provide a unique subscriber name and a callback function.

A subscribrerKey is returned from the subscribe function. You need to retain this key so that you can use it to unsubscribe.

```javascript
  const modelName = 'modelOne';

  const key = store.subscribe(modelName, (model) => { 
    console.log('Model changed', modelName, subscriberName, model);
    //do whatever you want to do with this model like render the UI
  }));
```

### Notifying Subscribers

If for some reason (like a refresh) you want to explicitly notify all the Subscribers of a particular model:

```javascript
  store.notifyModelListeners('modelOne'); //all the Model's subscribers will be notified
```

### Unsubscribing

As with any event listeners, you should clean up your models and subscribers when they are no longer needed or in scope. 
This is typically done when the components is removed from the DOM (dismounts), or you have an internal navigation event.
Complete page reloads will always result in a new SimpletonStateManager instance.
  
You can unsubscribe by name:

```javascript
  store.unsubscribe(modelName, key); //the key you received from subscribe()
```
Or brute force to purge all data:

```javascript
  store.unsubscribeAll();
```

### Getting All Models

A handy convenience function to help you debug your state:

```javascript
  const models = store.getModelList();
  console.log('All the Models', models);
```

## Installation

This repo is now published to NPM.

For the simplest use case all you need to do is to copy the SimpletonStatManager.js file directly into your project's folder and import it using relative path

```javascript
npm install simpleton-state-manager
```

## React Hooks
(Please see examples!)
**useStateStore** - this is the basic hook and does nothing more than returning the instance 
  ```javascript
    const store = useStateStore();
  ```

**useStateToStoreBinding** - this is a more advanced hook that wraps the Model subscriptions and bi-directionally binds it to a local useState variable. When the underlying Model changes, the State variable does as well and vice-versa. The Component is then re-rendered based on the new state. You can provide an optional default value (second arg) if the model has not yet been created, and an optional callback function in case you need to perform some operation besides binding the state.

This hook also automatically unsubscribes when the component is dismounted.

  ```javascript
    const [something, setSomething] = useStateToStoreBinding('MODELNAME', [], callback);
  ```

## Examples

Switch to the /examples folder and view the README file and run npm install, then npm start ,on any examples folder.

### webcomponents_node
Example of a vanilla JS / WebComponents implementation running on Node.JS.

### React_hooks
A React example which wraps the SimpletonStateManager in a Hook and is geared to demonstrate how to optimize the rendering of Components based on very targeted Model changes, not brute force.

An Interval starts and every 5 seconds will change a random box's color. Only the affected box's render counter will increment.

Click on a Box to randomly change its color while only re-rendering the box itself (the render-counter will only increment for the clicked box).

Click on the title to change a random box's color and re-render all the boxes.


Enjoy a Redux-free life!