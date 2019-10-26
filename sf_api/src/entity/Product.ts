
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
  import * as bcrypt from "bcryptjs";
  
  @Entity()
  @Unique(["product"])
  export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    container_id: number;
    @Column()
    upc_code: string;
    @Column()
    name: string;
    @Column()
    description:string;
    @Column()
    quantity:number;
    @Column()
    max_temperature_treshold:number;
    @Column()
    min_temperature_treshold:number;
    @Column()
    max_humidity_treshold:number;
    @Column()
    min_humidity_treshold:number;
    @Column()
    @CreateDateColumn()
    createdAt: Date;
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

   
  }
