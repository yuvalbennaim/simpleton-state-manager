import SimpletonStateManager from "/@/simpleton-state-manager/src/SimpletonStateManager.js";

class comp extends HTMLElement {
    
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    
    //http://localhost:3000/data
    //get sample data from API
    //store in stateStore

    const store = new SimpletonStateManager(); 
    const modelTwo = { name: 'modelTwo', value: 2 };
    store.setModel('modelTwo', modelTwo);
    const models = store.getModelList();
    console.log('Models', models);
    this.render();
  }

  render() {
      this.shadowRoot.innerHTML = `<div><h2>Hello from within the SampleApp!</h2></div>`;
      //render display CustomElements
  }
}

customElements.define('sample-app', comp);