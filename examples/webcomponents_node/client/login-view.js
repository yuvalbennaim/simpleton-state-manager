
import SimpletonStateManager from "/@/simpleton-state-manager/src/SimpletonStateManager.js";

class comp extends HTMLElement {

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.error = false;
        this.store = new SimpletonStateManager(); 
        this.render();
    }

    async login() {
        let name = this.shadowRoot.querySelector("#nameField").value;
        let pw = this.shadowRoot.querySelector("#pwField").value;
        let url = `/login?username=${name}&password=${pw}`;
        this.error = false;

        const request = new Request(url, {
            method: 'GET'
        });

        const response = await fetch(request);

        if (!response.ok) {
            this.error = true;
            this.render();
        }
        else {
            const userData = await response.json();
            this.store.setModel('USER', userData);            
        }
    }

    render() {
        let html = `
            <link href="./css/app.css" rel="stylesheet">
            <div class="login-container">
                <table class="full-width login-table-outer">
                    <tr> 
                        <td class="full-width third-height login-header">
                            <div class="login-sub-title">Manage your ToDos</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="full-'width third-height login-center">
                            <table class="login-table">
                                <tr>
                                    <td class="login-form-header">`
                                    
                                    if(this.error) {
                                        html += `<div class="login-error">Error Authenticating</div>`
                                    }
                                    else {
                                        html += `<div class="message">Please Log In</div>`
                                    }
                                      
                                    html += `</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input id="nameField" type="text" value="ben" class="login-form-control" placeholder="User Name..." autofocus="">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input id="pwField" type="password" value="admin" class="login-form-control" placeholder="Password">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button id="submitButton" class="btn btn-primary command-button login-button">Login</button>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>`;

        this.shadowRoot.innerHTML = html;

        const submitButton = this.shadowRoot.querySelector("#submitButton");
                    
        submitButton.addEventListener('click', e => {
            this.login();
        });
    }
}
  
customElements.define('login-view', comp);