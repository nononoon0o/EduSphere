// 필요한 모듈 가져오기
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 환경 변수 설정
dotenv.config();

// Express 애플리케이션 생성
const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors()); // CORS 문제 해결
app.use(express.json()); // JSON 요청 본문 파싱

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
