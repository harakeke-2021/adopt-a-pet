const path = require('path')
const express = require('express')

const utils = require('./utils')

const router = express.Router()

module.exports = router

const filePath = path.join(__dirname, 'pets.json')

router.get('/', (req, res) => {
  utils.getViewData(filePath, (err, viewData) => {
    if(err) { 
      res.status(500).send(err.message)
    } else {
      res.render('home', viewData)
    }
  })
})

router.get('/pets/:id', (req, res) => {
  const petId = Number(req.params.id)

  utils.getViewData(filePath, (err, viewData) => {
    if(err) { 
      res.status(500).send(err.message)
    } else {
      const petData = viewData.pets.find(pet => pet.id === petId)
      console.log(petData)
      res.render('pet', petData)
    }
  })
})
