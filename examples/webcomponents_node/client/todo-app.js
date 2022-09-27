import SimpletonStateManager from "/@/simpleton-state-manager/src/SimpletonStateManager.js";

class comp extends HTMLElement {
    
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.store = new SimpletonStateManager(); 

    this.store.subscribe('USER', 'todo-app', (model) => { // subscribe to the user model and re-render when it updates
      console.log('USER Model changed', model);
      this.getTodos();
      this.render();
    });

    this.render();
  }

  async getTodos() {
    this.store.setModel('TODOS', null);    
    const user = this.store.getModel("USER");
    let url = `/todos?username=${user.name}`;

    const request = new Request(url, {
        method: 'GET'
    });

    const response = await fetch(request);

    if (response.ok) {
      const data = await response.json();
      this.store.setModel('TODOS', data.todos);            
    }
  }

  render() {
    const user = this.store.getModel("USER");

    let html = `
        <link href="./css/app.css" rel="stylesheet">
        <div class="page-wrapper">`

          if(user == null) { //reshow login-view
            html += `<login-view><login-view>`
          }
          else { //show todo-list-view
            html += `<div class="view-wrapper">
              <todo-header></todo-header>
              <todo-list-view></todo-list-view>
            </div>`
          }       

        html += `<div>`;
      this.shadowRoot.innerHTML = html;
  }
}

customElements.define('todo-app', comp);