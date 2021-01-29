const express = require('express');
const router = express.Router();
const { user, sequelize } = require('../models');

router.get('/transaction', async function (req, res) {
    console.log('transaction test !');

    const t = await sequelize.transaction();

    try {
        await user.create({ name: "p", age: 20 }, { transaction: t });
        let userData = await user.findOne({ where: { name: "p" } }, { transaction: t });
        console.log(userData);

        await t.commit(); // 커밋이 실행되면 위에 transaction 걸려있는 쿼리들이 한번에 실행되는거 같음
        userData = await user.findOne({ where: { name: "p" } });
        console.log(userData);

        res.send(userData);
    } catch (error) {
        console.error(error);
        await t.rollback();
    }
});

router.get("/create", function (req, res) {
    console.log("create ! ");
    user.create({ name: "kimCoding", age: 30 });
    res.send("insert ok !");
});

router.get("/read", async function (req, res) {
    console.log("read !");

    // findAll, findByPk, findOne, findOrCreate, findAndCountAll
    const userData = await user.findOne({ where: { name: "kimCoding" } });
    if (userData === null) res.send('user not found!');
    else res.send(userData);
});

router.get("/update", function (req, res) {
    console.log("update !");
    user.update({ name: "kimTaejoon" }, { where: { name: "kimCoding" } });
    res.send("update ok !");
});

router.get("/delete", function (req, res) {
    console.log("delete !");
    user.destroy({ where: { age: 30 } });
    res.send("delete ok !");

    /* delete all data
    await user.destroy({
        truncate: true
    });
    */
});

module.exports = router;

