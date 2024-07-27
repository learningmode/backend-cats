import { Controller, Get, HttpCode, Post, Header, Redirect, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCatDto } from 'src/cats/DTO/create-cat.dto';
import { CatsService } from './service/cats.service';
import { Cat } from 'src/cats/data-types/cat.interface';

@Controller('cats')
export class CatsController {
    constructor(private catsService:CatsService){}
    @Get()
    async findAll(): Promise<Cat[]>{
        try{
            return await this.catsService.findAll()
        }catch(error){
            throw new HttpException({
                status:HttpStatus.FORBIDDEN,
                error:'This is a custom message'
            },HttpStatus.FORBIDDEN,{
                cause:error
            });
        }
    }

    @Get('httperror')
    async httpTest() {
    throw new HttpException({error:'Forbidden Error', status: HttpStatus.FORBIDDEN},HttpStatus.FORBIDDEN);
    }

    @Post()
    @Header('Cache-Control','none')
    @HttpCode(204)
    createACat():string{
        return 'Creating a Cat';
    }

    @Get('dogs')
    @Redirect('https://nestjs.com',301)
    getDogs(){
        return 'No Dogs allowed'
    }

    @Get(':id')
    findOne(@Param() params:{id:number}):string{
        return `The cat with the ${params.id} is here`;
    }

    @Post()
    async create(@Body() createCatsDto:CreateCatDto){
        this.catsService.create(createCatsDto);
    }

}
