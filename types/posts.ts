import {ObjectId} from 'mongodb'

export interface ICategory {
   _id: ObjectId
   name: string
}

export interface IPost {
   _id: ObjectId
   title: string
   content?: string
   created: string
   category: ICategory[]
}