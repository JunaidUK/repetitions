import React from 'react'

const SignupButton = (props) => {

  let clickHandler = () =>{
    props.addSignUp(props.practiceId)
    }
  return(
    <i onClick={clickHandler}id="add-signup-button" className="fas fa-plus-circle"></i>)
  }

export default SignupButton
