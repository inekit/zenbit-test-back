import { Injectable } from "@nestjs/common";
import { CreateEntryDto } from "./dto/create-entry.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from "./dbEntities/form.entry";
import { User } from "./dbEntities/user.entry";
import { Repository, Connection } from 'typeorm';


@Injectable()
export class FormService{

    constructor(
        @InjectRepository(Form)
        private formRepository: Repository<Form>,
        ){}


     getAll(): Promise<Form[]>{
        return this.formRepository.find({
            relations: ['user'],
            })

    }

    getByEmail(email: String): Promise<Form[]>{
        return this.formRepository.find(
            {where: {user: {email:email}},
            relations: ['user']
        })
     
    }

    getById(id: number): Promise<Form>{
        return this.formRepository.findOne({
            where: {id : id},
            relations: ['user'],
        })
     
    }

    async create(entryDto: CreateEntryDto){

        const {message, name,  email} = entryDto

        const obj = this.formRepository.create({message: message, user: {name: name, email: email}});

        return this.formRepository.save(obj)
    }

    async remove(id: string){
        return await this.formRepository.delete(id);
      }
}