import React, { useEffect,useState,useContext } from 'react'
import { UserContext } from '../../App';


const Profile = () =>{
    const [pic, setPic] = useState([])
    const {state,dispatch} = useContext(UserContext);
    console.log(state)
    let renderItem;
    useEffect(()=>{
        fetch('http://localhost:5000/mypost',{
            headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            method:"post"
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                setPic(result.mypost)
            })
            .catch(err => {
                console.log("error",err)
            })
        },[])

    if(pic === 'undefind' || pic.length==0){
        renderItem=<h1>Loading</h1>
    }else{
      renderItem =   <div style={{maxWidth:"550px",margin:"0px auto"}}>
        <div style={{
            display:"flex",
            justifyContent:'space-around',
            margin:"18px 0px"
        }}>
            <div>
            <img src="https://i1.wp.com/thelifestylereport.ca/wp-content/uploads/2014/04/Chris-Evan-Captain-America-2-1.jpg?resize=640%2C593&ssl=1" style={{width:'160px',height:"160px",borderRadius:"80px"}}/>
            </div>
            <div>
                <h4>{state?state.name:"Loading"}</h4>
                <h5>{state?state.email:"Loading"}</h5>
                <div style={{display:'flex',justifyContent:"space-between",width:"108%"}}>
                    <h6>{pic?pic.length:"0"} Posts</h6>
                    <h6>{state?state.followers.length:"0"} Followers</h6>
                    <h6>{state?state.following.length:"0"} Following</h6>
                </div>
            </div>
        </div>
        <div className="gallery">
            {pic.map(item =>{
                return (
                    <img className="item" src={item.photo} alt={item.title} key={item.title}/>
                )
            })}
        </div>
    </div>
    }
        

    return renderItem
}

export default Profile