import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import {Container} from "../entity/Container";
class ContainerController{
    static listAll = async (req: Request, res: Response) => {
        //Get containers from database
        const containerRepository = getRepository(Container);
        const containers = await containerRepository.find({
          select: ["id", "name", "description"]
        });
      
        //Send the containers object
        res.send(containers);
      };
      
      static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = +req.params.id;
      
        //Get the container from database
        const containerRepository = getRepository(Container);
        try {
          const container = await containerRepository.findOneOrFail(id, {
            select: ["id", "name"] //We dont want to send the password on response
          });
          res.send(container);
        } catch (error) {
          res.status(404).send("Container not found");
        }
      };
      
      static newContainer = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { name, description } = req.body;
        let container = new Container();
        container.name = name;
        container.description = description;
        
        //Validade if the parameters are ok
        const errors = await validate(container);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
      
        //Try to save. If fails, the name is already in use
        const containerRepository = getRepository(Container);
        try {
          await containerRepository.save(container);
        } catch (e) {
          res.status(409).send("name already in use");
          return;
        }
      
        //If all ok, send 201 response
        res.status(201).send("Container created");
      };
      
      static editContainer = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
      
        //Get values from the body
        const { name, description } = req.body;
      
        //Try to find container on database
        const containerRepository = getRepository(Container);
        let container;
        try {
          container = await containerRepository.findOneOrFail(id);
        } catch (error) {
          //If not found, send a 404 response
          res.status(404).send("Container not found");
          return;
        }
      
        //Validate the new values on model
        container.name = name;
        container.description = description;
        const errors = await validate(container);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
      
        //Try to safe, if fails, that means name already in use
        try {
          await containerRepository.save(container);
        } catch (e) {
          res.status(409).send("name already in use");
          return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
      };
      
      static deleteContainer = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
      
        const containerRepository = getRepository(Container);
        let container: Container;
        try {
          container = await containerRepository.findOneOrFail(id);
        } catch (error) {
          res.status(404).send("Container not found");
          return;
        }
        containerRepository.delete(id);
      
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
      };
      };
export default ContainerController;