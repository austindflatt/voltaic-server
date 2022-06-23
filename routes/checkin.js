const router = require('express').Router();
const CheckIn = require('../models/checkinModel');
const User = require('../models/userModel');
const { verify } = require('./verifyToken');

// CREATE CHECK IN
router.post('/create', verify, async (req, res) => {
  const { 
    chargerUser,
    chargeStation,
    chargeStatus,
    review,
    photo
  } = req.body;
  if(req.user) {

    console.log('chargerUser: ', chargerUser);

    try {
      const foundUser = await User.findById(chargerUser);

      const newCheckIn = new CheckIn({
        chargerUser: foundUser._id,
        chargeStation: chargeStation,
        chargeStatus: chargeStatus,
        review: review,
        photo: photo,
      })
      const savedCheckin = await newCheckIn.save();

      foundUser.checkIns.push(savedCheckin.id);

      foundUser.populate('checkIns');
      
      await foundUser.save();
      return res.status(200).json({ message: 'Check In created successfully', payload: { user: foundUser.toObject() }});
    }
    catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!");
  }
});

// UPDATE CHECK IN
router.put('/update/:id', verify, async (req, res) => {
  if(req.user){
    try {
      await CheckIn.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      const allCheckins = await CheckIn.find();
      return res.status(200).json(allCheckins.reverse());
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!");
  }
});

// DELETE CHECK IN
router.delete('/delete/:id', verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      const deletedCheckin = await CheckIn.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Station deleted successfully', payload: deletedCheckin });
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

// GET CHECK IN BY ID
router.get('/find/:id', async (req, res) => {
  try {
    const checkin = await CheckIn.findById(req.params.id)
    return res.status(200).json({ message: 'Check In Info', payload: checkin });
  } catch (error) {
    return res.status(500).json(error)
  }
});

// GET ALL CHECK INS
router.get('/', async (req, res) => {
  try {
    const checkins = await CheckIn.find();
    return res.status(200).json(checkins.reverse());
  } catch (error) {
    return res.status(500).json(error)
  }
});

module.exports = router;