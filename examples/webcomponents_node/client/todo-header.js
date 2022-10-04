import SimpletonStateManager from "/@/simpleton-state-manager/src/SimpletonStateManager.js";

class comp extends HTMLElement {
    
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.store = new SimpletonStateManager(); 
    this.styleStr = this.store.getModel("STYLE"); //only need to do this once
    
    this.store.subscribe('TODOS', 'todo-header', (model) => { // subscribe to the user model and re-render when it updates
        console.log('TODOS Model changed', model);
        this.render();
    });
  
    this.render();
  }

  render() {
    const user = this.store.getModel("USER") || "?";
    const todos = this.store.getModel("TODOS") || [];

    let html = `
      <style>${this.styleStr}</style>
      <div class="todo-header">${user.name}'s To Do List [${todos.length}]</div>`;

    this.shadowRoot.innerHTML = html;
  }
}

customElements.define('todo-header', comp);