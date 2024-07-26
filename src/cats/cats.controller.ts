import { Controller, Get, HttpCode, Post, Header, Redirect, Param, Body } from '@nestjs/common';
import { CreateCatDto } from 'src/DTO/create-cat.dto';

@Controller('cats')
export class CatsController {
    @Get()
    findAll():string{
        return 'Finding all Cats'
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
        return `This actions adds a ${createCatsDto.name}`;
    }
}
