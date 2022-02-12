const ShipDB=require('../models').Ship;

const express = require("express");


const controller = {
    addShip: async (req, res) => {
        const ship = {
            name:req.body.name,
            displacement:req.body.displacement
        }
        let err=false;
        let errArr=[];

        if(ship.name.length<=3) {
            errArr.push("Name must be at least 3 characters long\n")
            err=true;
        }
        if(ship.displacement<50) {
            errArr.push("Displacement must me >50 \n")
            err=true;
        }
        if(!err) {
            try {
                const newDisplacement=await ShipDB.create(ship);
                res.status(200).send("Displacecment added");
            }
            catch (error) {
                console.log('Error:',error);
                res.status(500).send("Error creating new ship!");
            }
        }
        else {
            res.status(400).send({message:errArr})

        }
    },
    getAllShips: async(req, res) => {
        try {
            let ships=await ShipDB.findAll();
            res.status(200).send(ships);
        } catch(err){
            res.status(500).send({
                message: "Error selecting all ships!"
            })
        }
    },
    getOneShip: async(req, res) => {
        try{
            let shipId = req.params['id'];
            const ship = await ShipDB.findOne({ where : { id: shipId }});
            res.status(200).send(ship);
        } catch(err){
            res.status(500).send({
                message: "Error selecting ship!"
            })
        }
    },

    updateShip: async(req, res) => {
        let shipId=req.params['id'];
        const ship=await ShipDB.findOne({where:{id:shipId}});
        ship.update({
            name:req.body.name,
            displacement:req.body.displacement
        })
            .then(() => {
                res.status(200).send({message:"Edited ship"})
            })
            .catch(() => {
                res.status(500).send({message:"Error"})
            })
    },
    deleteShip : async(req, res) => {
        try{
            let shipId = req.params['id'];
            const ship = await ShipDB.destroy({
                where: {
                    id: shipId
                }
            })
            res.status(200).send({
                message: "ships " + ship + " deleted."
            });
        }catch(error){
            console.log("Error:",error);
            res.status(500).send({
                message: "Error deleting ship!"
            })
        }
    }
}

module.exports = controller;