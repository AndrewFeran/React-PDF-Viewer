// server.js
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const app = express();
const fs = require('fs');
// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());
// file upload api
app.post('/upload', (req, res) => {

    let obj = {
        file: req.files.file.name,
        name: req.body.name,
        weight: req.body.weight,
    };

    let entries = JSON.parse(fs.readFileSync('./entries.json', 'utf-8'));

    for (i in entries) {
        if (entries[i].file === obj.file) { // repeats
            console.log('repeat');
            return res.send({ error: 'repeat' });
        }
    }

    entries.push(obj);

    fs.writeFileSync('./entries.json', JSON.stringify(entries, null, 2));

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    // accessing the file
    const myFile = req.files.file;
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
})

app.post('/ls', (req, res) => {
    const filenamez = fs.readdirSync('./public');
    return res.send({ filenames: filenamez});
})

app.post('/entries', (req, res) => {
    let entries = JSON.parse(fs.readFileSync('./entries.json', 'utf-8'));
    return res.send({ entries: entries });
})

app.listen(4500, () => {
    console.log('server is running at port 4500');
})