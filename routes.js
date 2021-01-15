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

router.get('/new', (req, res) => {
  res.render('new')
})


router.post('/new', (req, res) => {
  utils.getViewData(filePath, (err, viewData) => {
    if (err) {
      res.status(500).send(err.message) 
    } else {
      const newObjPetData = req.body
      const newPetID = viewData.pets.length + 1
      newObjPetData.id = newPetID
      viewData.pets.push(newObjPetData)

      const newPetDataStr = JSON.stringify(viewData, null, 2)

      utils.writeNewData(filePath, newPetDataStr, (err, data) => {
        if(err) return res.status(500).send(err.message)

        res.redirect(`/pets/${newObjPetData.id}`)
      })
    }
  })
})