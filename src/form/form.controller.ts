import { Controller, Get,Post, Put, Delete, Param,HttpCode, Query, Redirect, Body, HttpStatus, ParseIntPipe, HttpException, Res, DefaultValuePipe } from '@nestjs/common';
import { pipe } from 'rxjs';
import {CreateEntryDto} from './dto/create-entry.dto'
import { FormService } from './form.service';
const intPipe =  () => new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })


@Controller('forms')
export class FormController {

    constructor(private readonly formService: FormService){}
    
    @Get()
    async getForms(@Query('email') email?: string, @Query('id') id?: number){

        console.log(email)
        let results: Array<Object>;

        if (email && id) throw new HttpException('Choose email or id', HttpStatus.CONFLICT);

        else if (email) results = await this.formService.getByEmail(email);

        else if (id) results = await this.formService.getById(id);

        else results = await this.formService.getAll();

        if (!results?.length) throw new HttpException('Appointmens not found', HttpStatus.NO_CONTENT);

        return results;
    }

    

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() CreateEntryDto: CreateEntryDto) {

        if (!CreateEntryDto?.message?.length || !CreateEntryDto?.name?.length || !CreateEntryDto?.email?.length) 
         throw new HttpException('Validation failed', HttpStatus.NOT_ACCEPTABLE);

        const insertRes = (await this.formService.create(CreateEntryDto))
        
       if (!insertRes?.id) throw new HttpException('Not executed', HttpStatus.NOT_MODIFIED);

       return insertRes
    }


    @Delete(":id")
    async remove(@Param('id', intPipe()) id: string){
        const removeRes = this.formService.remove(id)

        const removeStatus = (await removeRes)?.affected

        if (!removeStatus) throw new HttpException('No such id', HttpStatus.NOT_MODIFIED);

        return removeStatus

    }
    

}