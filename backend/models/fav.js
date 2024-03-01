"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for favorite locations. */

class FavLocation {
  /** Create a favorite location (from data), update db, return new location data.
   *
   * data should be { user_id, location }
   *
   * Returns { id, user_id, location }
   **/

  static async create({ user_id, location }) {
    const result = await db.query(
          `INSERT INTO favLocations (user_id, location)
           VALUES ($1, $2)
           RETURNING id, user_id, location`,
        [user_id, location]);
    const favLocation = result.rows[0];

    return favLocation;
  }

  /** Find all favorite locations (optional filter on user_id).
   *
   * Returns [{ id, user_id, location }, ...]
   * */
  static async findAll(userId) {
    const query = `SELECT id, user_id, location FROM favLocations WHERE user_id = $1`;
    const queryValues = [userId];
  
    const result = await db.query(query, queryValues);
    return result.rows;
}

  

  /** Given a location id, return data about the location.
   *
   * Returns { id, user_id, location }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const favLocationRes = await db.query(
          `SELECT id, user_id, location
           FROM favLocations
           WHERE user_id = $1`, [id]);

    const favLocation = favLocationRes.rows[0];

    if (!favLocation) throw new NotFoundError(`No favorite location: ${id}`);

    return favLocation;
  }

  /** Update favorite location data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: { user_id, location }
   *
   * Returns { id, user_id, location }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE favLocations 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, user_id, location`;
    const result = await db.query(querySql, [...values, id]);
    const favLocation = result.rows[0];

    if (!favLocation) throw new NotFoundError(`No favorite location: ${id}`);

    return favLocation;
  }

  /** Delete given favorite location from database; returns undefined.
   *
   * Throws NotFoundError if not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM favLocations
           WHERE id = $1
           RETURNING id`, [id]);
    const favLocation = result.rows[0];

    if (!favLocation) throw new NotFoundError(`No favorite location: ${id}`);
  }
}

module.exports = FavLocation;
