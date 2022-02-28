import { Controller, Get,Post, Put, Delete, Param,HttpCode, Query, Redirect, Body, HttpStatus, ParseIntPipe, HttpException, Res } from '@nestjs/common';
import {CreateEntryDto} from './dto/create-entry.dto'
import { FormService } from './form.service';
const intPipe =  () => new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })


@Controller('form')
export class FormController {

    constructor(private readonly formService: FormService){
    }
    
    @Get()
    async getAll(){
        const results = await this.formService.getAll();

        if (!results || !results.length) throw new HttpException('Appointmens not found', HttpStatus.NO_CONTENT);

        return results;
    }


    @Get("/userAppointments")
    async getByEmail(@Query('email') email: String){

        const results = await this.formService.getByEmail(email);

        if (!results || !results.length) throw new HttpException('Appointmens not found', HttpStatus.NO_CONTENT);

        return results;
    }
    

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() CreateEntryDto: CreateEntryDto) {

        const insertRes = (await this.formService.create(CreateEntryDto))
        
       if (!insertRes || !insertRes.id) throw new HttpException('Not executed', HttpStatus.NOT_MODIFIED);

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