import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: { 'Content-type': 'application/json'}
        })
        .then(_ => { 
            fetchCustomers()
            setMsg('Customer Added')
            openSnackBar();
        }) 
        .catch(err => console.error(err))
    }

    const updateCustomer = (url, updatedCustomer) => {
        fetch( url, {
            method: 'PUT',
            body: JSON.stringify(updatedCustomer),
            headers: { 'Content-type': 'application/json'}
        })
        .then(_ => {
            fetchCustomers();
            setMsg('Customer Updated');
            openSnackBar();
        })
        .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fetchCustomers();
                        setMsg('Customer deleted');
                        openSnackBar();
                    }
                    else {
                        alert('something went wrong in deletion');
                    }
                })
                .catch(err => console.error(err))
        }
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            body: JSON.stringify(newTraining), //WHAT HERE WHY AM I SO DUMB :<
            headers: { 'Content-type': 'application/json'}
        })
        .then(_ => { 
            fetchCustomers()
            setMsg('Training Added')
            openSnackBar();
        }) 
        .catch(err => console.error(err))
    }

    const columns = [
        { field: 'firstname', sortable: true, filter: true, width: 150},
        { field: 'lastname', sortable: true, filter: true, width: 150 },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true, width: 130},
        { field: 'city', sortable: true, filter: true, width: 130},
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
        {
            headerName: '',
            field: 'links.0.href',
            width: 60,
            cellRendererFramework: params =>
                <EditCustomer link={params.value} customer={params.data} updateCustomer={updateCustomer}/>
        },
        {
            headerName: '',
            field: 'links.0.href',
            width: 60,
            cellRendererFramework: params =>
                <IconButton color="secondary" onClick={() => deleteCustomer(params.value)}>
                    <DeleteIcon />
                </IconButton>
        },
        { 
            headerName: '',
            field: 'links.2.href' && 'links.0.href', 
            width: 170,
            cellRendererFramework: params => 
                <AddTraining 
                    link={params.value} training={params.data} addTraining={addTraining}
                />
         }
    ]

    return (
        <div>
            <AddCustomer addCustomer={addCustomer}/>
            <div className="ag-theme-material" style={{ height: 600, width: '95%', margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
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

export default Customerlist;
