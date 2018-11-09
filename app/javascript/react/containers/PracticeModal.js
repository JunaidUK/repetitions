import Modal from 'react-modal';
import React from 'react'
import Button from "@material-ui/core/Button";

import PracticesForm from '../components/PracticesForm'


const practiceFormStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-90%',
    width: '45%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement(document.getElementById('app'))


class PracticeModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      modalIsOpen: false
    };
  this.openModal = this.openModal.bind(this);
  this.afterOpenModal = this.afterOpenModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
 }

 openModal() {
   this.setState({modalIsOpen: true});
 }

 afterOpenModal() {
   // references are now sync'd and can be accessed.
 }

 closeModal() {
   this.setState({modalIsOpen: false});
 }

 render() {
   return (
     <div>
     <Button id="add-practice-button" variant="contained" color="primary" onClick={this.openModal} style={{justifyContent: 'center'}} >
      Add a Practice
     </Button>
       <Modal
         isOpen={this.state.modalIsOpen}
         onAfterOpen={this.afterOpenModal}
         onRequestClose={this.closeModal}
         style={practiceFormStyles}
       >
         <h6>ADD A PRACTICE</h6>
         <PracticesForm
           modalCloseHandler={this.closeModal}
           setPractices={this.props.setPractices}/>
         <button onClick={this.closeModal}>close</button>
       </Modal>
     </div>
   );
 }

}

export default PracticeModal
