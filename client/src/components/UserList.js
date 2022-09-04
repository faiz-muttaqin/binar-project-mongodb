import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:7000/api/users");
    setUser(response.data);
    console.log(users);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/users/${id}`).then(() => {
        getUsers();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"
      />

      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Player Dashboard Management
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

            <form className="d-flex" method="post" action="/" noValidate>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                name="search"
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="col-6">
            <h1>Users</h1>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <a
              href="/register"
              type="button"
              className="btn btn-primary align-self-center"
            >
              + add user
            </a>
          </div>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">token</th>
              <th scope="col" className="text-end">
                Action
              </th>
            </tr>
          </thead>
          {}
          <tbody id="userTable">
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.user}</td>
                <td>{user.email}</td>
                <td>{user.pass}</td>
                <td>{user.token}</td>
                <td className="text-end">
                  <a
                    href={"/userprofile/" + user._id}
                    type="button"
                    className="btn btn-light btn-small"
                  >
                    <i className="bi bi-eye"> </i>
                    View
                  </a>
                  <a
                    href={"edit/" + user._id}
                    type="button"
                    className="btn btn-light btn-small"
                  >
                    <i className="bi bi-pencil"> </i>
                    Edit
                  </a>
                  <a
                    type="button"
                    onClick={() => {
                      deleteUser(user._id);
                    }}
                    className="btn btn-light btn-small"
                  >
                    <i className="bi bi-person-x"> </i>
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
