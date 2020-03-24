const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

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

router.post('/users/logout', auth, async(req, res) => {
  try{
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch(e) {
    res.status(500).send()
  }
})

// --- POST ---
router.post('/users/logoutAll', auth, async(req, res) => {
  try{
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch(e) {
    res.status(500).send()
  }
})

// --- GET ---

router.get("/users/me", auth, async (req, res) => {
 
  res.send(req.user)

});

// --- GET ---

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

// --- PATCH ---
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];

  const isValidOperations = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperations) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    const user = await User.findById(req.params.id);

    updates.forEach(update => {
      user[update] = req.body[update];
    });

    await user.save();

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// --- DELETE --- 

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
