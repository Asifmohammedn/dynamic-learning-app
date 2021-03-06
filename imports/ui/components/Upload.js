import React from 'react'
import { Sims } from  '../../api/sims'
import { Meteor } from 'meteor/meteor'
import SimContainer from './SimContainer'
import Modal from 'react-modal'
 

export default class Upload extends React.Component {

    /*This component performs the function of uploading the iframe
      src stores the src of the input iframe tag, isOpen is for opening
      and closing of the modal.
    */

    constructor(props) {
        
        super(props)
        this.state = {
            src:'',
            error:'',
            isOpen: false,
            w:null,
            h:null
        }
        this.submitButton.bind(this)
    }

    componentDidMount() {
        Meteor.subscribe('sims')
    }
    
    enteredLink(e) {
        
        e.preventDefault()
        let link = this.sim.value
        this.setState({
            error:link
        })

        /* The link.match checks if the iframe entered is valid by using regular
           expression. The src should be set only if the entered tag is valid.
        */

        const tag = link.match(`(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))`)
        
        if(tag) {
            const validTag = tag[0]

            /* The contents in the src is obtained using regular expression */

            const src = validTag.match(`src\s*=\s*"\s*(.*)\s*">`)
            if(src) {
                validSrc = src[1]
                this.setState({
                    src:validSrc
                })
            }
            else {
                this.setState({
                    src:''
                })
            }
        }
        else {
            this.setState({
                src:''
            })
        }
    }

    submitButton() {

        /* Here we read the name, width and height of the simulation. A method is
           passed from the parent function which decides what to do with the uploaded
           simulation. To the method, we pass these values.
        */

        if(this.state.src) {
            return (
                <div>                    
                    Name of the simulation
                    <input ref= {e => this.name = e} onChange = {()=>{this.setState({name:this.name.value})}}/>
                    
                    Width
                    <input ref= {e => this.width = e} onChange = {()=>{this.setState({w:this.width.value})}}/>
                    
                    Height
                    <input ref= {e => this.height = e} onChange = {()=>{this.setState({h:this.height.value})}}/>
                                    
                    <button onClick = {(e)=>{

                        e.preventDefault()
                        const src = this.state.src

                        let w = this.width.value
                        let h = this.height.value
                        let name = this.name.value

                        if(name) {
                            
                            let uploaded = false;
                            if(typeof this.props.methodToRun == 'string')
                            {   
                                Meteor.call(this.props.methodToRun, name, src, w, h)
                                uploaded = true                           
                                
                            }
                            else if(typeof this.props.methodToRun == 'function'){
                                this.props.methodToRun(src, w, h)
                                uploaded = true
                                
                            }
                            if(uploaded == true) {
                                alert('Uploaded succesfully')
                                this.setState({
                                    src:'',
                                    error:'',
                                    isOpen: false,
                                    name:null,
                                    w:null,
                                    h:null
                                })
                            }                            
                        }                                                                        
                    }}>Submit</button>                
                </div>
            )
        }
        else return null
    }
    
    render() {
        
        return(
            <div>
                <button onClick = {()=>this.setState({isOpen:true})}>Add Simulation</button>        
                <Modal isOpen = {this.state.isOpen} ariaHideApp={false}>
                    <form>
                        <h1>Submit simulation</h1>
                        <p>Enter the Iframe tag from p5 online text editor</p>
                        <input onChange={this.enteredLink.bind(this)} ref = {e => this.sim = e}/>
                        <SimContainer isPreview = {true} {...this.state}/>
                        <div>{this.submitButton()}</div>
                    </form>
                    <button onClick = {()=>this.setState({isOpen:false, src:''})}>Cancel</button>   
                </Modal>
            </div>
        )
    }
}