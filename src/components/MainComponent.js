import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comment';
import { PROMOTIONS } from '../shared/promotion';
import { LEADERS } from '../shared/leader';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotion: PROMOTIONS,
            leader: LEADERS
        };
    }

    render() {
        const HomePage = ()=> {
            return(
                <Home dish={this.state.dishes.filter((d) => d.featured)[0]}
                promotion={this.state.promotion.filter((p) => p.featured)[0]}
                leader={this.state.leader.filter((l) => l.featured)[0]}/>
            )
        }

        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}/>

            )
        }

        return (
        <div className='App'>
            <Header/>
                <Switch>
                    <Route path='/home' component={HomePage}/>
                    <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes}/>}/>
                    <Route path='/menu/:dishId' component={DishWithId}/>
                    <Route exact path='/contactus' component={Contact}/>
                    <Route exact path='/aboutus' component={() => <About leaders={this.state.leader}/>}/>
                    <Redirect to='/home'/>
                </Switch>
            <Footer/>
        </div>
        );
    };
}

export default Main;
