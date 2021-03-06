const express = require('express');
const path = require ('path');
const logger = require('./middleware/logger');
const members = require('./Members');
const app = express();

//Inits middleware
/* app.use(logger); */

//Gets All Members
app.get('/api/members', (req, res)=> res.json(members));

//Get Single Member
app.get('/api/members/:id', (req, res)=> {
    const found = members.some(member => member.id ===parseInt(req.params.id));
    if (found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No Member with the id of ${req.params.id} found`});
    }
    
    
});
//Set Static Folder 
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on ${PORT}`));

