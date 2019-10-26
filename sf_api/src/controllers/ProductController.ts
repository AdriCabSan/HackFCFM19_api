import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import {Product} from "../entity/Product";

class ProductController{
    static listAll = async (req: Request, res: Response) => {
        //Get products from database
        const productRepository = getRepository(Product);
        const products = await productRepository.find({
          select: ["id", "name", "description"] 
        });
      
        //Send the products object
        res.send(products);
      };
      
      static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = +req.params.id;
      
        //Get the product from database
        const productRepository = getRepository(Product);
        try {
          const product = await productRepository.findOneOrFail(id, {
            select: ["id", "name", "description"] 
          });
          res.send(product);
        } catch (error) {
          res.status(404).send("Product not found");
        }
      };
      
      static newProduct = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { product_name, description, max_temperature_treshold,max_humidity_treshold,
            min_temperature_treshold,min_humidity_treshold } = req.body;
        let product = new Product();
        product.name = product_name;
        product.description = description;
        product.max_temperature_treshold = max_temperature_treshold;
        product.min_temperature_treshold = min_temperature_treshold;
        product.max_humidity_treshold = max_humidity_treshold;
        product.min_humidity_treshold = min_humidity_treshold;
        //Validade if the parameters are ok
        const errors = await validate(product);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
      
        //Try to save. If fails, the product_name is already in use
        const productRepository = getRepository(Product);
        try {
          await productRepository.save(product);
        } catch (e) {
          res.status(409).send("product_name already in use");
          return;
        }
      
        //If all ok, send 201 response
        res.status(201).send("Product created");
      };
      
      static editProduct = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
      
        //Get values from the body
        const { product_name, description, } = req.body;
      
        //Try to find product on database
        const productRepository = getRepository(Product);
        let product;
        try {
          product = await productRepository.findOneOrFail(id);
        } catch (error) {
          //If not found, send a 404 response
          res.status(404).send("Product not found");
          return;
        }
      
        //Validate the new values on model
        product.name = product_name;
        product.description = description;

        const errors = await validate(product);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
      
        //Try to safe, if fails, that means product_name already in use
        try {
          await productRepository.save(product);
        } catch (e) {
          res.status(409).send("product_name already in use");
          return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
      };
      
      static deleteProduct = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
      
        const productRepository = getRepository(Product);
        let product: Product;
        try {
          product = await productRepository.findOneOrFail(id);
        } catch (error) {
          res.status(404).send("Product not found");
          return;
        }
        productRepository.delete(id);
      
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
      };
      };
export default ProductController;