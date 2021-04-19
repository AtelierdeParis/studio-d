import React, { useState, useContext, useMemo } from 'react'
import ScheduleInfo from '~components/Account/Place/ScheduleInfo'
import ScheduleForm from '~components/Account/Place/ScheduleForm'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import ScheduleDelete from '~components/Account/Place/ScheduleDelete'

const ScheduleRightContent = () => {
  const [showForm, setShowForm] = useState(false)
  const { place, eventsIdToDelete, setToDelete } = useContext(ScheduleContext)
  const dispoToDelete = useMemo(
    () =>
      eventsIdToDelete.map((eventId) => {
        const event = place?.disponibilities.find(
          (dispo) => dispo.id === eventId,
        )
        return event
      }),
    [eventsIdToDelete, place?.disponibilities],
  )

  if (dispoToDelete.length > 0)
    return (
      <ScheduleDelete
        disponibilities={dispoToDelete}
        onClose={() => setToDelete([])}
      />
    )

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
