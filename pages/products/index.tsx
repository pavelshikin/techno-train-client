import React, {useEffect, useState} from 'react'
import MainLayout from "../../layouts/Main"
import api from '../../utils/api'
import {NextThunkDispatch, wrapper} from '../../store'
import nookies from 'nookies'
import {postsByCategory} from '../../utils/postsByCategory'
import NoteItem from '../../components/NoteItem'

const ProductsPage = ({serverPosts}) => {
   const products = postsByCategory(serverPosts, 'products')

   return (
     <MainLayout title={'Продукты'}>
        <div className="container">
           <NoteItem notes={products}/>
        </div>
     </MainLayout>
   )
}

export default ProductsPage

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
   const dispatch = store.dispatch as NextThunkDispatch
   const cookies = nookies.get(ctx)
   const token = cookies.Authentication

   if (token) {
      const res = await api.get('posts/me', {
         headers: {
            Cookie: `Authentication=${token}`
         }
      })

      return {
         props: {
            serverPosts: res.data
         }
      }
   }
})
