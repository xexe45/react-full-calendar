export const CalendarEvent = ({eventInfo}) => {
     return(
    <>
      <b>{eventInfo.timeText}</b>
      <span style={{marginLeft: '4px'}}>{eventInfo.event.title}</span> - 
       <span style={{marginLeft: '4px'}}>{eventInfo.event.extendedProps.user}</span>
    </>
  )
}