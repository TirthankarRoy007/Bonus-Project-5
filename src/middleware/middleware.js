const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const authentication = function (req, res, next) {
    try {
        let token = req.headers['x-auth-key']
        if (!token) return res.status(400).send({ status: false, msg: "Token is Required" })
        jwt.verify(token, "mySecretKey", function (err, decode) {
            if (err) { return res.status(401).send({ status: false, data: "Authentication Failed" }) };
            req.decode = decode;
            next()
        })
    }
    catch (error) {
        res.status(500).send({ status: false, errorType: error.name, errorMsg: error.message })
    }
}

const admin = function (req, res, next) {
    try {
        let token = req.headers['x-auth-key']
        if (!token) return res.status(400).send({ status: false, msg: "Token is Required" })
        if (req.decode.role !== 'Admin') return res.status(401).send({ status: false, data: "Super Admin or Employee can not perform this task" })
        next()
    }
    catch (error) {
        res.status(500).send({ status: false, errorType: error.name, errorMsg: error.message })
    }
}

const superAdmin = function (req, res, next) {
    try {
        let token = req.headers['x-auth-key']
        if (!token) return res.status(400).send({ status: false, msg: "Token is Required" })
        if (req.decode.role !== 'Super Admin') return res.status(401).send({ status: false, data: "Admin or Employee can not perform this task" })
        next()
    }
    catch (error) {
        res.status(500).send({ status: false, errorType: error.name, errorMsg: error.message })
    }
}

const employee = function (req, res, next) {
    try {
        let token = req.headers['x-auth-key']
        if (!token) return res.status(400).send({ status: false, msg: "Token is Required" })
        if (req.decode.role !== 'Employee') return res.status(401).send({ status: false, data: "Super Admin or Admin can not perform this task" })
        next()
    }
    catch (error) {
        res.status(500).send({ status: false, errorType: error.name, errorMsg: error.message })
    }
}

module.exports = { authentication, admin, superAdmin, employee }