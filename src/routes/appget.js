const { Router } = require('express');
const router = Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const json_datos = fs.readFileSync('src/public/datos.json','utf-8');
let datos = JSON.parse(json_datos);

router.get('/',(req,res) => {
    res.render('index.pug',{
    	datos
    })
});

router.get('/new',(req,res) => {
    res.render('input.pug')
});

router.post('/new-entry',(req, res) => {
    const {titulo ,keywords ,imagen ,backgroud ,video1 ,video2 ,video3 ,video4 ,archivo12 ,archivo1 ,archivo2 ,archivo3 ,archivo4 ,archivo5 ,archivo6 ,archivo7 ,archivo8 ,archivo9 ,archivo10 ,archivo11 , descripcion } = req.body;
    
	let newDato = {
        id: uuidv4() ,titulo ,keywords ,imagen 
        ,backgroud
        ,video1 ,video2 ,video3 ,video4 ,
        archivo12 ,archivo1 ,archivo2 ,archivo3 ,archivo4 ,archivo5 ,archivo6 ,
        archivo7 ,archivo8 ,archivo9 ,archivo10 ,archivo11 ,
        descripcion
	};


    datos.unshift(newDato);

    const json_datos = JSON.stringify(datos);
    fs.writeFileSync('src/public/datos.json', json_datos,'utf-8');

    res.redirect('/');
});

router.get('/pelicula/:titulo',function(req,res){
    var obj = datos.filter(function(obj){
        if(req.params.titulo == obj.titulo ){
            res.render('pelicula.pug',obj);
        }
    })[0];
});

router.get('/editar/:id',function(req,res){
    var obj = datos.filter(function(obj){
        if(req.params.id == obj.id ){
            res.render('input.pug',obj);
        }
    })[0];
});

router.get('/delete/:id',(req, res) => {
	datos = datos.filter(datos => datos.id != req.params.id);
	const json_datos = JSON.stringify(datos);
    fs.writeFileSync('src/public/datos.json', json_datos,'utf-8');
    res.redirect('/')
});

//404
router.use('*' , (req, res) => {
    res.status(404).send('404 Not found');
});

module.exports = router;