import React, { useEffect, useState } from 'react';
import useStateStore from '../hooks/useStateStore';

const LoginForm = () => {
    const store = useStateStore();
	const [error, setError] = useState(false);
    const [name, setName] = useState("Ben");

    const login = async () => {        
        setError(false);

        new Promise((resolveFunc, rejectFunc) => {
            const mockData = store.getModel("MOCK_DATA");
            let data = mockData[name];

            if(data == null) {
                setError(true);
            }
            setTimeout(() => { resolveFunc(data); }, 1000);
          }).then((data) => {
            if(data) {
              store.setModel("USER", data.name);
            }
          }); 
    };

	return (
		<div className="todo">
			<div className="login-container">
                <table className="full-width login-table-outer">
                    <tbody>
                        <tr> 
                            <td className="full-width third-height login-header">
                                <div className="login-sub-title">Manage your ToDos</div>
                            </td>
                        </tr>
                        <tr>
                            <td className="full-'width third-height login-center">
                                <table className="login-table">
                                    <tbody>
                                        <tr>
                                            <td className="login-form-header">
                                                {
                                                    error ? 
                                                        <div class="login-error">Error Authenticating</div> :
                                                        <div className="message">Please Log In</div>
                                                }
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input  name="name" className="login-form-control" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="User Name..."/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input name="pw" className="login-form-control" type="password" value="admin" placeholder="Password" readOnly/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button className="btn btn-primary command-button login-button" onClick={login}>Login</button>
                                            </td>
                                        </tr>
                                       </tbody> 
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
		</div>
	)
};

export default LoginForm;