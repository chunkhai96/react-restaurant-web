import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';


function RenderDish({dish}) {
    if (dish != null) {
        return(
            <div className='col-xs-12 col-sm-12 col-md-5 m-1'>
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

function RenderComment({dish}) {
    if (dish != null) {
        return(
            <div className='col-xs-12 col-sm-12 col-md-5 m-1'>
                <h4>
                    Comment
                </h4>
                <ul class = "list-unstyled">
                    {dish.comments.map((c) => {
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

const DishDetail = (props) => {
        return(
            <div className='container'>
                <div className='row'>
                    <RenderDish dish={props.dish}/>
                    <RenderComment dish={props.dish}/>
                </div>
            </div>
        )
}

export default DishDetail;