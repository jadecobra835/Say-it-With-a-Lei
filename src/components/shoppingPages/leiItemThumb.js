import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
 
export default class LeiItemThumb extends Component {
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        event.preventDefault();
        axios({
            method: "DELETE",
            url: `http://127.0.0.1:5000/delete-lei/${this.props.item.id}`,
            withCredentials: true
        }).then(response => {
            console.log(response.data)
            this.props.update()
        }).catch(error => {
            console.log('handleDelete Error:', error)
        });
    }

    render() {
        const { id, name, price, image, description, color1, color2, color3, color4, type } = this.props.item;
        return (
            <Link to={`/${type}/${id}`} className="itemLink">
                <div 
                    id={id} 
                    className={`leiItem ${name} ${color1} ${color2} ${color3} ${color4} ${type}`}
                >
                    <div className="leiItemImageWrapper">
                        <img src={image} alt="lei" />
                    </div>

                    <div className="nameOfLei">
                        {name}
                    </div>

                    <div className="leiPrice">
                        {`$${price}.00`}

                        {this.props.loggedIn == true ? 
                            <div className="trashIcon">
                                <FontAwesomeIcon icon={faTrash} onClick={this.handleDelete}/>
                            </div>
                        :
                            <div />
                        }
                    </div>
                </div>
            </Link>
        );
    }
}