const Goods = require('../modal/goods');
const Customer = require('../modal/customer');
const Basket = require('../modal/basket');


class CRUD {
    getAllGoods = () => new Promise((resolve,reject)=>{
        Goods.findAll({raw:true,
            attributes:['type_goods'],
            group:['type_goods']
        }).then(data=>{
            if(data.length>0){
                resolve(data);
            }
            else{
                reject('haven`t goods');
            }
        }).catch(e=>{
            reject(`class Good method getAllGoods error ${e}`)
        })
    });
    getGoodByType = ({type_goods}) => new Promise((resolve,reject)=>{
        Goods.findAll({raw:false,where:{
            type_goods
        }}).then(data=>{
            if(data.length>0){
                resolve(data);
            }
            else{
                reject('haven`t good');
            }
        }).catch(e=>{
            reject(`class Good method getGoodById ${e}`)
        })
    });
    getGoodById = ({id_goods}) => new Promise((resolve,reject)=>{
        Goods.findAll({raw:false,where:{
            id_goods
        }}).then(data=>{
            if(data.length>0){
                resolve(data);
            }
            else{
                reject('haven`t good by id');
            }
        }).catch(e=>{
            reject(`error with getGoodByID ${e}`)
        })
    });
    Setorder = ({customer_info,packages}) => new Promise((resolve,reject)=>{
        let {name_customer,surname_customer,patronime_customer,phone_number,location} = customer_info;
        Customer.create({
            name_customer,
            surname_customer,
            patronime_customer,
            phone_number,
            location
        }).then(data=>{
            return data.id_customer
        }).then((customer_id)=>{
            if(packages.length>0){
                let index = 0;
                for(let i = 0;i<packages.length;i++){
                    Basket.create({
                        goods_id:packages[i].goods_id,
                        count_goods:packages[i].count_goods,
                        customer_id
                    }).then(data=>{
                        index++;
                        if(index===packages.length) resolve({customer_id});
                    }).catch(e=>{
                        Customer.destroy({where:{
                            id_customer:customer_id
                        }}).catch(e=>{
                            reject(`Goods class method setorder destroy Customer error ${e}`);
                        });
                        reject(`Goods class method setorder create Basket error ${e}`);
                    })
                }
            }
            else{
                Customer.destroy({where:{
                    id_customer:customer_id
                }}).then(data=>{
                    reject('packages length equal 0');
                }).catch(e=>{
                    reject(`Goods class method setorder destroy Customer error ${e}`);
                });
            }
        }).catch(e=>{
            reject(`Goods class method setorder create Customer  error ${e}`);
        })
    });
}

module.exports = new CRUD();
