module.exports = function (app) {
    var mongoose = require('mongoose');
    var dateFormat = require('dateformat');

    mongoose.connect('mongodb://localhost/toDoList');

    app.post('/api/lista', function (req, res) {
        
        req.assert('nomeLista', 'nome da lista obrigatorio').notEmpty();
        var erros = req.validationErrors();
        if (erros) {
            res.status(400).send(erros);
            return;
        }
        else {
            var dadosLista = req.body;
          
            try {
                objLista = mongoose.model('lista');
            } catch (error) {
                objLista = mongoose.model('lista', { nomeLista: String });
            }
            newObj = new objLista(dadosLista);
            newObj.save(function (err, obj) {
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                else {
                    res.status(200).send(obj);
                    return;
                }
            });

        }

    });

    app.post('/api/item', function (req, res) {
        
        req.assert('nomeItem', 'nome do item obrugatario').notEmpty();
        req.assert('descricao', 'descricao do item obrugatario').notEmpty();
        req.assert('idLista', 'idLista do item obrugatario').notEmpty();
        var erros = req.validationErrors();

        if (erros) {
            res.status(400).send(erros);
        }
        else {
            var data = new Date();
            newdata = dateFormat(data, 'dd/mm/yyyy');
            var dadosItem = req.body;
            dadosItem.data = newdata;
            dadosItem.status="aberto";
            
            try {
                objItem = mongoose.model('item');
            } catch (error) {
                objItem = mongoose.model('item', {
                    nomeItem: String,
                    descricao: String, status: String, idLista: String, data: String
                });
            }

            newObjItem = new objItem(dadosItem);
            newObjItem.save(function (err, obj) {
                if (err) {
                    res.status(400).send(err);
                    console.log("parou");
                }
                else {
                    res.status(200).send(obj);
                    console.log("passou");
                }
            });

        }


    });

    app.get('/api/item', function (req, res) {
       
        try {
            objItem = mongoose.model('item');
        } catch (error) {
            objItem = mongoose.model('item', {
                nomeItem: String,
                descricao: String, status: String, idLista: String, data: String
            });
        }
        objItem.find({}, function (err, obj) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.status(200).send(obj);
            }
        });

    });

    app.get('/api/lista', function (req, res) {

        try {
            objLista = mongoose.model('lista');
        } catch (error) {
            objLista = mongoose.model('lista', { nomeLista: String });
        }

        objLista.find({}, function (err, obj) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.status(200).send(obj);
            }
        });


    });

    app.put('/api/item/:idItem/:status', function (req, res) {

        try {
            objItem = mongoose.model('item');
        } catch (error) {
            objItem = mongoose.model('item', {
                nomeItem: String,
                descricao: String, status: String, idLista: String, data: String
            });
        }
        objItem.update({ _id: req.params.idItem }, { $set: { status: req.params.status } }, { new: true }, function (err, retorno) {
            if (err) return handleError(err);
            res.send(retorno);
        });

    });

    app.delete('/api/lista/:idLista', function (req, res) {

        try {
            objLista = mongoose.model('lista');
        } catch (error) {
            objLista = mongoose.model('lista', { nomeLista: String });
        }
        try {
            objItem = mongoose.model('item');
        } catch (error) {
            objItem = mongoose.model('item', {
                nomeItem: String,
                descricao: String, status: String, idLista: String, data: String
            });
        }

        objLista.remove({ _id: req.params.idLista }, function (err, obj) {
            if (err) {
                res.status(400).send(err);
                return;
            }

        });

        objItem.remove({ idLista: req.params.idLista }, function (rr, oo) {
            if (rr) {
                res.status(400).send(err);
                return;
            }
            else {
                res.status(200).send('ok');
            }
        });

    });

    app.delete('/api/item/:idItem', function (req, res) {
       
        try {
            objItem = mongoose.model('item');
        } catch (error) {
            objItem = mongoose.model('item', {
                nomeItem: String,
                descricao: String, status: String, idLista: String, data: String});
        }
        
            console.log('aceiteou');
            objItem.remove({ _id: req.params.idItem }, function (err, obj) {
                if (err) {
                    res.status(400).send(err);

                }
                else {
                    res.status(200).send(obj);
                }
            });
    });



}