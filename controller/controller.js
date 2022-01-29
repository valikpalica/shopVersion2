const crud = require('../DB/crud/crud');

class Controller{

    getAllGoods = (req,res) => {
        crud.getAllGoods().then(data=>{
            res.status(200).json(data);
        }).catch(e=>{
            res.status(400).json(e);
        });
    }
    getGoodByType = (req,res) =>{
        crud.getGoodByType(req.body).then((data)=>{
            res.status(200).json(data);
        }).catch(e=>{
            res.status(400).json(e);
        });
    }
    Setorder = (req,res) =>{
        crud.Setorder(req.body).then(data=>{
            res.status(200).json(data);
        }).catch(e=>{
            res.status(400).json(e)
        });
    }
    getGoodById = (req,res)=>{
        crud.getGoodById(req.body).then(data=>{
            res.status(200).json(data);
        }).catch(e=>{
            res.status(400).json(e)
        })
    }
};

module.exports = new Controller();