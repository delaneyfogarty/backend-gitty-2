const pool = require('../utils/pool');

module.exports = class Post {
  id;
  username;
  text;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.text = row.text;
  }

  static async getPosts() {
    const { rows } = await pool.query('SELECT id, username, text FROM posts;');

    return rows.map((row) => new Post(row));
  }

  static async createPost({ id, username, text }) {
    const { rows } = await pool.query(
      `INSERT INTO posts (id, username, text)
		VALUES ($1, $2, $3)
		RETURNING *
	`,
      [id, username, text]
    );
    return new Post(rows[0]);
  }
};
