import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './page/listPage';
import DetailPage from './page/detailPage';
import NotFound from '../../component/NotFound';

export default function TodoFeature(props) {
    const match=useRouteMatch();
    console.log(match.path);
    return (
        <div>
            
            <Switch>
                 {/* cach 1 su dung param tinh */}
                {/* <Route path="/todos" component={ListPage} exact/>
                <Route path="/todos/:todoId" component={DetailPage}/>  */}
                {/* cach 2 lay path cua thang cha  dung match.path*/}
                <Route path={match.path} component={ListPage} exact/>
                <Route path= {`${match.path}/:todoId`} component={DetailPage}/> 
                <Route component={NotFound}/>
            </Switch>
        </div>
    )
}
TodoFeature.prototype ={};