const CrewmemberDB=require('../models').Crewmember;

const express = require("express");


const controller = {
    addCrewmember: async (req,res) => {
        const crewmember = {
            name: req.body.name,
            role:req.body.role,
            shipId:req.body.shipId
        }
        let err = false;
        let errArr=[];

        if(crewmember.name.length<=6) {
            err=true;
            errArr.push("Name must be at least 6 characters long\n");
        }
        if(crewmember.role!=="CAPTAIN" && crewmember.role!=="BOATSWAIN" && crewmember.role!=="GENERAL") {
            errArr.push("Role must be from the list\n")
            err=true;
        }

        if(!err) {
            try {
                const newCrewmember=await CrewmemberDB.create(crewmember);
                res.status(200).send("Crewmember added");
            }
            catch (error) {
                console.log('Error:',error);
                res.status(500).send("Error creating new crewmember!");
            }
        }
        else {

            res.status(400).send({message:errArr})
        }
    },
    getAllCrewmembers: async(req,res) => {
        try {
            let crewmembers=await CrewmemberDB.findAll();
            res.status(200).send(crewmembers);
        } catch(err){
            res.status(500).send({
                message: "Error selecting all crewmembers!"
            })
        }
    },
    getCrewmembers: async(req, res) => {
        try{
            let crewmemberId = req.params['id'];
            const crewmembers = await CrewmemberDB.findAll({ where : { shipId: crewmemberId }});
            res.status(200).send(crewmembers);
        } catch(err){
            res.status(500).send({
                message: "Error selecting crewmember!"
            })
        }
    },

    updateCrewmembers: async(req, res) => {
        let crewmemberId=req.params['id'];
        const crewmember=await CrewmemberDB.findOne({where:{id:crewmemberId}});
        crewmember.update({
            name: req.body.name,
            role:req.body.role,
            shipId:req.body.shipId
        })
            .then(() => {
                res.status(200).send({message:"Edited crewmember"})
            })
            .catch(() => {
                res.status(500).send({message:"Error"})
            })
    },
    deleteCrewmember : async(req,res) => {
        try{
            let crewmemberId = req.params['id'];
            const crewmember = await CrewmemberDB.destroy({
                where: {
                    id: crewmemberId
                }
            })
            res.status(200).send({
                message: "Crewmember " + crewmemberId + " deleted."
            });
        }catch(error){
            res.status(500).send({
                message: "Error deleting crewmember!"
            })
        }
    }

}

module.exports = controller;