"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const FavLocation = require("../models/fav");
const favLocationNewSchema = require("../schemas/favNew.json");


const router = express.Router();

/** POST / { favLocation } => { favLocation }
 *
 * Adds a new favorite location.
 *
 * This returns the newly created favorite location:
 *  { favLocation: { id, user_id, location } }
 *
 * Authorization required: logged-in user
 **/

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    
    const validator = jsonschema.validate(req.body, favLocationNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    // Extract user_id from the authenticated user's information
    // This assumes you have access to the user's session or token payload
    // You might need to adjust this based on how authentication is implemented in your app
    const user_id = res.locals.user.id; // Example; adjust based on actual implementation
    console.log("Authenticated user:", user_id);
    console.log("req.body:", req.body);

    const favLocation = await FavLocation.create({ user_id:req.body.user_id, location:req.body.location
    });
      
      
   console.log("favlocation", favLocation)
    return res.status(201).json({ favLocation });
  } catch (err) {
    return next(err);
  }
});

/** GET / => { favLocations: [ {id, user_id, location}, ... ] }
 *
 * Returns list of all favorite locations.
 *
 * Authorization required: logged-in user
 **/

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const filters = {};
    if (req.query.user_id) filters.user_id = req.query.user_id;

    const result = await FavLocation.findAll(filters);
    const favLocations = result.rows; 
    return res.json({ favLocations });
  } catch (err) {
    return next(err);
  }
});


/** GET /[id] => { favLocation }
 *
 * Returns { id, user_id, location }
 *
 * Authorization required: logged-in user
 **/

router.get("/:user_id", ensureLoggedIn, async function (req, res, next) {
  try {
    const favLocation = await FavLocation.findAll(req.params.user_id);
    return res.json({ favLocation });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[id] { favLocation } => { favLocation }
 *
 * Data can include:
 *   { location }
 *
 * Returns { id, user_id, location }
 *
 * Authorization required: logged-in user
 **/

router.patch("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, favLocationUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const favLocation = await FavLocation.update(req.params.id, req.body);
    return res.json({ favLocation });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id] => { deleted: id }
 *
 * Authorization required: logged-in user
 **/

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    await FavLocation.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
