import { ObjectId } from 'mongoose'

export class CreateCommentDto {
    readonly trackId: ObjectId
    readonly username: string
    readonly text: string
}
