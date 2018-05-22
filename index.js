const express    = require('express');
const bodyParser = require('body-parser');
const multer     = require('multer');
const path       = require('path');
const fs         = require('fs');

const mongoose   = require('mongoose');
const fileModel  = require('./models/file').model;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://database:27017/imageboard');

const multerConfig = {
    storage: multer.diskStorage({
        destination: function(req, file, next){
            next(null, './public/upload');
        },
        filename: function(req, file, next){
            const ext = file.mimetype.split('/')[1];
            next(null, Date.now() + '.' + ext);
        }
    }),

    fileFilter: function(req, file, next){
        if (!file) next();

        if (file.mimetype.startsWith('image/')) {
            next(null, true);
        } else {
            console.log("file not supported");
            return next();
        }
    }
};


/**
 * routes
 */
app.get('/', (req, res) => {
    res.render('index.ejs',  { title: 'Imageboard' });
});

app.post('/load', (req, res) => {
    fileModel.find({}, (err, posts) => {
        res.json(posts);
    });
});

app.post('/add', multer(multerConfig).any(), (req, res) => {
    let addFiles = req.files.map(el => {
       return {
           name: '',
           src: '/upload/' + el.filename
       }
    });

    fileModel.insertMany(addFiles, function (err, posts) {
        res.json(posts);
    });
});

app.delete('/delete/:id', (req, res) => {
    fileModel.findOneAndDelete({ _id: req.params.id }, (error, file) => {
        fs.unlinkSync(path.join(__dirname, 'public', file.src));
        res.json({});
    });
});

app.post('/edit/:id', (req, res) => {
    fileModel.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, (error, file) => {
        res.json({});
    });
});

app.listen(3000, () => {
   console.log('Listen to me!');
});
