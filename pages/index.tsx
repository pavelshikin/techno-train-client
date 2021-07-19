import * as React from "react"
import MainLayout from "../layouts/Main"
import {useAuth} from '../context/auth'


const Index = () => {
   const { user } = useAuth();

   return (
     <>
        <MainLayout>
           <div className="container">
                <div className={'pt-3 t-center'}>
                   <h2>
                      { user ?
                        <>Привет {user.username}!</>
                        : <>Авторизуйтесь</>
                      }
                   </h2>
                </div>

           </div>
        </MainLayout>
     </>
   )
}

export default Index


