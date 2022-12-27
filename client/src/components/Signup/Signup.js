import React, { useState } from 'react';
import "./Signup.css";

const Signup = () => {
    const [sex, setSex] = useState("");
    const [user,setUser] = useState({
        name:"",email:"",status:"NA"
    });

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value})
    }

//fetch api to transfer data
    const PostData = async (e) => {
        e.preventDefault();
        //object destruction so dont need to write user.name etc again and again
        const { name, email, status } = user;
        
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({ 
                // name: name doesnt need to be written because its the same name
                name, email, status
            })
        });

        const data = await res.json();
        console.log(data.sex);
        setSex(data.sex);

        if(data.status === 422 || !data) {
            window.alert("Invalid Credentials - If error persists, contact admin");
            console.log("Invalid Credentials - If error persists, contact admin");
        } else {
            window.alert("Registration Successful! Welcome Aboard!");
            console.log("Registration Successful! Welcome Aboard!");

        }

    }

    return (
        <>
            <div className="form-body">
                    <div className="form-holder">
                                <form method="POST" id="register-form" className="requires-validation" novalidate>
                                    <div className="col-md-12">
                                        <input style={{width: '20vw', height: '2vh', margin: '5px', borderRadius: '20px', padding: '10px'}} className="form-control" type="text" name="name" id="name" value={user.name} onChange={handleInputs} placeholder="Full Name" required/>
                                    </div>

                                    <div className="col-md-12">
                                        <input style={{width: '20vw', height: '2vh', margin: '5px', borderRadius: '20px', padding: '10px'}} className="form-control" type="email" name="email" id="email" value={user.email} onChange={handleInputs} placeholder="Email Address" required/>
                                    </div>

                                    <div className="col-md-12">
                                        <input style={{width: '20vw', height: '2vh', margin: '5px', borderRadius: '20px', padding: '10px'}} className="form-control" type="text" name="status" id="status" value={user.status} onChange={handleInputs} placeholder="Status" required/>
                                    </div>
                                    <div className="form-button mt-3">
                                        <button id="signup" name="signup" type="submit" style={{color: 'black', backgroundColor: 'grey', padding: '10px', paddingLeft: '50px', paddingRight: '50px', marginTop: '5px', borderRadius: '20px', cursor: 'grab', fontWeight: '600'}} onClick={PostData}>Register</button>
                                    </div>

                                    <h2 style={{color: 'white'}}>{sex}</h2>
                                </form>
                        </div>
            </div>

        </>
    )
}

export default Signup