import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function MyCalendar() {
    const [trainings, setTrainings] = useState([]);
    const localizer = momentLocalizer(moment);
    
    useEffect(() => {
      getTrainings();
    });

    const getTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const events= trainings.map((training)=>{
      return {
        id: training.id,
        title: training.activity + ' — ' + training.customer.firstname + ' ' + training.customer.lastname,
        start: new Date(training.date),
        end: new Date(new Date(training.date).setMinutes(new Date(training.date).getMinutes() + training.duration)),
        allDay: false
      }
    })

    return (
        <Calendar 
        localizer={localizer}
        events={events}
        defaultDate={new Date()}
        defaultView="month"
        startAccessor='start'
        min={new Date(2021, 0, 1, 8, 0)}
        max={new Date(2021, 0, 1, 22, 0)}
        endAccessor='end'
        style={{height: 550}}
        />)
}

export default MyCalendar;
