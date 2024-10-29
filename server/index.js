// const express = require('express');

// const app = express();

// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`)
// });


const express = require('express');
const sequelize = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());
app.use('/tasks', taskRoutes);
//const port = 3000;

//sequelize.sync().then(() => app.listen(3001, () => console.log(`Server is running on port ${port}`)));

sequelize.sync()
   .then(() => {
       app.listen(5000, () => console.log('Server running on http://localhost:5000'));
   })
   .catch(error => console.error('Database connection failed:', error));
   