import React from 'react'

const EquipmentForm = (props) => {
  return(
    <div>
      <form className="form" id="sports-form">
        <label>
        Add equipment to your profile:
        <input name="equipment" type='text' onChange={props.equipmentChangeHandler}/>
        </label>
        <input id="new-equipment-button" className="button" type="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default EquipmentForm
