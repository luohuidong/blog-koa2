const { exec, escape } = require('../db/mysql')

const login = async (username, password) => {
  username = escape(username)
  password = escape(password)

  const sql = `
    SELECT 
      username, realname FROM users 
    WHERE 
      username=${username} AND password=${password}
  `
  const rows = await exec(sql)

  if (rows.length > 0) {
    return rows[0]
  } else {
    return false
  }
}

module.exports = {
  login
}
