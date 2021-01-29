const express = require('express');
const app = express();
const userRouter = require('./router/user');
const sequelize = require('./models/index').sequelize;

app.use('/', userRouter);

/**
 * sync( ) -> 기존 테이블이 있을경우 아무 작업도 안함 (없을때만 새로 생성)
 * sync({force: true}) -> 기존 테이블이 있으면 지우고 다시생성, 없으면 생성
 * sync({alter: true}) -> model객체와 디비의 sync를 맞춤. 만약, 변경이 안됬다면 안바꾸고, 컬럼 추가/삭제가 됬다고 하면 alter 문으로 해당 컬럼만 추가/삭제
 */
sequelize.sync();

app.listen(3000, function(req, res) {
  console.log('server on !');
})