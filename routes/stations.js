const router = require('express').Router();
const Station = require('../models/stationModel');
const User = require('../models/userModel');
const { verify } = require('./verifyToken');

// CREATE STATION
router.post('/create', verify, async (req, res) => {
  const { 
    image, 
    name,
    address,
    lat,
    long,
    description,
    plugType,
    network,
    open247,
    restricted,
    paymentRequired,
    active,
    homeCharger,
    hours,
    phoneNumber,
    price,
    parkingLevel,
    parkingAttributes,
    accessRestrictions,
    amenities,
    chargerCreator,
    checkIns,
    favorites,
    rating,
  } = req.body;
  if(req.user) {

    console.log('chargerCreator: ', chargerCreator);

    try {
      const foundUser = await User.findById(chargerCreator);

      const newStation = new Station({
        image: image,
        name: name,
        address: address,
        lat: lat,
        long: long,
        description: description,
        plugType: plugType,
        network: network,
        open247: open247,
        restricted: restricted,
        paymentRequired: paymentRequired,
        active: active,
        homeCharger: homeCharger,
        hours: hours,
        phoneNumber: phoneNumber,
        price: price,
        parkingLevel: parkingLevel,
        parkingAttributes: parkingAttributes,
        accessRestrictions: accessRestrictions,
        amenities: amenities,
        chargerCreator: foundUser._id,
        checkIns: checkIns,
        favorites: favorites,
        rating: rating
      })
      const savedStation = await newStation.save();

      foundUser.addedStations.push(savedStation.id);

      foundUser.populate('addedStations');
      
      await foundUser.save();
      return res.status(200).json({ message: 'Station created successfully', payload: { user: foundUser.toObject() }});
    }
    catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!");
  }
});

// UPDATE STATION
router.put('/update/:id', verify, async (req, res) => {
  if(req.user){
    try {
      await Station.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      const allStations = await Station.find();
      return res.status(200).json(allStations.reverse());
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!");
  }
});

// DELETE STATION
router.delete('/delete/:id', verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      const deletedStation = await Station.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Station deleted successfully', payload: deletedStation });
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

// GET STATION BY ID
router.get('/find/:id', async (req, res) => {
  try {
    const station = await Station.findById(req.params.id)
    return res.status(200).json({ message: 'Station Info', payload: station });
  } catch (error) {
    return res.status(500).json(error)
  }
});

// GET ALL STATIONS
router.get('/', async (req, res) => {
  try {
    const stations = await Station.find();
    return res.status(200).json(stations.reverse());
  } catch (error) {
    return res.status(500).json(error)
  }
});

module.exports = router;