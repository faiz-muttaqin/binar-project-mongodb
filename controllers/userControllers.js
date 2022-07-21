const mysql = require("mysql");

//Connection Pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.index = function (req, res) {
  res.render("index");
};

exports.games = function (req, res) {
  res.render("games");
};

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.signupPage = (req, res) => {
  res.render("signup");
};

exports.registerPage = (req, res) => {
  res.render("register");
};

exports.admin = (req, res) => {
  // Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as ID " + connection.threadId);

    //User Connection
    connection.query(
      `SELECT * FROM user_id WHERE status = "active" `,
      (err, rows) => {
        //When Done with the connection, release it
        connection.release();

        if (!err) {
          // let removedUser = req.query.removed;
          res.render("admin", { resultData: rows }); // rows, removedUser
        } else {
          console.log(err);
        }
        console.log("The data from user table: \n", rows);
      }
    );
  });
};

exports.loginAuth = (req, res) => {
  let requestData = req.body;
  let User = requestData.username;
  let Pass = requestData.password;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as ID " + connection.threadId);

    //User Connection
    connection.query(
      `SELECT * FROM user_id WHERE user = ? AND pass = ?`,
      [User, Pass],
      (err, rows) => {
        //When Done with the connection, release it
        connection.release();

        if (!err) {
          res.send({
            message: "sucessfull to login",
            resultData: rows,
            statusCode: 200,
            fase: true,
          });
        } else {
          console.log(err);
          res.send({
            message: "failed to login, wrong username/password",
            fase: false,
          });
        }
        console.log("The data from user table: \n", rows);
      }
    );
  });
};

exports.signupSend = (req, res) => {
  if (req.body != null) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected as ID " + connection.threadId);

      //User Connection
      connection.query(
        `INSERT INTO user_id SET user =?, email = ?, pass = ?,token = ?`,
        [req.body.user, req.body.email, req.body.pass, req.body.token],
        (err, rows) => {
          //When Done with the connection, release it
          connection.release();

          if (!err) {
            res.send({
              message: "sucessfull to login",
              resultData: rows,
              statusCode: 200,
              fase: true,
            });
          } else {
            console.log(err);
            res.send({
              message: "failed to login, wrong username/password",
              fase: false,
            });
          }
          console.log("The data from user table: \n", rows);
        }
      );
    });

    res.send({
      message: "successfull to Register",
      statusCode: 200,
      dataCreated: req.body,
    });
  } else {
    res.status(400);
  }
};

exports.delete = (req, res) => {
  // Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as ID " + connection.threadId);

    //User Connection
    connection.query(
      `UPDATE user_id SET status = ? WHERE id = ? `,
      ["removed", req.params.id],
      (err, rows) => {
        //When Done with the connection, release it
        connection.release();

        if (!err) {
          let removedUser = encodeURIComponent("User successeflly removed.");
          res.redirect("/admin/?removed=" + removedUser);
        } else {
          console.log(err);
        }
        console.log("The data from user table: \n", rows);
      }
    );
  });
};

exports.register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    username,
    password,
    birth,
    phone,
    address,
    radiogroup1,
    radiogroup2,
  } = req.body;
  let genderData;
  if (radiogroup1 == "on") {
    genderData = "male";
  } else {
    genderData = "female";
  }

  var date = new Date(birth); // some mock date
  var milliseconds = date.getTime();

  if (req.body != null) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected as ID " + connection.threadId);

      //User Connection
      connection.query(
        `INSERT INTO user_id SET user =?, email = ?, pass = ?,token = ?`,
        [username, email, password, maketoken(16)],
        (err, rowsUserID) => {
          //When Done with the connection, release it
          connection.release();
          if (!err) {
            connection.query(
              `SELECT * FROM user_id WHERE email = ? AND pass = ? AND user = ?`,
              [email, password, username],
              (err, rowsCheck) => {
                if (!err) {
                  connection.query(
                    `INSERT INTO user_profile SET user_id =?, first_name = ?, last_name = ?, phone = ?, birth = ?, gender = ?, address = ?`,
                    [
                      rowsCheck[0].id,
                      first_name,
                      last_name,
                      phone,
                      milliseconds,
                      genderData,
                      address,
                    ],
                    (err, rows) => {
                      if (!err) {
                        res.render("register", {
                          alert: "User added successfully.",
                        });
                        connection.query(
                          `INSERT INTO user_history SET user_id =?, user = ?, win = ?, draw = ?, lose = ?, type_player = ?`,
                          [rowsCheck[0].id, username, 0, 0, 0, "user"],
                          (err, rows) => {
                            if (!err) {
                              res.render("register", {
                                alert: "User added successfully.",
                              });
                            } else {
                              console.log(err);
                              res.render("register", {
                                alert3: "User failed to register.",
                              });
                            }
                          }
                        );
                      } else {
                        console.log(err);
                        res.render("register", {
                          alert3: "User failed to register.",
                        });
                      }
                      console.log("The data from user table: \n", rows);
                    }
                  );
                } else {
                  console.log(err);
                  res.render("index", {
                    alert2: "User failed to register.",
                  });
                }
                console.log("The data from user table: \n", rowsCheck[0].id);
              }
            );
          } else {
            console.log(err);
            res.render("register", {
              alert1: "User failed to register.",
            });
          }
          console.log("The data from user table: \n", rowsUserID);
        }
      );
    });
  } else {
    res.status(400);
  }

  function maketoken(length) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
};

