ALTER TABLE tasks
ADD COLUMN recurrence_interval INT,
ADD COLUMN recurrence_type VARCHAR(20),
ADD COLUMN start_date DATE,
ADD COLUMN end_date DATE;
