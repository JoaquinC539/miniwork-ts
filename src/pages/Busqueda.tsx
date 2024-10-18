import { Alert, Button, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, SxProps, TextField } from "@mui/material";
import { ChangeEvent, FC, FormEvent, useState } from "react";
// import { AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { SearchFormData } from "../interfaces/pages/busqueda/FormData";
import { useNavigate } from "react-router-dom";
import ScreenLoader from "../components/loader/ScreenLoader";
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios";
// import { DatePicker } from "@mui/x-date-pickers";

const Busqueda: FC = () => {

    const navigate = useNavigate();
    const [dataLoading, setDataLoading] = useState<boolean>(false);
    const [searchDataOk, setSearchDataOk] = useState<boolean>(true);

    const cleanButtonSX: SxProps = {
        border: 1,
        borderColor: "#007abc",
        margin: 1
    }

    const searchbuttonSX: SxProps = {
        backgroundColor: "#007abc",
        color: "white",
        margin: 1
    }

    const inputsTextSX: SxProps = {
        '& .MuiInputBase-root': {
            height: '36px',
            padding: '0',
        },
        '& .MuiInputBase-input': {
            padding: '8px',
        }
    }
    const initialSearchValues: SearchFormData = {
        bussinessType: "all",
        requestStatus: "all"
    }
    const [searchValues, setSearchValues] = useState<SearchFormData>(initialSearchValues)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("form submit", searchValues)
        setDataLoading(true)
        try {
            const res = await axios.get("/bandejaE.json")
            // let data = res.data
            // data = [];
            const data = res.data
            
            if (data && data.length > 0) {
                navigate("/busquedaresultados", { state: { searchResults: data } });
            } else {
                // navigate("/busquedaresultados", { state: { searchResults: [] } });
                setSearchDataOk(false);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setDataLoading(false);
        }

    }

    const handleClean = () => {
        console.log("cleaing...")
        setSearchValues(initialSearchValues);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchValues((prevValues) => (
            {
                ...prevValues,
                [name]: value
            }
        ))
    }
    const handleSelectChange = (e: ChangeEvent<{ value: unknown }>, name: string) => {
        setSearchValues((prevValues) => (
            {
                ...prevValues,
                [name]: e.target.value as string
            }
        ))
    }

    const handleDateChange = (newDate: Dayjs | null, name: keyof SearchFormData) => {
        if (newDate) {
            setSearchValues((prev) => (
                {
                    ...prev,
                    [name]: newDate.toDate()
                }
            ))
        }
    }

    const handleCloseSearchDataOk=()=>{
        setSearchDataOk(true);
    }


    return (
        <div className="container-fluid">
            <div className="d-flex p-2 justify-content-center flex-column">
                {!searchDataOk && (
                    <div className="w-100 ">
                        <div className="row m-2">
                            <div className="col-12">
                                <Alert variant="filled" severity="info"
                                action={
                                    <IconButton
                                    color="inherit"
                                    size="small"
                                    onClick={handleCloseSearchDataOk}>
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }>
                                    No results
                                </Alert>
                            </div>
                        </div>
                    </div>
                )}
                <div className="card w-100">
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 d-flex m-2 justify-content-end">
                                    <Button sx={cleanButtonSX} onClick={handleClean}>Limpiar</Button>
                                    <Button type="submit" sx={searchbuttonSX}>Buscar</Button>
                                </div>
                            </div>
                            {/* Citerio de busqueda */}
                            <div className="row m-2">
                                <div className="card">
                                    <div className="card-title col-12 bg-secondary-blue w-100 d-flex justify-content-center text-light text-center" style={{ minHeight: '35px', backgroundColor: "" }}>
                                        <span className="align-middle ">Criterio de busqueda</span>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            {/* Box 1 */}
                                            <div className="col-6">
                                                <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                                    <h5 className="card-title m-2">Tipo de Negocio</h5>
                                                    <hr />
                                                    <div className="card-body" style={{ flexGrow: 1 }}>
                                                        <div className="form-group">
                                                            <FormControl>
                                                                <RadioGroup
                                                                    aria-labelledby="bussinessType"
                                                                    defaultValue="all"
                                                                    value={searchValues['bussinessType']}
                                                                    name="bussinessType"
                                                                    onChange={handleChange}>
                                                                    <FormControlLabel value="newBussiness" control={<Radio />}
                                                                        label="Nuevo Negocio" />
                                                                    <FormControlLabel value="increase" control={<Radio />}
                                                                        label="Incremento" />
                                                                    <FormControlLabel value="include" control={<Radio />}
                                                                        label="Inclusiones" />
                                                                    <FormControlLabel value="all" control={<Radio />}
                                                                        label="Todos" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            {/* Box 2 */}
                                            <div className="col-6">
                                                <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                                    <h5 className="card-title m-2">Estatus de la solicitud</h5>
                                                    <hr />
                                                    <div className="card-body" style={{ flexGrow: 1 }}>
                                                        <div className="form-group">
                                                            <FormControl>
                                                                <RadioGroup
                                                                    aria-labelledby="requestStatus"
                                                                    defaultValue="all"
                                                                    value={searchValues['requestStatus']}
                                                                    name="requestStatus"
                                                                    onChange={handleChange}>
                                                                    <FormControlLabel value="pendingManual" control={<Radio />}
                                                                        label="Pendiente de Suscripción Manual" />
                                                                    <FormControlLabel value="completed" control={<Radio />}
                                                                        label="Completado" />
                                                                    <FormControlLabel value="all" control={<Radio />}
                                                                        label="Todos" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            {/* Otros Criterios */}
                            <div className="row m-2">
                                <div className="card">
                                    <div className="card-title col-12 w-100 bg-secondary-blue d-flex justify-content-center text-light text-center" style={{ minHeight: '35px' }}>
                                        <span className="align-middle ">Otros criterios</span>
                                    </div>
                                    <div className="card-body">
                                        {/* Section */}
                                        <div className="row mb-4">
                                            <div className="col-12">
                                                <div className="card">
                                                    <h6 className="card-title m-2">Titular</h6>
                                                    <hr />
                                                    <div className="card-body">
                                                        <div className="form-group">
                                                            <div className="row m-2 p-1">
                                                                <div className="col-12">
                                                                    <FormControl sx={{ width: "45%" }}>
                                                                        <InputLabel>Genero</InputLabel>
                                                                        <Select
                                                                            value={searchValues['ownerGender'] || ""}
                                                                            name="ownerGender"
                                                                            onChange={(e) => handleSelectChange(e as ChangeEvent<{ value: unknown }>, e.target.name)}>
                                                                            <MenuItem value="male">Masculino</MenuItem>
                                                                            <MenuItem value="female">Femenino</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </div>
                                                            </div>

                                                            <div className="row m-2 p-1">
                                                                <div className="col-12">
                                                                    {/* <InputLabel>Apellido Paterno</InputLabel> */}
                                                                    <TextField
                                                                        sx={inputsTextSX}
                                                                        type="text"
                                                                        name="ownerFatherSurname"
                                                                        margin="dense"
                                                                        label="Apellido Paterno"
                                                                        value={searchValues['ownerFatherSurname'] || ""}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row m-2 p-1">
                                                                <div className="col-12">
                                                                    {/* <InputLabel>Apellido Materno</InputLabel> */}
                                                                    <TextField
                                                                        sx={inputsTextSX}
                                                                        type="text"
                                                                        name="ownerMotherSurname"
                                                                        margin="dense"
                                                                        label="Apellido Materno"
                                                                        value={searchValues["ownerMotherSurname"] || ""}
                                                                        onChange={handleChange}

                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-4">
                                            <div className="col-12">
                                                <div className="card">
                                                    <h6 className="card-title m-2">Asegurado</h6>
                                                    <hr />
                                                    <div className="card-body">
                                                        <div className="form-group">

                                                            <div className="row m-2 p-1">
                                                                <div className="col-12">
                                                                    {/* <InputLabel>Apellido Paterno</InputLabel> */}
                                                                    <TextField
                                                                        sx={inputsTextSX}
                                                                        type="text"
                                                                        name="assuredFatherSurname"
                                                                        margin="dense"
                                                                        label="Apellido Paterno"
                                                                        onChange={handleChange}
                                                                        value={searchValues['assuredFatherSurname'] || ""}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row m-2 p-1">
                                                                <div className="col-12">
                                                                    {/* <InputLabel>Apellido Materno</InputLabel> */}
                                                                    <TextField
                                                                        sx={inputsTextSX}
                                                                        type="text"
                                                                        name="assuredMotherSurname"
                                                                        margin="dense"
                                                                        label="Apellido Materno"
                                                                        onChange={handleChange}
                                                                        value={searchValues['assuredMotherSurname'] || ""}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row m-2 p-1">
                                                                <div className="row mb-2">
                                                                    <div className="col-12">
                                                                        <strong>Fecha de Nacimento:</strong>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-auto">
                                                                        Entre
                                                                    </div>
                                                                    <div className="col-auto">
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <DatePicker
                                                                                label="Fecha Inicial"
                                                                                name="assuredStartBirthDate"
                                                                                onChange={(newDate: Dayjs | null) => handleDateChange(newDate, 'assureStartBirthDate')}
                                                                                format="DD/MM/YYYY"
                                                                                sx={inputsTextSX}
                                                                                value={searchValues['assureStartBirthDate'] ? dayjs(searchValues['assureStartBirthDate']) : null}
                                                                            />
                                                                        </LocalizationProvider>

                                                                    </div>
                                                                    <div className="col-auto">
                                                                        y
                                                                    </div>
                                                                    <div className="col-auto">
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <DatePicker
                                                                                label="Fecha Inicial"
                                                                                name="assuredEndBirthDate"
                                                                                onChange={(newDate: Dayjs | null) => handleDateChange(newDate, 'assureEndBirthDate')}
                                                                                format="DD/MM/YYYY"
                                                                                sx={inputsTextSX}
                                                                                value={searchValues["assureEndBirthDate"] ? dayjs(searchValues['assureEndBirthDate']) : null}
                                                                            />
                                                                        </LocalizationProvider>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="row m-2 p-1">
                                                                <div className="col-12">
                                                                    <TextField
                                                                        sx={{ ...inputsTextSX, width: '50%' }}
                                                                        type="text"
                                                                        name="assuredFolio"
                                                                        margin="dense"
                                                                        onChange={handleChange}
                                                                        label="Folio de Control (FDC)"
                                                                        value={searchValues['assuredFolio'] || ""}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row m-2 p-1">
                                                                <div className="col-12">
                                                                    <FormControl sx={{ width: "45%" }}>
                                                                        <InputLabel>Conducto de cobro</InputLabel>
                                                                        <Select
                                                                            label="Conducto de cobro"
                                                                            value={searchValues['chargeMethod'] || ""}
                                                                            name="chargeMethod"
                                                                            onChange={(e) => handleSelectChange(e as ChangeEvent<{ value: unknown }>, e.target.name)}>
                                                                            <MenuItem value="nomina">Descuento por nomina</MenuItem>
                                                                            <MenuItem value="efectivo">Efectivo</MenuItem>
                                                                            <MenuItem value="tarjetaC">Tarjeta de Credito</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </div>
                                                            </div>

                                                            <div className="row m-2 p-1">
                                                                <div className="row mb-2">
                                                                    <div className="col-12">
                                                                        <strong>Fecha de la Solicitud:</strong>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-auto">
                                                                        Entre
                                                                    </div>
                                                                    <div className="col-auto">
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <DatePicker
                                                                                label="Fecha Inicial"
                                                                                name="requestStartDate"
                                                                                onChange={(newDate: Dayjs | null) => handleDateChange(newDate, 'requestStartDate')}
                                                                                format="DD/MM/YYYY"
                                                                                sx={inputsTextSX}
                                                                                value={searchValues['requestStartDate'] ? dayjs(searchValues['requestStartDate']) : null}
                                                                            />
                                                                        </LocalizationProvider>

                                                                    </div>
                                                                    <div className="col-auto">
                                                                        y
                                                                    </div>
                                                                    <div className="col-auto">
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <DatePicker
                                                                                label="Fecha Inicial"
                                                                                name="requestEndDate"
                                                                                onChange={(newDate: Dayjs | null) => handleDateChange(newDate, 'requestEndDate')}
                                                                                format="DD/MM/YYYY"
                                                                                sx={inputsTextSX}
                                                                                value={searchValues['requestEndDate'] ? dayjs(searchValues['requestEndDate']) : null}
                                                                            />
                                                                        </LocalizationProvider>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 d-flex m-2 justify-content-end">
                                    <Button sx={cleanButtonSX} onClick={handleClean}>Limpiar</Button>
                                    <Button type="submit" sx={searchbuttonSX}>Buscar</Button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            <ScreenLoader loading={dataLoading} />
        </div>
    )
}
export default Busqueda;