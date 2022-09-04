import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/style.css";
import "../css/register.css";

const EditUsers = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddres] = useState("");
  const [gender, setGender] = useState("Male");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7000/users/${id}`, {
        first_name,
        last_name,
        email,
        username,
        pass,
        birth,
        phone,
        address,
        gender,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:7000/api/users/${id}`);
    setUsername(response.data.data.user);
    setEmail(response.data.data.email);
    setPass(response.data.data.pass);
    setfirst_name(response.data.data.first_name);
    setlast_name(response.data.data.last_name);
    setPhone(response.data.data.phone);
    setGender(response.data.data.gender);
    setBirth(response.data.tgl);
    setAddres(response.data.data.address);
    console.log(response.data);
  };

  return (
    <div>
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>User Edit Form</h2>
          </div>
          <div className="row clearfix">
            <div className="">
              <form onSubmit={updateUser} id="update_user">
                <div className="row clearfix">
                  <div className="col_half">
                    <div className="input_field">
                      <span>
                        <i aria-hidden="true" className="fa fa-user"></i>
                      </span>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder="First Name"
                        value={first_name}
                        onChange={(e) => setfirst_name(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col_half">
                    <div className="input_field">
                      <span>
                        <i aria-hidden="true" className="fa fa-user"></i>
                      </span>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={(e) => setlast_name(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-lock"></i>
                  </span>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                  />
                </div>
                <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-lock"></i>
                  </span>
                  <input
                    id="confirm_password"
                    type="password"
                    name="confirm_password"
                    placeholder="Re-type Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                  />
                </div>
                <span id="message"></span>
                <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="start">Date of Birth :</label>
                  <input
                    type="date"
                    id="birth"
                    name="birth"
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                    min="1970-01-31"
                    max="2010-01-01"
                  />
                </div>

                <div className="input_field radio_option">
                  <input
                    type="radio"
                    name="gender"
                    id="rd1"
                    value="male"
                    checked={gender == "male" ? "yes" : ""}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="rd1">male</label>
                  <input
                    type="radio"
                    name="gender"
                    id="rd2"
                    value="female"
                    checked={gender == "female" ? "yes" : ""}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="rd2">Female</label>
                </div>
                <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddres(e.target.value)}
                    required
                  />
                </div>
                <input
                  id="myBtn"
                  className="button"
                  type="submit"
                  value="Update Profile"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <p className="credit">
        Developed by{" "}
        <a href="/" target="_blank">
          Traditional Game
        </a>
      </p>
    </div>
  );
};

export default EditUsers;
