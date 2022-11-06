import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    UseInterceptors,
    UploadedFiles,
    Query,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { ObjectId } from 'mongoose'
import { CreateCommentDto } from './dto/create-comment.dto'
import { CreateTrackDto } from './dto/create-track.dto'
import { TrackService } from './track.service'

@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) {}

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'cover', maxCount: 1 },
            { name: 'audio', maxCount: 1 },
        ]),
    )
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const { cover, audio } = files
        return this.trackService.create(dto, cover[0], audio[0])
    }

    @Get()
    getAll(@Query('count') count: number, @Query('offset') offset: number) {
        return this.trackService.getAll(count, offset)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.trackService.getOne(id)
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.trackService.delete(id)
    }

    @Post('/comment')
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto)
    }

    @Post('/streams/:id')
    streams(@Param('id') id: ObjectId) {
        return this.trackService.streams(id)
    }

    @Get('/search')
    search(@Query('query') query: string) {
        return this.trackService.search(query)
    }
}
