import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    try {
      const result = await axios.post("http://localhost:5000/createUser", {
        name: name,
        email: email,
        password: password
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="hero min-h-screen" style={{backgroundImage: 'url(/Images/image6.png)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="card shrink-0 w-full max-w-2xl shadow-2xl bg-base-100" style={{width: '500px', padding: '2rem'}}>
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <Link to="/login" className="label-text-alt link link-hover mt-5">Already have an account ?</Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Sign up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;



