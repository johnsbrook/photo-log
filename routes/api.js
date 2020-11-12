const express = require("express");
const mongoose = require("mongoose");
const mongojs = require("mongojs");
const logger = require("morgan");

const logs = require("../models/logs.js");
const profilepic = require("../models/profilepic.js");
const statusUpdate = require("../models/statusupdate.js");
const app = express();

// These are the routes for photo logs
app.post("/log", ({ body }, res) => {
  logs
    .create(body)
    .then((db) => {
      console.log(db);
    })
    .then((db) => {
      res.redirect("/thankyou");
    })
    .then((db) => {
      res.redirect("/profile");
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/log", (req, res) => {
  logs
    .find({})
    .then((cb) => {
      res.json(cb);
    })
    .catch((err) => {
      res.json(err);
    });
});


// These are the routes to find/delete logs by ID
app.get("/findLog/:id", (req, res) => {
  logs.findOne(
    { _id: mongojs.ObjectId(req.params.id) },
    (err, data) => {
      if (err) {
        res.send(error)
      } else {
        res.send(data)
      }
    }
  );
});

app.delete("/deleteLog/:id", (req, res) => {
  logs
    .remove({ _id: mongojs.ObjectId(req.params.id) }, (err, data) => {
      if (err) {
        res.send(error)
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

// Will get all logs by unrepeated locations
app.get("/getLocations", (req, res) => {
  logs
    .distinct("location")
    .then((db) => {
      res.json(db);
    })
    .catch((err) => {
      res.json(err)
    })
})


// These are the routes for profile picture updates
app.post("/profilepic", ({ body }, res) => {
  profilepic
    .create(body)
    .then((db) => {
      console.log(db)
    })
    .then((db) => {
      res.redirect("/profile");
    })
    .catch((err) => {
      res.json(err)
    });
});

app.get("/profilepic", (req, res) => {
  profilepic
    .find({})
    .then((cb) => {
      res.json(cb)
    })
    .catch((err) => {
      res.json(err)
    });
});

// These are the route for status updates
app.post("/status", ({ body }, res) => {
  statusUpdate
    .create(body)
    .then((db) => {
      console.log(db);
    })
    .then((db) => {
      res.redirect("/profile");
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/status", (req, res) => {
  statusUpdate
    .find({})
    .sort({ timestamp: 1 })
    .then((cb) => {
      res.json(cb)
    })
    .catch((err) => {
      res.json(err)
    });
});

// These are the routes to find status by ID
app.get("/findStatus/:id", (req, res) => {
  statusUpdate.findOne(
    { _id: mongojs.ObjectId(req.params.id) },
    (err, data) => {
      if (err) {
        res.send(error)
      } else {
        res.send(data)
      }
    }
  );
});

app.delete("/deleteStatus/:id", (req, res) => {
  statusUpdate
    .remove({ _id: mongojs.ObjectId(req.params.id) }, (err, data) => {
      if (err) {
        res.send(error)
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.json(err)
    });
});



module.exports = app;
