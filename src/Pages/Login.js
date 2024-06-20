import React, {useState} from 'react'
import Navbar from '../Components/Navbar'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Login() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isValid, setIsValid] = useState(false)

   const navigate = useNavigate();

   async function handleClick(){
    await axios.post("http://localhost:5000/findUser", {
        name: name, 
        email: email, 
        password: password
    }).then(
        res => {
            if(res.data.found){
                setIsValid(true);
                localStorage.setItem('isValid', 'true');
                navigate("/")
            }
            else alert("Invalid Login")
        }
    )
   }

  return (
    <div>
        <Navbar />
        <div className="hero min-h-screen" style={{backgroundImage: 'url(/Images/image2.png)'}}>
        <div className="card shrink-0 w-full max-w-2xl shadow-2xl bg-base-100" style={{width: '500px',height: '500px', padding: '2rem'}}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="email" onChange={(e) => setName(e.target.value)} placeholder="name" className="input input-bordered" required />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} onC placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" className="input input-bordered" required />
          <label className="label mt-5">
            <Link to='/signup' className="label-text-alt link link-hover">I'm a new user?</Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button onClick={handleClick} className="btn btn-primary mt-5">Login</button>
        </div>
    </div>
  <div className="hero-overlay bg-opacity-60"></div>
</div>
    </div>
  )
}

export default Login