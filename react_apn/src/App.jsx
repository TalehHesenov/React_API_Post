import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const BASE_URL = "http://localhost:3005/";

function App() {
  const [lastname,setLastName] = useState("");
  const [commit,setCommit] = useState("");
  const [Allcommit,setAllCommit] = useState([]);
  const [putLastname,setPutLastName] = useState("");
  const [putCommit,setPutCommit] = useState("");
  const [putId,setPutId] = useState("");


  const getCommit = async () => {
    const response = await axios.get(BASE_URL + "comments"); 
    console.log(response.data); 
    setAllCommit(response.data);
  };


   



  const getUserLER = async (userId) => {
    const resultes = await axios.get(`${BASE_URL}comments/${userId}`)
    console.log(resultes.data);
   
  }

 


     const  pushCommit= async(commitId)=>{
    const resultess = await axios.post(`${BASE_URL}comments`,commitId)
    getCommit();
    console.log("response",resultess.data);
 
  }
  
  const updateUser= async (userId,userData)=>{
    await axios.put(`${BASE_URL}comments/${userId}`,userData)
    getCommit()
    setPutLastName("");
    setPutCommit("");
    setPutId("");
  }

  const deleteUser= async (userId)=>{
    await axios.delete(`${BASE_URL}comments/${userId}`)
  }

  useEffect(()=>{
    getCommit()


// updateUser("1b2",{
//      "text": "Tatisko.",
//       "author": "Mantya"
// })
  // getUserLER(1) 


  // deleteUser("93c1")


  },[])

  const putCommitMetod = ()=>{
    updateUser(putId,{
      "text": putCommit,
       "author": putLastname
 })
  }

  const addsCommit = ()=>{


  
     const commitIds = {
      "text": commit,
      "author": lastname
    }

    pushCommit(commitIds)
    setLastName("")
 setCommit("")

  }


  return (
  <>
  <div className="addCommit">
    <input type="text" placeholder="LastName" value={lastname} onChange={(e)=>{setLastName(e.target.value)}}/>
    <br />
    <input type="text" placeholder="Commit" value={commit} onChange={(e)=>{setCommit(e.target.value)}} />
    <br />
    <button onClick={addsCommit}>Add Commit</button>
  </div>
  <br />
  <br />
<div>
  {Allcommit.map((item, index) => ( 
        <div className="commintDiv" key={index} >
          <p>Name: {item.author}</p>
          <p>Commit: {item.text}</p>
        </div>
      ))}
 </div>
 <br />

 <div className="putClass">
  <div>Update id</div>
 <input type="text" placeholder="Id" value={putId} onChange={(e)=>{setPutId(e.target.value)}}/>
 <br />
 <input type="text" placeholder="LastName" value={putLastname} onChange={(e)=>{setPutLastName(e.target.value)}}/>
    <br />
    <input type="text" placeholder="Commit" value={putCommit} onChange={(e)=>{setPutCommit(e.target.value)}} />
    <br />
    <button onClick={putCommitMetod}>Put Commit</button>

 </div>
  </>

  
  );
}

export default App;
