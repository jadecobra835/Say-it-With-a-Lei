import React, { Component } from 'react';
import ReactModal from 'react-modal';
import DropzoneComponent from "react-dropzone-component";
import axios from 'axios';

import "../../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../../node_modules/dropzone/dist/min/dropzone.min.css";

ReactModal.setAppElement(".app-wrapper")
 
export default class GraduationModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            apiUrl: "http://127.0.0.1:5000/add-graduation",
            name: "",
            price: "",
            image: "",
            description: "",
            color1: "red",
            color2: "",
            color3: "",
            color4: "",
        };
        
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.buildForm = this.buildForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.imageRef = React.createRef();
    };

    componentConfig() {
        return {
            iconFiletypes: [".jpeg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        };
    };

    djsConfig() {
        return {
            maxFiles: 1
        };
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleDelete(event) {
        event.preventDefault();

        this.setState({
            image: ""
        })

        this.imageRef.current.dropzone.removeAllFiles()
    }

    handleImage() {
        return {
            addedfile: file => this.setState({ image: file })
        };
    };

    buildForm() {
        let formData = new FormData();

        formData.append("lei_item[name]", this.state.name);
        formData.append("lei_item[price]", this.state.price);
        formData.append("lei_item[color1]", this.state.color1);
        formData.append("lei_item[image]", this.state.image, this.state.name)
        formData.append("lei_item[type]", "graduation" )

        if(this.state.description) {
            formData.append("lei_item[description]", this.state.description);
        }

        if(this.state.color2) {
            formData.append("lei_item[color2]", this.state.color2);
        }

        if(this.state.color3) {
            formData.append("lei_item[color3]", this.state.color3);
        }

        if(this.state.color4) {
            formData.append("lei_item[color4]", this.state.color4);
        }
        
        return formData;
    }

    handleSubmit(event) {
        axios({
            method: "POST",
            url: this.state.apiUrl,
            headers: {"content-type": "multipart/form-data"},          
            data: this.buildForm(),
            withCredentials: true
        }).then(response => {
            const result = response;

            this.setState({
                apiUrl: "http://127.0.0.1:5000/add-graduation",
                name: "",
                price: "",
                image: "",
                description: "",
                color1: "red",
                color2: "",
                color3: "",
                color4: "",
            })

            console.log(result.config.data)

            this.imageRef.current.dropzone.removeAllFiles()

            // console.log(result);
        }).catch(error => {
            console.log("graduationModal handleSubmit error", error);
        });

        // console.log('Form submitted')
        
        event.preventDefault();
    }
    
    render() {
        return (
            <div>
                <ReactModal 
                    isOpen={this.props.modalStatus}
                    onRequestClose={this.props.modalOff} 
                >
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder='Name of Lei' 
                            maxLength={45} 
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <input 
                            type="number" 
                            name="price"
                            placeholder='Price' 
                            value={this.state.price}
                            onChange={this.handleChange}
                        />

                        <select
                            name="color1"
                            value={this.state.color1}
                            onChange={this.handleChange}
                        >
                            <option value="red">Red</option>
                            <option value="orange">Orange</option>
                            <option value="yellow">Yellow</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="purple">Purple</option>
                            <option value="white">White</option>
                            <option value="black">Black</option>
                        </select>

                        <select
                            name="color2"
                            value={this.state.color2}
                            onChange={this.handleChange}
                        >
                            <option value="">None</option>
                            <option value="red">Red</option>
                            <option value="orange">Orange</option>
                            <option value="yellow">Yellow</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="purple">Purple</option>
                            <option value="white">White</option>
                            <option value="black">Black</option>
                        </select>

                        <select
                            name="color3"
                            value={this.state.color3}
                            onChange={this.handleChange}
                        >
                            <option value="">None</option>
                            <option value="red">Red</option>
                            <option value="orange">Orange</option>
                            <option value="yellow">Yellow</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="purple">Purple</option>
                            <option value="white">White</option>
                            <option value="black">Black</option>
                        </select>

                        <select
                            name="color4"
                            value={this.state.color4}
                            onChange={this.handleChange}
                        >
                            <option value="">None</option>
                            <option value="red">Red</option>
                            <option value="orange">Orange</option>
                            <option value="yellow">Yellow</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="purple">Purple</option>
                            <option value="white">White</option>
                            <option value="black">Black</option>
                        </select>

                        <textarea
                            name="description" 
                            type="text" 
                            placeholder='Description' 
                            maxLength={1000} 
                            value={this.state.description}
                            onChange={this.handleChange}
                        />

                        <DropzoneComponent
                            name="dropzone"
                            ref={this.imageRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleImage()}
                        >
                        </DropzoneComponent>
                        <button onClick={this.handleDelete}>Remove Links</button>
                        <button type='submit'>Save</button>
                    </form>

                </ReactModal>
            </div>
        );
    }
}