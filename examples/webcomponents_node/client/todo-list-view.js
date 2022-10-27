import SimpletonStateManager from "/@/simpleton-state-manager/src/SimpletonStateManager.js";

class comp extends HTMLElement {
    
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.store = new SimpletonStateManager(); 
    this.styleStr = this.store.getModel("STYLE"); //only need to do this once
    
    this.key = this.store.subscribe('TODOS', (model) => { // subscribe to the user model and re-render when it updates
        console.log('TODOS Model changed', model);
        this.todos = model;
        this.render();
    });
  
    this.render();
  }

  disconnectedCallback() {
    this.store.unsubscribe('TODOS', this.key);
  }

  render() {   
    let html = `
      <style>${this.styleStr}</style>`;

      let categoreis = this.store.getModel('CATEGORIES');           

      if(this.todos == null || this.todos.length === 0) {
        html += `<h3>You have nothing in your To Do list</h3>`;
      }
      else {
        html += `<table class="todo-table">
          <tr>
            <th>title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>`;
        
        this.todos.forEach((todo, index) => {
          let commonStr = ``;
          let selectedStr = (todo.category == 'none') ? "selected" : "";
          
          if(todo.status === 'New') {
            html += `
              <tr>
                <td>
                  <input type="text" id="title_${index}" value="${todo.title}" class="todo-input">
                </td>
                <td>
                <select class="todo-select" id="category_${index}" value="${todo.category}">
                 <option value="none">Select...</option>`;

                  categoreis.forEach((category) => {
                    selectedStr = (category == todo.category) ? "selected" : "";
                    html += `<option value="${category}" ${selectedStr}>${category}</option>`;
                  });

                  html += `</select>
                </td>
                <td>${todo.status}</td>
                <td><button class="action-button" id="save_${index}">Save</button></td>
              </tr>`;
          }
          else {
            html += `
              <tr>
                <td>${todo.title}</td>
                <td>${todo.category}</td>
                <td>${todo.status}</td>
                <td><button class="action-button" id="delete_${index}">Delete</button></td>
              </tr>`;
          }
        });
      
        html += `</table>`;
      }

    html += `<button class="add-button" id="addTaskButton">Add ToDo</button>`;

    this.shadowRoot.innerHTML = html;

    this.shadowRoot.querySelector("#addTaskButton").addEventListener('click', e => {
      const newTodo = { title: "New To DO", category: "none", status: "New" };
      this.todos.push(newTodo);
      this.store.setModel('TODOS', this.todos); //update model store
      this.render();
    });
    
    this.shadowRoot.querySelectorAll(".todo-input, .todo-select").forEach(item => {
      item.addEventListener('change', e => {
        let id = e.currentTarget.id;
        let tokens = id.split("_");
        let field = tokens[0];
        const row = tokens[1];
        this.todos[row][field] = e.currentTarget.value;
        this.store.setModel('TODOS', this.todos); //update model store
        this.render();
      });
    });

    this.shadowRoot.querySelectorAll(".action-button").forEach(item => {
      item.addEventListener('click', e => {
        let id = e.currentTarget.id;
        const row = parseInt(id.substring(id.indexOf('_') + 1));

        if(id.indexOf("save") > -1) {
          this.todos[row].status = "Open";
        }
        else {          
          this.todos.splice(row, 1);                    
        }

        this.store.setModel('TODOS', this.todos); //update model store
        this.render();
      });
    });
  }
}

customElements.define('todo-list-view', comp);