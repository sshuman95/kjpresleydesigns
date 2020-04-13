import React from 'react';

const LoginForm = (props) =>{
    return(
    <form style={{display:'flex',flexDirection:'column',alignItems:'center'}} onSubmit={props.login}>
        <label htmlFor='email'>Email: </label>
        <input onChange={props.handleChange} id='email' name='email' value={props.email}/>
        <label htmlFor='password'>Password: </label>
        <input type='password' id='password' onChange={props.handleChange} name='password' value={props.password}/>
        <button style={{marginTop:'10px'}} type='submit'>Log in</button>
    </form>)
};

export default LoginForm;