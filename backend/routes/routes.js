const express = require("express");
const router = express.Router();
const appointments = require("../models/appointment");
const verifyToken = require("../middleware/authMiddleware")


router.get("/Appointments",verifyToken, async (req, res) => {
  try{
     const user=req.cookies.User
     console.log('appointments',user)
      const details = await appointments.find({'patientname':user});
      // const data=await details
// console.log('appointments',data);
  res.json(details);
  }catch(error){
    res.status(400).json();
  }

});

// router.get("/Appointments/:id", async (req, res) => {
//   const courseId = req.params.id;
//   const details = await Appointments.findOne({ courseId: courseId }, { _id: 0 });
//   res.json(details);
// });

router.post("/addAppointments",verifyToken, async (req, res) => {
  try {
    const data = req.body;
    console.log(data)
    const result = await appointments.create(data);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
});


router.get("/searchResult/:doctorname", async (req, res) => {
  try {
    const d_name = req.params.doctorname;
    console.log(d_name)
     const result = await appointments.find({'doctorname': d_name});
     console.log(result)
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
});

module.exports = router;
