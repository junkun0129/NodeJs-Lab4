const router = require('express').Router()
const uuid = require("uuid")
const express = require('express')
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname,"..", 'public')))

const members = [
    { id: uuid.v4(), name: "Mario", email: "mario@mail.com" },
    { id: uuid.v4(), name: "Luigi", email: "luigi@mail.com" },
    { id: uuid.v4(), name: "Yoshi", email: "yoshi@mail.com" },
]

const number = [0,1,2,3,4]

//router.get('/', (req, res) => res.json(members))
router.get("/", (req, res, next)=>{
    res.render("list", {members:members});
})

router.get('/:id', (req, res) => {
    const paramsID = req.params.id
    
    const found = members.some(member => member.id === paramsID)
    
    if(found){
        const person = members.filter(member => member.id === paramsID)
        res.render("person", {person:person})
    }else{
        res.status(400).json({ msg: `Member with id: ${paramsID}, is not found `})
    }
})

router.post('/', (req,res) => {
    const newData = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    members.push(newData)
    res.redirect("/api/members")
    // res.json(members)
})

// router.post("/", (req, res, next)=>{
    
// })

module.exports = router