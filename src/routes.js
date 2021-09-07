import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';

import Main from './pages/Main/index';
import Repositorio from './pages/Repositorio/index';

export default function Routes()
{
    return(
        <BrowserRouter>
           <Switch>
               <Route  path="/" exact component={Main}/>
               <Route  path="/repositorio/:repositorio" exact component={Repositorio}/>
           </Switch>
        </BrowserRouter>
    )
}

