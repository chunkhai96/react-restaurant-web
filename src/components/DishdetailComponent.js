import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb, 
    BreadcrumbItem, Button, Row, Label,
    Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}) {
    if (dish != null) {
        return(
            <div>
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>  
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}

function RenderComment({comments}) {
    if (comments != null) {
        return(
            <div>
                <h4>
                    Comment
                </h4>
                <ul class = "list-unstyled">
                    {comments.map((c) => {
                        return(
                            <li key={c.id}>
                                <p>{c.comment}</p>
                                <p>
                                    -- {c.author}, {new Intl.DateTimeFormat(
                                    'en-US', 
                                    { year: 'numeric', month: 'short', day: '2-digit'}
                                    ).format(new Date(Date.parse(c.date)))}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}

class DishDetail extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal () {
        
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });  

        console.log("toggleModel: "+this.state.isModalOpen)
    }

    handleSubmit(values) {
        alert("Current state is: " +JSON.stringify(values));
        this.toggleModal();
    }

    render() {
        return(
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{this.props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-12 col-sm-12 col-md-5 m-1'>
                        <RenderDish dish={this.props.dish}/>
                    </div>
                    <div className='col-xs-12 col-sm-12 col-md-5 m-1'>
                        <RenderComment comments={this.props.comments}/>

                        <div>
                            <Button outline onClick={this.toggleModal}>
                                <span className='fa fa-pencil fa-lg'></span> Submit Comment
                            </Button>
                        </div>
                    </div>
                </div>
                
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
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text model='.name' id='name' name='name'
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}/>
                                <Errors
                                    className="text-danger"
                                    model=".name"
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

export default DishDetail;