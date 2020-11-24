import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'


const Signup = () =>{
    const history = useHistory();
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("")

    const PostData = () =>{
        fetch("http://localhost:5000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.error){
                M.toast({html:data.error,classes:'#d32f2f red darken-2'})
            }else{
                M.toast({html:data.msg,classes:'#00e676 green accent-3'})
                history.push('/signin')
            }
        })
        .catch(err => console.log(err))
    }

            return( <div className="mycard">
                <div className="card auth-card input-field">
                    <h2>Instagram</h2>
                    <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e=>setName(e.target.value)}/>
                    <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                    <div className="file-field input-field">
                    <div className="btn blue darken-1">
                    <span>Upload Image</span>
                    <input 
                    type="file"
                    />
                    </div>
                    <div className="file-path-wrapper">
                    <input 
                    className="file-path validate" 
                    type="text"
                    placeholder="Upload one or more files"/>
                    </div>
                    </div>
                    <button className="btn waves-effect waves-light #0d47a1 blue darken-4" onClick={()=> PostData()}>Signup</button>
                    <h5>
                    <Link to='/signin'>Already have an Account</Link>
                    </h5>
                </div>
            </div>
            );
    }




export default Signup