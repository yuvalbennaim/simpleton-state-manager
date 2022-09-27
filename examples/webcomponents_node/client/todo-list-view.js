import SimpletonStateManager from "/@/simpleton-state-manager/src/SimpletonStateManager.js";

class comp extends HTMLElement {
    
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.store = new SimpletonStateManager(); 
    
    this.store.subscribe('TODOS', 'todo-list-view', (model) => { // subscribe to the user model and re-render when it updates
        console.log('TODOS Model changed', model);
        this.todos = model;
        this.render();
    });
  
    this.render();
  }

  render() {    
    let html = `
        <link href="./css/app.css" rel="stylesheet">`;

        if(this.todos == null || this.todos.length === 0) {
          html += `<h3>You have nothing in your To Do list</h3>`;
        }
        else {
          html += `<table class="todo-table">
            <tr>
                <th>title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>`;
          
          this.todos.forEach((todo, index) => {
              html += `
                <tr>
                    <td>${todo.title}</td>
                    <td>${todo.category}</td>
                    <td>${todo.priority}</td>
                    <td>${todo.status}</td>
                    <td><button class="action-button" id="todo_${index}">Delete</button></td>
                </tr>`;
          });
        
          `</table>`;
        }

    this.shadowRoot.innerHTML = html;

    this.shadowRoot.querySelectorAll(".action-button").forEach(item => {
      item.addEventListener('click', e => {
          let id = e.currentTarget.id;
          const row = parseInt(id.substring(id.indexOf('_') + 1));
          this.todos.splice(row, 1);          
          console.log('deleted', id, this.todos); 
          this.store.setModel('TODOS', this.todos); //update model stroe
          this.render();
      });
  });
  }
}

customElements.define('todo-list-view', comp);