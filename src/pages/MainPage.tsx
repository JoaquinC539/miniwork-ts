import { ChangeEvent, FC, useEffect, useState } from "react";
import ScreenLoader from "../components/loader/ScreenLoader";
import { FormControl, InputLabel, MenuItem, Select, Paper } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import DataDisplayModal from "../components/modals/DataDisplayModal";
import { SelectOption } from "../interfaces/modals/SelectOption";
import { SectionData } from "../types/SectionData";
import { UserData } from "../interfaces/UserData";

const MainPage:FC=()=>{
    const [dataLoading, setDataLoading] = useState<boolean>(true);
    const [selectValue, setSelectValue] = useState<string>("");
    const [selected, setSelected] = useState<boolean>(false);

    // Select options array
    const catalogSelectValues: SelectOption[] = [
        { value: "rubros", label: "Rubros" },
        { value: "requerimientos", label: "Requerimientos" },
        { value: "requisitos", label: "Requisitos" },
        { value: "tipoDocumento", label: "Tipo de Documento" },
    ];

    const catalogSelectValues2: SelectOption[] = [
        { value: "rubros", label: "Rubros" },
        { value: "requerimientos", label: "Requerimientos" },
        { value: "requisitos", label: "Requisitos" },
        { value: "tipoDocumento", label: "Tipo de Documento" },
    ];

    const handleSelectChange = (e: ChangeEvent<{ value: unknown }>) => {        
        const value = e.target.value as string;
        setSelectValue(value);
        setSelected(true);
    };

    const [tableData, setTableData] = useState<UserData[] |null>();

    const fetchData = async () => {
        try {
            const res:AxiosResponse = await axios.get("https://reqres.in/api/users?page=2");
            setDataLoading(false);
            if (res.status < 400) {
                setTableData(res.data.data);
            } 
        } catch (error) {
            console.error("Error fetching data:", error);
            
        }
    };

    useEffect(() => {        
        fetchData();
        setDataLoading(false);
    }, []);

    
    const paginationModel = { page: 0, pageSize: 3 };

    const columns:GridColDef[]=[
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'first_name', headerName: 'First Name', width: 130 },
        { field: 'last_name', headerName: 'Last Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 70,
            sortable: false,
            renderCell: (params) => (
                <a style={{ cursor: 'pointer' }} className="text-center">
                    <AddIcon onClick={() => handleMoreClick(params.row.id)} />
                </a>
            )
        }
    ]

    //More Data Modal
    const [openMoreModal, setOpenMoreModal] = useState<boolean>(false);
    const [moreModalData, setMoreModalData] = useState<SectionData[]>([]);

    const handleMoreClick=(id:number)=>
        {
            const rowData = tableData?.find((row:UserData) => row.id === id);
            if (rowData !== undefined) {
                const data: SectionData[] = [
                    {
                        title: "Personal Data",
                        type:'text',
                        data: {
                            "First Name": rowData['first_name'],
                            "Last Name": rowData['last_name'],
                            "Email": rowData['email'],
                        }                        
                    },
                    {
                        title:"Other information",
                        type:'text',
                        data:'Other data'
                    },
                    {
                        title:"Table Data example",
                        type:'table',
                        columns:["ID","Payment","Cost Updated"],
                        rows:[
                            {
                                ID:'123456',Payment:"Card","Cost Updated":"$ 14.58"
                            },
                            {
                                ID:'789456',Payment:"Card","Cost Updated":"$ 28.49"
                            }
                        ]
                    }
                ];
                setMoreModalData(data);
            }
    
            setOpenMoreModal(true);
        };

   
    return (
        
        <div className="container-fluid">
            <h1>Select General Page</h1>
            <div className="d-flex p-2 justify-content-center">
                <div className="card w-100">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-12 col-md-3">
                                <fieldset className="form-group">
                                    <label>Select Catalog</label><br />
                                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                                        <InputLabel>Select Catalog</InputLabel>
                                        <Select value={selectValue} onChange={(e)=>handleSelectChange(e as ChangeEvent<{ value: unknown }>)}>
                                            {catalogSelectValues.map((object) => (
                                                <MenuItem key={object.value} value={object.value}>{object.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </fieldset>
                            </div>
                            {selected ? (
                                <div className="col-sm-12 col-md-3">
                                    <fieldset className="form-group">
                                        <label>Select Catalog 2</label><br />
                                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                                            <InputLabel>Select Catalog</InputLabel>
                                            <Select value={selectValue} onChange={(e)=>handleSelectChange(e as ChangeEvent<{ value: unknown }>)}>
                                                {catalogSelectValues2.map((object) => (
                                                    <MenuItem key={object.value} value={object.value}>{object.label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </fieldset>
                                </div>
                            ) : null}
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12">
                                {selected ? (
                                    <div className="row">
                                        <div className="col-12">
                                            {tableData === null ? <p>Error fetching data</p> :
                                                <div>
                                                    <Paper sx={{ height: 400, width: '100%' }}>
                                                        <DataGrid
                                                            rows={tableData}
                                                            columns={columns}
                                                            initialState={{ pagination: { paginationModel } }}
                                                            pageSizeOptions={[3, 5, 10]}
                                                            sx={{ border: 0 }}
                                                        />
                                                    </Paper>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                ) : <div>Not selected</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DataDisplayModal
                isOpen={openMoreModal}
                onClose={() => setOpenMoreModal(false)}
                modalTitle="More Information"
                data={moreModalData}
            />
            <ScreenLoader loading={dataLoading} />
        </div>
    );
    
}
export default MainPage;