import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';



function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    //TODO HOW TO DEAL FETCHING TRAININGS? WITH GET METHOD?

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const columns = [
        {
        field: 'date', sortable: true, filter: true,
        valueFormatter: function (params){
            return moment (params.value).format ('DD-MM-YYYY');
        }}, 
        {field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        { field: 'customer.firstname', sortable: true, filter: true },
        { field: 'customer.lastname', sortable: true, filter: true }
    ]

    return (
        <div>
            <div className="ag-theme-material" style={{ height: 600, width: '95%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={8}
                    floatingFilter={true}
                    suppressCellSelection={true}
                />
            </div>
        </div>
    )

}

export default Traininglist;
