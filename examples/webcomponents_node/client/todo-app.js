import SimpletonStateManager from "/@/simpleton-state-manager/src/SimpletonStateManager.js";

class comp extends HTMLElement {
    
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.store = new SimpletonStateManager(); 

    this.key = this.store.subscribe('USER', (model) => { // subscribe to the user model and re-render when it updates
      console.log('USER Model changed', model);
      this.getTodos();
      this.render();
    });

    //this could easily be externalized in a css file, loaded and extracted but for the sake of simpolicity, i just jard coded it here.
    const styleStr = `
      input{font-size:12px;color:#555;padding:4px;border:2px inset #666}
      label{font-weight:400;position:relative;top:-2px}
      .login-wrapper{width:100%;height:100%}
      .login-table{width:100%}
      .login-table td{text-align:center;padding:8px}
      .login-header{font-family:monospace!important;vertical-align:bottom;text-align:center}
      .login-center{vertical-align:middle;text-align:center}
      .login-footer{vertical-align:middle;text-align:center}
      .login-error{color:#cb5858!important}
      .login-button-cell{text-align:center}
      .login-form-header{font-size:20px;color:#d2d2d2;font-family:monospace!important}
      .login-form-control{font-family:monospace;background-color:#aaa;padding:10px;font-size:14px;box-shadow:inset 4px 4px 12px #000;width:180px;border:2px inset #ddd;border-radius:10px}
      .login-form-control:focus{outline:none!important}
      .login-button{cursor: pointer;font-family:monospace;width:120px;border:2px solid #61af5a!important;color:#75dd6c!important;background-color:#2b4d28;margin-top:10px;padding:5px;border-radius:5px}
      .login-button:hover{background-color:rgba(67,136,62,0.7);box-shadow:0 0 10px #12ed01}
      .login-button:focus{outline:none!important;outline-offset:0!important;background-color:rgba(67,136,62,0.7);box-shadow:0 0 10px #12ed01}
      .login-button:active{text-shadow:1px 1px 1px rgba(255,255,255,0)!important;outline:none!important;outline-offset:0!important;box-shadow:inset 5px 5px 15px rgba(0,0,0,0.65)!important;background-color:#345831!important;background-image:none!important;border:2px inset #00cc53!important;color:#4fa974!important}
      .login-title{font-size:100px;line-height:1em;font-weight:700;margin-bottom:20px;color:rgba(68,152,61,0.5);-webkit-text-stroke:2px #32dc4e}
      .login-sub-title{font-family:monospace!important;font-size:24px;line-height:1em;font-weight:400;color:#3ac130}
      .login-sub-title-small{display:none}
      .login-container{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}
      .login-form{position:absolute;z-index:4;left:50%;top:50%;width:300px;height:300px;padding:30px;transform:translate(-50%,-50%)}
      .page-wrapper{z-index:10;color:#fff;position:absolute;top:0;bottom:0;left:0;right:0}
      .view-wrapper{color:#eee;text-align:center;margin:auto;position:relative;top:50px;width:80%}
      .todo-header{font-size:20px;color:#ff0;font-weight:700}
      .todo-table{border:1px solid #555;border-collapse:collapse;width:100%;margin-top:20px}
      .todo-table TH{padding:10px;text-align:left;border:2px groove #747474;font-weight:700;background-color:#333;text-transform:uppercase}
      .todo-table TD{padding:10px;text-align:left;border:2px groove #747474;background-color:#555}
      .action-button{cursor: pointer;font-family:monospace;width:100%;border:2px solid #61af5a!important;color:#75dd6c!important;background-color:#2b4d28;margin-top:10px;padding:5px;border-radius:5px;cursor:pointer}
      .add-button{cursor: pointer;font-family:monospace;border:2px solid #61af5a!important;color:#75dd6c!important;background-color:#2b4d28;margin-top:10px;padding:5px;border-radius:5px;cursor:pointer}
      .todo-input{font-family:monospace;background-color:#aaa;padding:10px;font-size:14px;box-shadow:inset 4px 4px 12px #000;width:calc(100% - 30px);border:2px inset #ddd;border-radius:10px}
      .todo-select{width:100%;font-family:monospace;border:2px solid #61af5a!important;color:#75dd6c!important;background-color:#2b4d28;margin-top:10px;padding:5px;border-radius:5px;cursor:pointer}`;

    this.store.setModel('STYLE', styleStr);  
    this.render();
  }

  disconnectedCallback() {
    this.store.unsubscribe('USER', this.key);
  }

  async getTodos() {
    this.store.setModel('TODOS', null);    
    const user = this.store.getModel("USER");

    if(user != null) {
      let url = `/todos?username=${user.name}`;

      const request = new Request(url, {
          method: 'GET'
      });

      const response = await fetch(request);

      if (response.ok) {
        const data = await response.json();
        this.store.setModel('TODOS', data.user.todos);   
        this.store.setModel('CATEGORIES', data.user.categories);          
        this.store.setModel('PRIORITES', data.user.priorities);  
      }
    }
  }

  render() {
    const user = this.store.getModel("USER");
    const styleStr = this.store.getModel("STYLE");

    let html = `
        <style>${styleStr}</style>
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