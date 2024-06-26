import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

import LeiItemThumb from '../shoppingPages/leiItemThumb';
import NewLeiModal from '../shoppingPages/modals/newLeiModal';

 
export default class Graduation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalStatus: false,
            allLeis: [],
            loading: false
        }

        this.modalStatus = this.modalStatus.bind(this);
        this.getLeis = this.getLeis.bind(this);
        this.leiItems = this.leiItems.bind(this);
    }

    componentDidMount() {
        this.getLeis();
    }

    getLeis() {
        this.setState({
            loading: true
        })

        axios
            .get('https://xjj-say-it-with-a-lei-python-ee64a24a30bb.herokuapp.com/get-preset-leis/graduation')
            .then(response => {
                const result = response.data
                this.setState({
                    allLeis: result,
                    loading: false
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
                    <h1>Graduation</h1>
                </div>

                <div className="leiItemsWrapper">
                    {this.leiItems()}
                </div>

                {this.state.loading ? (
                    <div className="loadingIcon">
                        <FontAwesomeIcon icon={faSpinner} spin={true} />
                    </div>
                ) : null }


                { this.props.loggedInStatus == true ? 
                    <div>
                        <div className="modalButton">
                            <FontAwesomeIcon icon={faCirclePlus} onClick={this.modalStatus} />
                        </div>

                        <NewLeiModal 
                            modalStatus={this.state.modalStatus}  
                            modalOff={this.modalStatus}
                            type="graduation"
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