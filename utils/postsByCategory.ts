import { IPost } from "../types/posts"

export const postsByCategory = (posts: IPost[], value: string) => {
   let postsArray = []

   posts.forEach(p =>
     p.category.filter(
       c => {
          if(c.name === value) postsArray.push(p)
       }
     )
   )
   return postsArray
}