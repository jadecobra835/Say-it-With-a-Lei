import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import LeiItemThumb from '../shoppingPages/leiItemThumb';
import NewLeiModal from '../shoppingPages/modals/newLeiModal';

 
export default class WeddingAndBaptism extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalStatus: false,
            allLeis: []
        }

        this.modalStatus = this.modalStatus.bind(this);
        this.getLeis = this.getLeis.bind(this);
        this.leiItems = this.leiItems.bind(this);
    }

    componentDidMount() {
        this.getLeis();
    }

    getLeis() {
        axios
            .get('http://127.0.0.1:5000/get-preset-leis/wedding-and-baptism')
            .then(response => {
                const result = response.data
                this.setState({
                    allLeis: result
                })
            })
            .catch(error => {
                console.log("Error", error)
            })
    }

    leiItems() {
        return this.state.allLeis.map(item => {
            return (
                <LeiItemThumb
                    key={item.id}
                    item={item}
                    loggedIn={this.props.loggedInStatus}
                    update={() => this.getLeis()}
                />
            );
        });
    };

    modalStatus() {
        if (this.state.modalStatus == false) {
            this.setState({
                modalStatus: true
            });
        } else if (this.state.modalStatus == true) {
            this.setState({
                modalStatus: false
            });
        };
    };
    
    render() {
        return (
            <div>
                <div className="heading">
                    <h1>Wedding & Baptism</h1>
                </div>

                <div className="leiItemsWrapper">
                    {this.leiItems()}
                </div>

                { this.props.loggedInStatus == true ? 
                    <div>
                        <div className="modalButton">
                            <FontAwesomeIcon icon={faCirclePlus} onClick={this.modalStatus} />
                        </div>

                        <NewLeiModal
                            modalStatus={this.state.modalStatus}  
                            modalOff={this.modalStatus}
                            type="wedding-and-baptism"
                            update={() => this.getLeis()}
                        />
                    </div>
                :
                    <div />
                }
            </div>
        );
    }
}