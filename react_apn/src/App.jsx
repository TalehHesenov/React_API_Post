import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const BASE_URL = "http://localhost:3005/";

function App() {
  const [lastname,setLastName] = useState("");
  const [commit,setCommit] = useState("");
  const [Allcommit,setAllCommit] = useState([]);


  const getCommit = async () => {
    const response = await axios.get(BASE_URL + "comments"); 
    console.log(response.data); 
    setAllCommit(response.data);
  };


    getCommit()



  // const getUserLER = async (userId) => {
  //   const resultes = await axios.get(`${BASE_URL}comments/${userId}`)
  //   console.log(resultes.data);
   
  // }

 


     const  pushCommit= async(commitId)=>{
    const resultess = await axios.post(`${BASE_URL}comments`,commitId)
    console.log("response",resultess.data);
 
  }
  
 

  const addsCommit = ()=>{


    // getUserLER(1) 

     const commitIds = {
      "text": `${commit}`,
      "author": `${lastname}`
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

  {Allcommit.map((item, index) => ( 
        <div className="commintDiv" key={index} >
          <p>Name: {item.author}</p>
          <p>Commit: {item.text}</p>
        </div>
      ))}
 
  </>
  );
}

export default App;
