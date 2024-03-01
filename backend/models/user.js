"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** Authenticate user with username, password.
   *
   * Returns { id, username }
   *
   * Throws UnauthorizedError if user not found or wrong password.
   **/

  static async authenticate(username, password) {
    const result = await db.query(
          `SELECT id, username, password
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { id, username }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({ username, password }) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
          `INSERT INTO users (username, password)
           VALUES ($1, $2)
           RETURNING id, username`,
        [username, hashedPassword],
    );

    const user = result.rows[0];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ id, username }, ...]
   **/

  static async findAll() {
    const result = await db.query(
          `SELECT id, username
           FROM users
           ORDER BY username`,
    );

    return result.rows;
  }

  /** Given a user id, return data about user and their favorite locations.
   *
   * Returns { id, username, favLocations: [{id, location}, ...] }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(id) {
    const userRes = await db.query(
          `SELECT id, username
           FROM users
           WHERE id = $1`,
        [id],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${id}`);

    const favLocationsRes = await db.query(
          `SELECT id, location
           FROM favLocations
           WHERE user_id = $1`, [id]);

    user.favLocations = favLocationsRes.rows;
    return user;
  }

  /** Given a username, return data about the user.
 *
 * Returns { id, username }
 *
 * Throws NotFoundError if user not found.
 **/
static async getByUsername(username) {
  const result = await db.query(
      `SELECT id, username
       FROM users
       WHERE username = $1`,
      [username],
  );

  const user = result.rows[0];

  if (!user) throw new NotFoundError(`No user: ${username}`);

  return user; // Only user data is returned, without favorite locations
}


  // Additional methods like update and delete can be implemented here.
}

module.exports = User;
