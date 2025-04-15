const User = require("../models/User");

async function getUsers() {
  return await User.find(); // 모든 사용자 정보 가져오기
}

module.exports = { getUsers };
