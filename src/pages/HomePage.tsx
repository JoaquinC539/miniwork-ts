import { FC, useEffect, useState } from "react";
import axios, { AxiosResponse } from 'axios';
import ScreenLoader from '../loader/ScreenLoader';
import { Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditFormModal from '../modals/EditFormModal';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EmptyFormModal from '../modals/EmptyFormModal';
import { ModalFormField } from "../types/ModalFormField";
import { UserData } from "../interfaces/UserData";

const HomePage: FC = () => {
    const [dataLoading, setDataLoading] = useState<boolean>(false);
    const [tableData, setTableData] = useState<AxiosResponse | null>(null);

    const fetchData = async () => {
        try {
            const res = await axios.get<AxiosResponse>('https://reqres.in/api/users?page=2');
            setDataLoading(false);
            if (res.status < 400) {
                setTableData(res.data);
            } else {
                setTableData(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setTableData(null);
            setDataLoading(false);
        }
    };

    useEffect(() => {
        setDataLoading(true);
        fetchData();
    }, [])

    const columns:GridColDef[]=[
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'first_name', headerName: 'First Name', width: 130 },
        { field: 'last_name', headerName: 'Last Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field:'actions',
            headerName:'Actions',
            width:70,
            sortable:false,
            renderCell:(params) =>(
                <a style={{cursor:'pointer'}} className="text-center">
                    <ModeEditIcon onClick={()=>handleEditClick(params.row.id)} />
                </a>
            ),
        }
    ]

    const paginationModel={page:0,pageSize:3};

    // Edit modal Stuff  
    const [editModalValues,setEditModalValues]=useState<Partial<UserData>> ({})
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    const handleEditClick=(id:number)=>{
        const rowData=tableData?.data.find((row:UserData)=>row.id===id)
        if(rowData){
            setEditModalValues(rowData);
            setEditModalOpen(true);
        }
    };

    const editModalFormFields:ModalFormField[]=[
        {name: 'first_name', label:'First Name', type: 'text',placeholder: 'Enter Last Name'},
        { name: 'last_name', label: 'Last Name', type: 'text', placeholder: 'Enter Last Name' },
        { name: 'email', label: 'Email', type: 'email' },
        {name: 'active', label: 'Active', type: 'select',options:[
            { value: 'true', label: 'Active' },
            { value: 'false', label: 'Inactive' },
        ]}
    ]

    const handleEditSubmit=(formData:Partial<UserData>)=>{
        console.log("Updated Form Data Submit",formData);
    }

    // Create Modal Stuff
    const [createModalOpen,setCreateModalOpen]=useState<boolean>(false);

    const createModalFormFields:ModalFormField[]=[...editModalFormFields];

    const handleCreateClick=()=>{
        setCreateModalOpen(true);
    }
    const handleCreateSubmit=(formData:Partial<UserData>)=>{
        console.log("Created Form Data Submit",formData);
    };

    
    return (
        <div className="container">
          <h1>Table Page</h1>
          <div className="d-flex p-2 justify-content-center">
            <div className="card w-100">
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-end" style={{ cursor: 'pointer' }}>
                      <AddIcon onClick={handleCreateClick} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {tableData === null ? (
                      <p>Error fetching data</p>
                    ) : (
                      <div>
                        <Paper sx={{ height: 400, width: '100%' }}>
                          <DataGrid
                            rows={tableData.data}
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[3, 5, 10]}
                            sx={{ border: 0 }}
                          />
                        </Paper>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EmptyFormModal
            isOpen={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            formTitle={'Create Form Modal'}
            formFields={createModalFormFields}
            onSubmit={handleCreateSubmit}
          />
          <EditFormModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            formTitle={'Edit values'}
            formFields={editModalFormFields}
            editValues={editModalValues}
            onSubmit={handleEditSubmit}
          />
          <ScreenLoader loading={dataLoading} />
        </div>
      );
}
export default HomePage;