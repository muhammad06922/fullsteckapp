import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import { useState } from "react";
import "../style/Form.css"
import Loading from "./Loading"

function Form({route, method}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";




  const handeletSubmit =async (e) => {
    setLoading(true)
    e.preventDefault();

    try{
      const res=await api.post(route,{username,password})
      if (method==="login"){
        localStorage.setItem(ACCESS_TOKEN,res.data.access)
        localStorage.setItem(REFRESH_TOKEN,res.data.refresh)
        navigate("/")
      }
    }
    catch (error){
          alert(error)
    }finally{
        setLoading(false)
    }


  };



  return (
    <form onSubmit={handeletSubmit} className="form-container">
      <h1>{name}</h1>
      <input 
       onChange={(e)=>setUsername(e.target.value)}
      type="text" 
      className="form-input" 
      placeholder="Username"
       />


      <input
      onChange={(e)=>setPassword(e.target.value)}
        type="password"
        className="form-input"
        placeholder="Password"
      />
      {loading && <Loading />}
      <button className="form-button" type="submit">
     {name}
      </button>
    </form>
  );
}

export default Form;
