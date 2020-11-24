import React, {useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import { useHistory,Link } from 'react-router-dom';

const Home = () =>{
    const [data,setData] = useState([]);
    const {state,dispatch} = useContext(UserContext)

    const history = useHistory()
    useEffect(() => {
        if(!state){
            history.push('/signin')
        }
        fetch('http://localhost:5000/allpost',{
            headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(result =>{
            // console.log(result);
            setData(result.posts)
        })
        .catch(err => console.log(err))
    }, [])
 
    const likePost = (id) =>{
        fetch('http://localhost:5000/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        })
        .then(res => res.json())
        .then(result =>{
            // console.log("result",result.result._id)
            const newData = data.map(item =>{
                if(item._id === result.result._id){
                    return result.result;//push new array with likes array in the newData array
                }else{
                    return item
                }
            })
            // console.log("newData",newData)
            setData(newData)
        })
        .catch(err => console.log(err))
    }

    const UnlikePost = (id) =>{
        fetch('http://localhost:5000/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        })
        .then(res => res.json())
        .then(res =>{
            // console.log(res.result._id)
            const newData = data.map(item =>{
                // console.log("compare",item._id+"---"+result._id)
                if(item._id === res.result._id){
                    return res.result;
                }else{
                    return item
                }
            })
            setData(newData)
        })
        .catch(err => console.log(err))
    }

    const makeComment = (text,postId) =>{
        fetch('http://localhost:5000/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        })
        .then(res => res.json())
        .then(result =>{
            // console.log("result",result)
            const newData = data.map(item =>{
                if(item._id === result.result._id){
                    return result.result;//push new array with likes array in the newData array
                }else{
                    return item
                }
            })
            // console.log("newData",newData)
            setData(newData)
        })
        .catch(err => console.log(err))
    }

    const deletePost = postId =>{
        fetch(`http://localhost:5000/deletepost/${postId}`,{
            method:"delete",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(result =>{
            // console.log("result",result)
            const newData = data.filter(item =>{
                return item._id !== result.result._id
            })
            // console.log("newData",newData)
            setData(newData)
        })
        .catch(err => console.log(err))  
    }



    return (
                    <div className="home">
                    {
                        data.map(item =>{
                            return (
                                <div className="card home-card" key={item._id}>
                                <h5><Link to={item.postedBy._id!==state._id?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name}</Link>
                                {
                                item.postedBy._id == state._id
                                    ?                                 
                                <i className="material-icons" style={{float:'right'}} onClick={()=>deletePost(item._id)}>delete</i>
                                :
                                ""
                                }
                                </h5>
                                <div className="card-image">
                                <img src={item.photo} alt={item.title}/>
                                </div>
                                <div className="card-content">      
                                <i className="material-icons" style={{color:"red"}}>favorite</i>
                                {
                                item.likes.includes(state._id)
                                ?
                                <i className="material-icons" onClick={()=> UnlikePost(item._id)}>thumb_down</i>
                                :
                                <i className="material-icons" onClick={()=> likePost(item._id)}>thumb_up</i>
                                } 
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {item.comments.map(record =>{
                                    return(
                                        <h6 key={record._id} style={{fontWeight:"500"}}>{record.postedBy.name}  <span>{record.text}</span></h6>
                                    )
                                })}
                                <form onSubmit={(e)=> {
                                    e.preventDefault();
                                    // console.log(e.target[0].value)
                                    makeComment(e.target[0].value,item._id)
                                }
                                }>
                                <input type="text" placeholder="Add a Comment"/>
                                </form>
                                </div>
                                </div>                                
                            )
                        })
                    }

                    </div>
                );

    }
 

export default Home