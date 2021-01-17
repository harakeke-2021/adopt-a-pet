const path = require('path')
const express = require('express')

const utils = require('./utils')

const router = express.Router()

module.exports = router

router.use(express.urlencoded({
  extended: false
}))

router.get('/pets', (req, res) => {
  utils.getViewData((err, viewData) => {
    if(err) { 
      res.status(500).send(err.message)
    } else {
      res.render('pets', viewData)
    }
  })
})

router.get('/pets/:id', (req, res) => {
  const petId = Number(req.params.id)

  utils.getViewData((err, viewData) => {
    if(err) { 
      res.status(500).send(err.message)
    } else {
      const petData = viewData.pets.find(pet => pet.id === petId)
      res.render('pet', petData)
    }
  })
})

router.get('/new', (req, res) => {
  res.render('new')
})


router.post('/new', (req, res) => {
    const newObjPetData = req.body
    utils.writeNewData(newObjPetData, (err) => {
      if(err) return res.status(500).send(err.message)
      res.redirect('/')
    })
})

router.get('/', (req, res) => {
  res.render('landing')
})