//________________________________________________________________________________________________

//Edit user profile
exports.edit = (req, res) => {
  // Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as ID " + connection.threadId);

    //User Connection
    connection.query(
      `SELECT * FROM user_id WHERE id = ? `,
      [req.params.id],
      (err, rowsID) => {
        //When Done with the connection, release it
        connection.release();
        if (!err) {
          connection.query(
            `SELECT * FROM user_profile WHERE user_id = ? `,
            [req.params.id],
            (err, rowsProfile) => {
              let date = new Date(rowsProfile[0].birth);
              let tgl = `${date.getFullYear()}-${(
                "0" +
                (date.getMonth() + 1)
              ).slice(-2)}-${("0" + (date.getDate() + 1)).slice(-2)}`;
              // let male;
              // let female;
              // if (rowsProfile[0].gender === "male") {
              //   male = true;
              //   female = false;
              // } else {
              //   male = false;
              //   female = true;
              // }
              let identifier = rowsID[0].id;
              if (!err) {
                res.render("edit-user", {
                  rowsID,
                  rowsProfile,
                  tgl,
                  identifier,
                });
              } else {
                console.log(err);
              }
              console.log("The data from user table: \n", rowsProfile);
            }
          );
        } else {
          console.log(err);
        }
        console.log("The data from user table: \n", rowsID);
      }
    );
  });
};

//Update user profile
exports.update = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    username,
    password,
    birth,
    phone,
    address,
    radiogroup1,
    radiogroup2,
  } = req.body;

  var date = new Date(birth); // some mock date
  var milliseconds = date.getTime();

  if (req.body != null) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected as ID " + connection.threadId);

      //User Connection
      connection.query(
        `UPDATE user_id SET user =?, email = ?, pass = ? WHERE id = ?`,
        [username, email, password, req.params.id],
        (err, rowsUserID) => {
          //When Done with the connection, release it
          connection.release();
          if (!err) {
            connection.query(
              `UPDATE user_profile SET first_name = ?, last_name = ?, phone = ?, birth = ?, address = ? WHERE user_id = ?`,
              [
                first_name,
                last_name,
                phone,
                milliseconds,
                address,
                req.params.id,
              ],
              (err, rows) => {
                if (!err) {
                  res.render("edit-user", {
                    alert: "User added successfully.",
                  });
                } else {
                  console.log(err);
                  res.render("edit-user", {
                    alert3: "User failed to update.",
                  });
                }
                console.log("The data from user table: \n", rows);
              }
            );
          } else {
            console.log(err);
            res.render("edit-user", {
              alert1: "User failed to update.",
            });
          }
          console.log("The data from user table: \n", rowsUserID);
        }
      );
    });
  } else {
    res.status(400);
  }
};

exports.viewall = (req, res) => {
  // Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as ID " + connection.threadId);

    //User Connection
    connection.query(
      `SELECT * FROM user WHERE id = ? `,
      [req.params.id],
      (err, rows) => {
        //When Done with the connection, release it
        connection.release();

        if (!err) {
          res.render("view-user", { rows });
        } else {
          console.log(err);
        }
        console.log("The data from user table: \n", rows);
      }
    );
  });
};
