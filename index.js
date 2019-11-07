const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const queryString = async (query, params = {}) => {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "system",
      password: "oracle",
      connectString: "localhost/XE"
    });
    console.log("connection is opened.");
    const response = await connection.execute(query, params);
    console.log(response.rows);
  } catch (err) {
    console.log(err);
  } finally {
    if (connection) {
      connection.close();
      console.log("connection is closed.");
    }
  }
};

queryString("SELECT * FROM HR.EMPLOYEES WHERE EMPLOYEE_ID = :id", { id: 105 });
