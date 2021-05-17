import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';



function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');


    useEffect(() => {
        fetchTrainings();
    }, []);

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }
    
    const deleteTraining = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fetchTrainings();
                        setMsg('Training deleted');
                        openSnackBar();
                    }
                    else {
                        alert('something went wrong in deletion');
                    }
                })
                .catch(err => console.error(err))
        }
    }

    const columns = [
        {
        field: 'date', sortable: true, filter: true,
        valueFormatter: function (params){
            return moment (params.value).format ('DD-MM-YYYY');
        }}, 
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },  
        { field: 'customer.firstname',sortable: true, filter: true },
        { field: 'customer.lastname', sortable: true, filter: true },
        {
            headerName: '',
            field: 'id',
            width: 100,
            cellRendererFramework: params =>
                <IconButton color="secondary" onClick={() => deleteTraining(params.value)}>
                    <DeleteIcon />
                </IconButton>
        },
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
            <Snackbar 
                open={open}
                autoHideDuration={3000}
                message={msg}
                onClose={closeSnackBar}
            />
        </div>
    )

}

export default Traininglist;
