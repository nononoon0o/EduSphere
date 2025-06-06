// 필요한 모듈 가져오기
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require("express-session")
const MongoStore = require("connect-mongo");

// 환경 변수 설정
dotenv.config();

// 로그인 페이지
const loginRoutes = require("./routes/signup/loginRoutes");
const emailRoutes = require("./routes/signup/emailRoutes");
const codeRoutes = require("./routes/signup/codeRoutes");
const idRoutes = require("./routes/signup/idRoutes");
const pwRoutes = require("./routes/signup/pwRoutes");
const detailRoutes = require("./routes/signup/detailRoutes");

const userRoutes = require("./routes/user/userRoutes");
const verifyPWRoutes = require("./routes/user/verifyPWRoutes")
const editAccountRoutes = require("./routes/user/editAccountRoutes");

const attendanceRoutes = require("./routes/participation/attendanceRoutes");
const assignmentRoutes = require("./routes/participation/assignmentRoutes");
const studentRoutes = require('./routes/participation/studentRoutes');

const deadlineRoutes = require('./routes/deadlineRoutes');

// Express 애플리케이션 생성
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
      origin: [// 클라이언트의 주소 (예: React 앱이 실행 중인 주소)
        "http://localhost:8081",
        "http://localhost:8082",
        "http://localhost:8083",
        "http://localhost:8084",
        "http://localhost:8085",
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true, // 세션 쿠키를 허용
      exposedHeaders: ['Content-Disposition'],
    })
  );
  
// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB 연결...'))
    .catch((err) => console.error('MongoDB 연결 오류:', err));

app.use(express.json()); // JSON 요청 본문 파싱

// 세션 설정 (MongoDB 세션 스토어 사용)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "yourSecretKey", // 환경 변수로 secret 관리
    resave: false,
    saveUninitialized: false, // 초기화된 세션만 저장
    cookie: { maxAge: 30 * 60 * 1000 }, // 30분 동안 세션 유지
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // MongoDB URL
      collectionName: "sessions", // 세션 저장 컬렉션 이름
    }),
  })
);

// 로그인 페이지
app.use("/api/auth", loginRoutes);
app.use("/api/signup", emailRoutes);
app.use("/api/signup", codeRoutes);
app.use("/api/signup", idRoutes);
app.use("/api/signup", pwRoutes);
app.use("/api/signup", detailRoutes);

// 유저 정보 가져오기
app.use("/user", userRoutes);
app.use("/user", verifyPWRoutes);
app.use("/user", editAccountRoutes);

// 학생 관리 시스템
app.use('/api/attendance', attendanceRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/deadlines', deadlineRoutes);

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});