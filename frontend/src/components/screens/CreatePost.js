import React, { useState,useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const CreatePost = () =>{

    const history = useHistory();
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [image,setImage] = useState("");
    const [url,setUrl] = useState("");

    useEffect(()=>{
        if(url){
            fetch("http://localhost:5000/createpost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    pic:url
                })
            }).then(res=>res.json())
              .then(data => {
                  if(data.error)
                M.toast({html:""+data.error,classes:"#c62828 red darken-2"})
                else{
                    M.toast({html:"Post Added successfully",classes:"#c62828 green darken-2"})
                    history.push('/')
                }  
                // console.log(data)
              
        })
        }
    },[url])


    const PostDetails = () =>{
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset","instaclone")
        data.append("cloud_name","igproject")
        fetch("https://api.cloudinary.com/v1_1/igproject/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data => {
            setUrl(data.url)
          
    })
        .catch(err=>console.log(err))
    
    }

            return (
                <div className="card input-filled" 
                style={{
                    margin:"50px auto",
                    maxWidth:"500px",
                    padding:"40px",
                    textAlign:"center"
                }}>
                    <input 
                    type="text" 
                    placeholder="title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}/>
                    <input 
                    type="text" 
                    placeholder="body"
                    value={body}
                    onChange={(e)=>setBody(e.target.value)}/>
                    <div className="file-field input-field">
                    <div className="btn blue darken-1">
                    <span>Upload Image</span>
                    <input 
                    type="file"
                    onChange={(e)=>setImage(e.target.files[0])}/>
                    </div>
                    <div className="file-path-wrapper">
                    <input 
                    className="file-path validate" 
                    type="text"
                    placeholder="Upload one or more files"/>
                    </div>
                    </div>
                    <button
                    className="btn waves-effect waves-light #0d47a1 blue darken-1" 
                    onClick={()=>PostDetails()}>
                        Submit Post
                    </button>
        
                </div>
            );
    }




export default CreatePost
