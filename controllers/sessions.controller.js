const { pool } = require("../services/pg_pool");

exports.createSession = async (
  user_id,
  token,
  expires_at,
  ip_address,
  user_agent
) => {
  try {
    await pool.query(
      `INSERT INTO sessions (user_id, token, expires_at, ip_address, user_agent)
         VALUES ($1, $2, $3, $4, $5)`,
      [user_id, token, expires_at, ip_address, user_agent]
    );
    console.log("Session created successfully!");
  } catch (error) {
    console.error("Error creating session:", error);
    throw new Error("Internal server error while creating session.");
  }
};

exports.getSessions = async (req, res) => {
  const user_id = req.user.userId;

  if (isNaN(user_id) || parseInt(user_id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID provided.",
      result: {},
      error: 1,
    });
  }

  try {
    const result = await pool.query(
      `SELECT session_id, user_id, expires_at, last_accessed, ip_address, user_agent, is_active, created_at, updated_at FROM sessions WHERE user_id = $1`,
      [user_id]
    );

    // Check if sessions exist for the user
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No sessions found for this user.",
        result: [],
        error: 2,
      });
    }

    res.status(200).json({
      success: true,
      message: "Sessions retrieved successfully!",
      result: result.rows,
      error: 0,
    });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      result: {},
      error: 1,
    });
  }
};

exports.terminateAllSessions = async (req, res) => {
  const user_id = req.user.userId;

  if (isNaN(user_id) || parseInt(user_id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID provided.",
      result: {},
      error: 1,
    });
  }

  try {
    const result = await pool.query(
      `DELETE FROM sessions WHERE user_id = $1 RETURNING *`,
      [user_id]
    );

    res.status(200).json({
      success: true,
      message: "All sessions terminated successfully!",
      result: result.rows,
      error: 0,
    });
  } catch (error) {
    console.error("Error terminating sessions:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      result: {},
      error: 1,
    });
  }
};

exports.terminateSessionById = async (req, res) => {
  const session_id = req.params.Id;

  // Simple validation: ensure session_id is a number
  if (isNaN(session_id) || parseInt(session_id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid session ID provided.",
      result: {},
      error: 1,
    });
  }

  try {
    const result = await pool.query(
      `DELETE FROM sessions WHERE session_id = $1 RETURNING *`,
      [session_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Session not found.",
        result: {},
        error: 2,
      });
    }

    res.status(200).json({
      success: true,
      message: "Session terminated successfully!",
      result: result.rows[0],
      error: 0,
    });
  } catch (error) {
    console.error("Error terminating session:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      result: {},
      error: 1,
    });
  }
};
