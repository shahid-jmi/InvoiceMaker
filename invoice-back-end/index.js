const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require("./models/database")

const routes = require('./routes/r-index')
sequelize.sync().then(() => {
    console.log('db is ready')
})

app.use(cors());

app.use(express.json());

app.use('/api', routes)

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
