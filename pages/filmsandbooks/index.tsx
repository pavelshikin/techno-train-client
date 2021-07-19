import React, {useEffect, useState} from 'react'
import MainLayout from "../../layouts/Main"
import api from '../../utils/api'
import {NextThunkDispatch, wrapper} from '../../store'
import nookies from 'nookies'
import {postsByCategory} from '../../utils/postsByCategory'
import NoteItem from '../../components/NoteItem'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'


interface TabPanelProps {
   children?: React.ReactNode;
   dir?: string;
   index: any;
   value: any;
}

const TabPanel = (props: TabPanelProps) => {
   const {children, value, index, ...other} = props

   return (
     <div
       role="tabpanel"
       hidden={value !== index}
       id={`full-width-tabpanel-${index}`}
       aria-labelledby={`full-width-tab-${index}`}
       {...other}
     >
        {value === index && (
          <div style={{paddingTop: 20}}>{children}</div>
        )}
     </div>
   )
}

const a11yProps = (index: any) => {
   return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`
   }
}

const FilmsAndBooksPage = ({serverPosts}) => {
   const [value, setValue] = React.useState(0)
   const films = postsByCategory(serverPosts, 'films')
   const books = postsByCategory(serverPosts, 'books')

   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue)
   }

   const handleChangeIndex = (index: number) => {
      setValue(index)
   }


   return (
     <MainLayout title={'Фильмы и книги'}>
        <div className="container" style={{maxWidth: 900}}>
           <Tabs
             value={value}
             onChange={handleChange}
             indicatorColor="primary"
             variant="fullWidth"
             aria-label="full width tabs example"
           >
              <Tab label="Фильмы" {...a11yProps(0)} />
              <Tab label="Книги" {...a11yProps(1)} />
           </Tabs>
           <SwipeableViews
             index={value}
             onChangeIndex={handleChangeIndex}
           >
              <TabPanel value={value} index={0}>
                 <NoteItem notes={films}/>
              </TabPanel>
              <TabPanel value={value} index={1}>
                 <NoteItem notes={books}/>
              </TabPanel>
           </SwipeableViews>
        </div>
     </MainLayout>
   )
}

export default FilmsAndBooksPage

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

