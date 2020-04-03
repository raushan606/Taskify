const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const multer = require("multer");

// ------------------------- !!! --- USERS --- !!! --------------------------

// --- POST ---

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// --- POST ---

router.post("/users/signup", async (req, res) => {
  try {
  } catch (e) {}
});

// --- POST ---

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// --- POST ---

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// --- POST ---
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// --- GET ---

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// --- PATCH ---
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];

  const isValidOperations = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperations) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    updates.forEach(update => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// --- DELETE ---

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();

    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

// --- Upload Profile Picture ---

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      return cb(new Error('Please upload a Image File'))
    } 
    cb(undefined, true)

    
  }
});

// -- POST --
router.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {
  req.user.avatar = req.file.buffer
  await req.user.save()
  res.send();
}, (error, req, res,next ) => {
  res.status(400).send({error: error.message})
});

// ----- DELETE AVATAR ---

// -- DELETE --
router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})


module.exports = router;
