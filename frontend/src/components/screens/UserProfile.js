import React, { useEffect,useState,useContext } from 'react'
import {useParams} from 'react-router-dom'
import { UserContext } from '../../App'

const UserProfile = () =>{
    const [userProfile, setUserProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
     const [showFollow,setShowFollow] = useState(true)
    const {userId} = useParams()
    // console.log(userProfile)


    const followUser =() =>{
        fetch('http://localhost:5000/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userId
            })
        })
        .then(res => res.json())
        .then(result =>{
            // console.log("result",result)
            dispatch({type:"UPDATE",payload:{following:result.following,follower:result.follower}})
            localStorage.setItem("user",JSON.stringify(result))
            setUserProfile(prevData =>{
               return{ 
                ...prevData,
                user:{
                    ...prevData.user,
                    followers:[...prevData.user.followers,result._id]
                }
               }
            })
            setShowFollow(false)
        })
        .catch(err => console.log(err))  
    }

    const UnfollowUser =() =>{
        fetch('http://localhost:5000/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userId
            })
        })
        .then(res => res.json())
        .then(result =>{
            // console.log("result",result)
            dispatch({type:"UPDATE",payload:{following:result.following,follower:result.follower}})
            localStorage.setItem("user",JSON.stringify(result))
            setUserProfile(prevData =>{
                const newFollower = prevData.user.followers.filter(item => item !== result._id)
               return{ 
                ...prevData,
                user:{
                    ...prevData.user,
                    followers:newFollower
                }
               }
            })
            setShowFollow(true)
        })
        .catch(err => console.log(err))  
    }

    let renderItem;
    useEffect(()=>{
        fetch(`http://localhost:5000/user/${userId}`,{
            headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                setUserProfile(result)
            })
            .catch(err => {
                console.log("error",err)
            })
        },[])

    if(userProfile === null || userProfile.posts.length==0){
        renderItem=<h1>Loading</h1>
    }else{
      renderItem =   <div style={{maxWidth:"550px",margin:"0px auto"}}>
        <div style={{
            display:"flex",
            justifyContent:'space-around',
            margin:"18px 0px"
        }}>
            <div>
            <img src={userProfile.user.pic} style={{width:'160px',height:"160px",borderRadius:"80px"}}/>
            </div>
            <div>
            <h4>{userProfile.user.name}</h4>
            <h4>{userProfile.user.email}</h4>
                <div style={{display:'flex',justifyContent:"space-between",width:"108%"}}>
                    <h6>{userProfile.posts.length} Posts</h6>
                    <h6>{userProfile.user.followers.length} Followers</h6>
                    <h6>{userProfile.user.following.length} Following</h6>
                    {showFollow
                    ?
                    <button className="btn waves-effect waves-light #0d47a1 blue darken-1" onClick={()=>followUser()}>Follow</button>
                    :
                    <button className="btn waves-effect waves-light #0d47a1 blue darken-1" onClick={()=>UnfollowUser()}>UnFollow</button>
                    }

                    
                </div>
            </div>
        </div>
        <div className="gallery">
            {userProfile.posts.map(item =>{
                return (
                    <img className="item" src={item.photo} alt={item.title} key={item.title}/>
                )
            })}
        </div>
    </div>
    }
        

    return renderItem
}

export default UserProfile