import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb, 
    BreadcrumbItem, Button, Row, Label,
    Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {FadeTransform, Fade, Stagger} from 'react-animation-components'

import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}) {
    if (dish != null) {
        return(
            <div className='col-xs-12 col-sm-12 col-md-5 m-1'>
                <FadeTransform in 
                    transformfromProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg top src= {baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>  
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}

function RenderComment({comments, postComment, dishId}) {
    if (comments != null) {
        return(
            <div className='col-xs-12 col-sm-12 col-md-5 m-1'>
                <h4>
                    Comment
                </h4>
                <ul class = "list-unstyled">
                    <Stagger in>
                        {comments.map((c) => {
                            return(
                                <Fade in>
                                    <li key={c.id}>
                                        <p>{c.comment}</p>
                                        <p>
                                            -- {c.author}, {new Intl.DateTimeFormat(
                                            'en-US', 
                                            { year: 'numeric', month: 'short', day: '2-digit'}
                                            ).format(new Date(Date.parse(c.date)))}
                                        </p>
                                    </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}

class CommentForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal () {
        
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });  
    }

    handleSubmit(values) {
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        this.toggleModal();
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className='fa fa-pencil fa-lg'></span> Submit Comment
                </Button>
            
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} className="container">
                            <Row className='form-group'>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model='.rating' id='rating' name='rating'
                                    className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model='.author' id='author' name='author'
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}/>
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                    />
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model='.comment' id='comment' name='comment' rows={6}
                                className="form-control"/>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

function DishDetail(props) {
    if (props.isLoading){
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.dish != null){
        return(
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className='row'>
                    <RenderDish dish={props.dish}/>
                    <RenderComment comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}/>    
                </div>
            </div>
        )
    }
}

export default DishDetail;