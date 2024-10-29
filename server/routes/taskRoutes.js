// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Delete a task by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

// Create a new task with recurrence options
router.post('/', async (req, res) => {
  const { title, description, due_date, is_recurring, recurrence_type, recurrence_interval, start_date, end_date } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, due_date, is_recurring, recurrence_type, recurrence_interval, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description, due_date, is_recurring, recurrence_type, recurrence_interval, start_date, end_date]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

module.exports = router;
