import React, { useState, useContext } from 'react'
import ScheduleInfo from '~components/Account/Place/ScheduleInfo'
import ScheduleForm from '~components/Account/Place/ScheduleForm'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import ScheduleDelete from '~components/Account/Place/ScheduleDelete'

const ScheduleRightContent = ({ isLarge }) => {
  const [showForm, setShowForm] = useState(false)
  const { place, eventsIdToDelete } = useContext(ScheduleContext)

  if (eventsIdToDelete.length > 0 && isLarge) return <ScheduleDelete />

  return (
    <>
      {showForm ? (
        <ScheduleForm place={place} hideForm={() => setShowForm(false)} />
      ) : (
        <ScheduleInfo place={place} showForm={() => setShowForm(true)} />
      )}
    </>
  )
}

export default ScheduleRightContent
