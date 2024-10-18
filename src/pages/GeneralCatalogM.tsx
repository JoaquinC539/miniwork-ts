import { ChangeEvent, useEffect, useState } from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, Card, CardContent, FormControl, FormGroup, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from '@mui/icons-material/Add';
import { CatalogoMaster } from "../interfaces/pages/catalogGeneral/CatalogMaster";
import axios from "axios";
import { CatalogoMasterResult } from "../interfaces/pages/catalogGeneral/CatalogMasterResult";
import ScreenLoader from "../components/loader/ScreenLoader";
import { CatalogData } from "../interfaces/pages/catalogGeneral/CatalogData";
import { CatalogDataResponse } from "../interfaces/pages/catalogGeneral/CatalogDataResponse";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ModalFormField } from "../types/ModalFormField";
import EditFormModal from "../components/modals/EditFormModal";
import EmptyFormModal from "../components/modals/EmptyFormModal";
import { CatalogMasterUpdate } from "../interfaces/pages/catalogGeneral/CatalogMasterUpdate";
import { NewCatalogPayload } from "../interfaces/pages/catalogGeneral/NewCatalogPayload";

const GeneralCatalogM = () => {
    const [catalogMaster, setCatalogMaster] = useState<Partial<CatalogoMaster[]>>([]);
    const [dataLoading, setdataLoading] = useState<boolean>(true);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [catalogData, setCatalogData] = useState<CatalogData[]>([]);
    const [originalCatalogData, setOriginalCatalogData] = useState<CatalogData[]>([])
    const [selectedValueJson, setSelectedValueJson] = useState<{ [key: string]: string | number | boolean }>({});

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
            const selectedJson: CatalogoMaster | undefined = catalogMaster.find((object) => object?.name === selectedValue)
            if (selectedJson !== undefined) {
                // setSelectedValueJson(selectedJson)
                setSelectedValueJson({ 'description': selectedJson?.description })
            }


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
        const catalogMasterFind: CatalogoMaster | undefined = catalogMaster.find((ctlg) => ctlg?.name === selectedValue)
        if (catalogMasterFind !== undefined) {
            catalogMasterFind.description = formData["description"] as string
            const payload: CatalogMasterUpdate = {
                user: 'defaultUser',
                role: 'defaultRole',
                srcApp: 'defaultSrcApp',
                idCatalog: catalogMasterFind.id,
                catalogMaster: catalogMasterFind
            }
            //TODO: Implement send of the payload to service            
            // setdataLoading(true);
            console.log(payload)
        }

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

        //TODO send formdata to the service

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
        const catalogMasterFind: CatalogoMaster | undefined = catalogMaster.find((ctlg) => ctlg?.name === selectedValue)
        if (catalogMasterFind !== undefined) {
            const newCatalog: NewCatalogPayload = {
                username: 'defaultUser',
                role: "defaultRole",
                idCatalog: catalogMasterFind.id.toString(),
                nombre: formData['nombre'] as string
            }
            console.log(newCatalog)
            //TODO: implement send of the create to service
            // setdataLoading(true);

        }
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
        <Box p={3} >
            <Typography variant="h4" gutterBottom>
                Select General Page
            </Typography>
            <Box display="flex" justifyContent="center" mb={2}>
                <Card sx={{
                    width: '100%',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: 'none'
                }}>
                    <CardContent>
                        {/* Row equivalent */}
                        <Grid container spacing={2} >
                            <Grid size={{ xs: 12, md: 3 }}>
                                <FormGroup>
                                    <Typography variant="body1" component="label">
                                        Cat&aacute;logos
                                    </Typography><br />
                                </FormGroup>
                            </Grid>
                        </Grid >

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 3 }}>
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
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', alignItems: 'center' }}>
                                <a style={{ cursor: 'pointer' }} className="color-secondary-blue">
                                    <ModeEditIcon onClick={handleClickEditCategorieModal} style={{ marginRight: '3px' }} />
                                </a>
                                
                                <span>Editar</span>
                            </Grid>
                        </Grid>
                        <hr />
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'end' }}>
                                <a style={{ cursor: 'pointer' }} className="color-secondary-blue">
                                    <AddIcon sx={{ fontSize: '30px' }} onClick={handleClickAddCatalogModal} />
                                </a>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }} sx={{ width: '100%', display: 'flex', justifyContent: 'center', minHeight: '35px', textAlign: 'center' }} className="bg-secondary-blue">
                                <span className="align-middle">{selectedValueJson.description}</span>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={2}>
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
                        </Grid>
                    </CardContent>
                </Card>
            </Box>

            <ScreenLoader loading={dataLoading} />

            <EditFormModal
                isOpen={editCategorieModalOpen}
                onClose={() => setEditCategorieModalOpen(false)}
                formFields={editCategorieModalFormFields}
                editValues={selectedValueJson}
                formTitle="Editar nombre del Catálogo"
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
        </Box>
    );


}

export default GeneralCatalogM;