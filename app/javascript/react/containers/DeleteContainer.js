import DeleteIcon from '@material-ui/icons/Delete'

import React from 'react'

const DeleteContainer = (props) => {
  let deleteObjectId = () => {
    props.deleteMethod(props.deleteId)
  }
  return(
    <div>
      <DeleteIcon onClick={deleteObjectId} />
    </div>
  )
}
export default DeleteContainer
