import { ChangeEvent, FC, useEffect, useState } from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { CatalogoMaster } from "../interfaces/pages/catalogGeneral/CatalogMaster";
import axios from "axios";
import { CatalogoMasterResult } from "../interfaces/pages/catalogGeneral/CatalogMasterResult";
import ScreenLoader from "../loader/ScreenLoader";
import { CatalogData } from "../interfaces/pages/catalogGeneral/CatalogData";
import { CatalogDataResponse } from "../interfaces/pages/catalogGeneral/CatalogDataResponse";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ModalFormField } from "../types/ModalFormField";
import EditFormModal from "../modals/EditFormModal";
import EmptyFormModal from "../modals/EmptyFormModal";
const GeneralCatalog: FC = () => {

    const [catalogMaster, setCatalogMaster] = useState<Partial<CatalogoMaster[]>>([]);
    const [dataLoading, setdataLoading] = useState<boolean>(true);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [catalogData, setCatalogData] = useState<CatalogData[]>([]);
    const [originalCatalogData, setOriginalCatalogData] = useState<CatalogData[]>([])
    const [selectedValueJson, setSelectedValueJson] = useState({});

    const fetchMasterCatalog = async () => {
        try {
            const res = await axios.get<CatalogoMasterResult>("/catalogoMaster.json");
            if (res.status < 400 && res.data.resultObject) {
                setCatalogMaster(res.data.resultObject);
            }
        } catch (error) {
            console.error("Error fetching data", error)
        }
        finally {
            setdataLoading(false)
        }

    }

    useEffect(() => {
        fetchMasterCatalog()
    }, [])

    const handleSelectChange = (e: ChangeEvent<{ value: unknown }>) => {
        const value = e.target.value as string;
        setSelectedValue(value);
    }

    const fetchCatalogData = async (categorie: string) => {
        try {
            const res = await axios.get<CatalogDataResponse>(`/${categorie}.json`);
            setOriginalCatalogData(res.data.result)
            setCatalogData(res.data.result);


        } catch (error) {
            console.error("Error fetching catalog data", error);
        } finally {
            setdataLoading(false)
        }

    }
    useEffect(() => {
        if (selectedValue !== "") {
            setdataLoading(true);
            const selectedJson = catalogMaster.find((object) => object?.name === selectedValue)
            setSelectedValueJson({ 'description': selectedJson?.description })
            setTimeout(() => {
                fetchCatalogData(selectedValue);
            }, 500)

        }
    }, [catalogMaster, selectedValue])


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1, headerClassName: 'text-centered', cellClassName: 'text-centered' },
        {
            field: 'nombre', headerName: 'Nombre', flex: 2, headerClassName: 'text-centered', cellClassName: 'text-centered',
            renderHeader: () => (
                <div className="d-flex flex-column align-items-center w-100">
                    <span className="text-center mb-2">Nombre</span>
                    <TextField
                        label="Filter by Name"
                        variant="outlined"
                        size="small"
                        onChange={(e) => handleFilterChange('nombre', e.target.value)}
                        style={{ flex: 2, marginRight: '10px' }}
                        fullWidth
                        className="w-100"
                    />
                </div>
            )
        },
        {
            field: 'statusElement', headerName: 'Estatus', flex: 3, headerClassName: 'text-centered', cellClassName: 'text-centered',
            renderHeader: () => (
                <div className="d-flex flex-column align-items-center w-100">
                    <span className="text-center mb-2">Estatus</span>
                    <TextField
                        label="Filter by Estatus"
                        variant="outlined"
                        size="small"

                        onChange={(e) => handleFilterChange('statusElement', e.target.value)}
                        style={{ flex: 3 }}
                    />
                </div>
            )
        },
        {
            field: 'actions', headerName: 'Editar', flex: 1, sortable: false, headerClassName: 'text-centered', cellClassName: 'text-centered',
            renderCell: (params) => (
                <a style={{ cursor: 'pointer' }} className="text-center">                    
                    <ModeEditIcon onClick={() => handleClickEditCatalogModal(params.row.id)} />
                </a>
            )
        },
    ]

    const paginationModel = { page: 0, pageSize: 25 };

    //Modal Edit Categoria
    const [editCategorieModalOpen, setEditCategorieModalOpen] = useState<boolean>(false);
    const editCategorieModalFormFields: ModalFormField[] = [
        { name: 'description', label: 'Descripción', type: 'text' }
    ];

    const handleClickEditCategorieModal = () => {
        setEditCategorieModalOpen(true);
    }
    const handleEditCategorieModalSubmit = (formData: { [key: string]: string | number | boolean }) => {
        console.log(formData);
    }

    //Modal Edit Catalogo
    const [editCatalogModalOpen, setEditCatalogModalOpen] = useState<boolean>(false);
    const [editCatalogModalValue, setEditCatalogModalValue] = useState({});
    const editCatalogModalFormFields: ModalFormField[] = [
        { name: 'nombre', label: 'Descripción', type: 'text' },
        {
            name: 'statusElement', label: 'Estatus', type: 'select', options: [
                { value: 'ACTIVO', label: 'ACTIVO' },
                { value: 'INACTIVO', label: 'INACTIVO' },
            ]
        },
    ];

    const handleClickEditCatalogModal = (id: string) => {
        const catalog = catalogData.find((ctlg) => ctlg.id === id);
        if (catalog !== undefined) {
            setEditCatalogModalValue(catalog);
        }

        setEditCatalogModalOpen(true);

    }
    const handleEditCatalogModalSubmit = (formData: { [key: string]: string | number | boolean }) => {
        console.log(formData);

    }

    //Create Catalog Modal

    const [createCatalogModalOpen, setCreateCatalogModalOpen] = useState<boolean>(false);
    const createCatalogModalFormFields: ModalFormField[] = [
        { name: 'nombre', label: 'Descripción', type: 'text' },
    ];

    const handleClickAddCatalogModal = () => {
        setCreateCatalogModalOpen(true);
    }
    const handleCreateCatalogModalSubmit = (formData: { [key: string]: string | number | boolean }) => {
        console.log(formData);
    }



    //Table form inputs

    const [tableFilters, setTableFilters] = useState({ nombre: '', statusElement: '' })
    const handleFilterChange = (field: string, value: string) => {
        setTableFilters((prev) => ({
            ...prev,
            [field]: value
        }))
        const filteredRows = originalCatalogData.filter((row) => {
            return (
                row.nombre.toLowerCase().includes(tableFilters.nombre.toLowerCase()) &&
                row.statusElement.toLocaleLowerCase().includes(tableFilters.statusElement.toLowerCase())
            );
        })
        if (value === '') {
            setCatalogData(originalCatalogData);
        } else {
            setCatalogData(filteredRows);
        }

    }



    return (
        <div className="container-fluid">
            <h1>Select General Page</h1>
            <div className="d-flex p-2 justify-content-center">
                <div className="card w-100">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 ms-3">
                                <fieldset className="form-group">
                                    <label>Cat&aacute;logos</label><br />
                                </fieldset>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                {!dataLoading && (
                                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                                        <InputLabel>Catálogos</InputLabel>
                                        <Select value={selectedValue}
                                            onChange={(e) => handleSelectChange(e as ChangeEvent<{ value: unknown }>)}
                                        >
                                            {catalogMaster.map((catalogCategorie) => (
                                                <MenuItem key={catalogCategorie!.id} value={catalogCategorie!.name}>{catalogCategorie!.description}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}

                            </div>
                            <div className="col-sm-4 d-flex align-items-center">
                                <a style={{ cursor: 'pointer' }} className="text-center">
                                    <ModeEditIcon onClick={handleClickEditCategorieModal} style={{ marginRight: '3px' }} />

                                </a>
                                <span>Editar</span>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12 d-flex justify-content-end">
                                <a style={{ cursor: 'pointer' }} className="text-center">
                                    <AddIcon sx={{ fontSize: '30px' }} onClick={handleClickAddCatalogModal} />
                                </a>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-12 w-100 bg-primary d-flex justify-content-center text-light text-center" style={{ minHeight: '35px' }}>
                                <span className="align-middle">Catalog name here</span>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                {/* <TextField
                                    label="Filter by Name"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => handleFilterChange('nombre', e.target.value)}
                                    style={{ flex: 2, marginRight: '10px' }}
                                /> */}
                            </div>
                            <div className="col-6">

                                {/* <TextField
                                    label="Filter by Estatus"
                                    variant="outlined"
                                    size="small"

                                    onChange={(e) => handleFilterChange('statusElement', e.target.value)}
                                    style={{ flex: 3 }}
                                /> */}
                            </div>
                        </div>
                        <div className="row">
                            {catalogData.length > 0 && (
                                <Paper sx={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={catalogData}
                                        columns={columns}
                                        initialState={{ pagination: { paginationModel } }}
                                        pageSizeOptions={[10, 25, 50, 100]}
                                        columnHeaderHeight={80}
                                    />
                                </Paper>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ScreenLoader loading={dataLoading} />
            <EditFormModal
                isOpen={editCategorieModalOpen}
                onClose={() => setEditCategorieModalOpen(false)}
                formFields={editCategorieModalFormFields}
                editValues={selectedValueJson}
                formTitle="Editar nombre del Catàlogo"
                onSubmit={handleEditCategorieModalSubmit}
            />
            <EditFormModal
                isOpen={editCatalogModalOpen}
                onClose={() => setEditCatalogModalOpen(false)}
                formFields={editCatalogModalFormFields}
                editValues={editCatalogModalValue}
                formTitle="Editar Elemento"
                onSubmit={handleEditCatalogModalSubmit}
            />
            <EmptyFormModal
                isOpen={createCatalogModalOpen}
                onClose={() => setCreateCatalogModalOpen(false)}
                formFields={createCatalogModalFormFields}
                formTitle="Agregar Elemento"
                onSubmit={handleCreateCatalogModalSubmit}
            />


        </div>

    )

}
export default GeneralCatalog;