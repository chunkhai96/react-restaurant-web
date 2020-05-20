import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addComment, fetchDishes} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotion: state.promotion,
        leader: state.leader
    }
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => dispatch(actions.reset('feedback'))
})

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
    }

    render() {
        const HomePage = ()=> {
            return(
                <Home dish={this.props.dishes.dishes.filter((d) => d.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotion.filter((p) => p.featured)[0]}
                    leader={this.props.leader.filter((l) => l.featured)[0]}/>
            )
        }

        const DishWithId = ({match}) => {   
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    addComment={this.props.addComment}/>

            )
        }

        return (
        <div className='App'>
            <Header/>
                <Switch>
                    <Route path='/home' component={HomePage}/>
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes}/>}/>
                    <Route path='/menu/:dishId' component={DishWithId}/>
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                    <Route exact path='/aboutus' component={() => <About leaders={this.props.leader}/>}/>
                    <Redirect to='/home'/>
                </Switch>
            <Footer/>
        </div>
        );
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
