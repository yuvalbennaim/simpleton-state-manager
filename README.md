# Simpleton State Manager - WORK IN PROGRESS!

A super simple State Manager for your modern Web Application.
In fact, it's so simple, that simple is in it's name.

Whether you use an MVC framework such as React, Angular, Vue, WebComponents or plain Vanilla Javascript,
this universal, lightweight solution is all you need to manage your Application's Frontend state, no matter how complex it gets.

For any questions, comments or complaints: **yuvalbenniam@gmail.com**

## The Fundametals

This State Manager is a plain JavaScript class which follows the Singleton Design Pattern.
There is ever only a single instance of the class that is constructed per a browser window context.
Every invokation of the constructor returns the very same object reference.

The Models are stored in the class's private member (identified by the "#" prefix) that is protectd from the outside code and is accessed exclusively through a Proxy object.

Once you instanciate a SimpletonStateManager you can use it to store an almost limitless amount of individual Models, 
retrieve them as needed and subscribe to their changes.

You can even store functions as models.

### Instanciating a SimpletonStateManager

```javascript
  const store = new SimpletonStateManager(); //everyone gets the same static instance
```

### Setting a Model

Models are any Javascript Entity (Object, Array, Fucntion or primitive)
Whether you construct a new Model, or obtain it from an API call or by any other means you use the SimpletonStateManager to register this Model with a **unique name**.
Be advised, there is no "updateModel" operation. Registering a new Model with the same name will overwrite the existing Model and notify all subscribers.

```javascript
  const modelOne = { name: 'modelOne', value: 3 };
  store.setModel('modelOne', modelOne);
```

### Getting a Model

Use the SimpletonStateManager instance to explicitly obtain a clone of the stored Model. The stored models are immutable and you are never getting the actual reference:

```javascript
  const sampleModel = store.getModel('modelOne');
  //do whatever you want to do with this model like render the UI
```

### Subscribing to Model Changes

To be notified when a model is created or modified, you subscribe to a model by it's name, provide a unique subscriber name and a callback function.
The subscriber names must be **uniquely qualified** as sometimes you will have several instances of the same component in a list.

```javascript
  const modelName = 'modelOne';
  const subscriberName = 'myComponenentName';

  store.subscribe(modelName, subscriberName, (model) => { 
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
  store.unsubscribe(modelName, subscriberName);
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

## Examples

Under Construction...