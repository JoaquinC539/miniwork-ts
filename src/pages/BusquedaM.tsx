import { Alert, Box, Button, Card, CardContent, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, SxProps, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
// import { AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import Grid from "@mui/material/Grid2";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { SearchFormData } from "../interfaces/pages/busqueda/FormData";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios";
import ScreenLoader from "../components/loader/ScreenLoader";
const BusquedaM = () => {

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
    const generalCardSX: SxProps = {

        width: '100%',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxShadow: 'none'

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

    const handleCloseSearchDataOk = () => {
        setSearchDataOk(true);
    }

    return (
        <Box p={3}>
            <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} p={2}>
                {!searchDataOk && (
                    <Box width={'100%'} m={2}>
                        <Grid container m={2}>
                            <Grid size={{ xs: 12 }}>
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
                            </Grid>
                        </Grid>
                    </Box>
                )}
                <Card sx={generalCardSX}>
                    <form onSubmit={handleSubmit}>
                        <CardContent >
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }} display={'flex'} m={0} justifyContent={'end'}>
                                    <Button sx={cleanButtonSX} onClick={handleClean}>Limpiar</Button>
                                    <Button type="submit" sx={searchbuttonSX}>Buscar</Button>
                                </Grid>
                            </Grid>
                            {/* Citerio de busqueda */}
                            <Grid container m={2} spacing={2}>
                                <Card sx={generalCardSX}>
                                    <CardContent>
                                        <Grid container size={{ xs: 12 }} className="bg-secondary-blue" sx={{ width: '100%', textAlign: 'center' }} display={'flex'} minHeight={'35px'} justifyContent={'center'}>
                                            Criterio de busqueda
                                        </Grid>
                                        <Grid container m={1} spacing={2}>
                                            {/* Box 1 */}
                                            <Grid size={{ xs: 6 }}>
                                                <Card sx={{
                                                    display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    boxShadow: 'none'
                                                }}>
                                                    <CardContent>
                                                        <Typography variant="h6" component="h5" sx={{ margin: 2 }}>
                                                            Tipo de Negocio
                                                        </Typography>
                                                        <hr />
                                                        <Box sx={{ flexGrow: 1 }}>
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
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            {/* Box 2 */}
                                            <Grid size={{ xs: 6 }}>
                                                <Card sx={{
                                                    display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    boxShadow: 'none'
                                                }}>
                                                    <CardContent>
                                                        <Typography variant="h6" component="h5" sx={{ margin: 2 }}>
                                                            Estatus de la solicitud
                                                        </Typography>
                                                        <hr />
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <FormControl fullWidth>
                                                                <RadioGroup
                                                                    aria-labelledby="requestStatus"
                                                                    defaultValue="all"
                                                                    value={searchValues['requestStatus']}
                                                                    name="requestStatus"
                                                                    onChange={handleChange}
                                                                >
                                                                    <FormControlLabel value="pendingManual" control={<Radio />} label="Pendiente de Suscripción Manual" />
                                                                    <FormControlLabel value="completed" control={<Radio />} label="Completado" />
                                                                    <FormControlLabel value="all" control={<Radio />} label="Todos" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <br />
                            <br />
                            {/* Otros Criterios */}
                            <Grid container spacing={2} m={2} >
                                <Card sx={generalCardSX}>
                                    <CardContent>
                                        <Grid container size={{ xs: 12 }} className="bg-secondary-blue" sx={{ width: '100%', textAlign: 'center' }} display={'flex'} minHeight={'35px'} justifyContent={'center'}>
                                            Otros criterios
                                        </Grid>
                                        <br />
                                        {/* Section */}
                                        <Grid container spacing={2} mb={4}>
                                            <Grid size={{ xs: 12 }}>
                                                <Card sx={generalCardSX}>
                                                    <CardContent>
                                                        <Grid container>
                                                            <h6>Titular</h6>
                                                        </Grid>
                                                        <hr />
                                                        <Grid container  >
                                                            <FormGroup sx={{ width: '100%' }}>
                                                                <Grid container m={2} p={1} spacing={2}>
                                                                    <Grid size={{ xs: 12 }}>
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
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid container m={2} p={1} spacing={2}>
                                                                    <Grid size={{ xs: 12 }}>
                                                                        <TextField
                                                                            sx={inputsTextSX}
                                                                            type="text"
                                                                            name="ownerFatherSurname"
                                                                            margin="dense"
                                                                            label="Apellido Paterno"
                                                                            value={searchValues['ownerFatherSurname'] || ""}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid container m={2} p={1} spacing={2}>
                                                                    <Grid size={{ xs: 12 }}>
                                                                        <TextField
                                                                            sx={inputsTextSX}
                                                                            type="text"
                                                                            name="ownerMotherSurname"
                                                                            margin="dense"
                                                                            label="Apellido Materno"
                                                                            value={searchValues["ownerMotherSurname"] || ""}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </FormGroup>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                        <br />

                                        {/* Section */}
                                        <Grid container spacing={2} mb={4}>
                                            <Grid size={{ xs: 12 }}>
                                                <Card sx={generalCardSX}>
                                                    <CardContent>
                                                        <Grid container>
                                                            <h6>Asegurado</h6>

                                                        </Grid>
                                                        <hr />
                                                        <Grid container>
                                                            <FormGroup sx={{ width: "100%" }}>
                                                                <Grid container p={1} spacing={2}>
                                                                    <Grid size={{ xs: 12 }}>
                                                                        <TextField
                                                                            sx={inputsTextSX}
                                                                            type="text"
                                                                            name="assuredFatherSurname"
                                                                            margin="dense"
                                                                            label="Apellido Paterno"
                                                                            onChange={handleChange}
                                                                            value={searchValues['assuredFatherSurname'] || ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid container p={1} spacing={2}>
                                                                    <Grid size={{ xs: 12 }}>
                                                                        <TextField
                                                                            sx={inputsTextSX}
                                                                            type="text"
                                                                            name="assuredMotherSurname"
                                                                            margin="dense"
                                                                            label="Apellido Materno"
                                                                            onChange={handleChange}
                                                                            value={searchValues['assuredMotherSurname'] || ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid container p={1} spacing={2}>
                                                                    <Grid container mb={2}>
                                                                        <Grid size={{ xs: 12, md: 12 }}>
                                                                            <strong>Fecha de Nacimento:</strong>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <br />
                                                                </Grid>

                                                                <Grid container spacing={2}>
                                                                    <Grid display={"inline-flex"}>
                                                                        Entre
                                                                    </Grid>
                                                                    <Grid display={"inline-flex"}>
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
                                                                    </Grid>
                                                                    <Grid display={"inline-flex"}>
                                                                        y
                                                                    </Grid>
                                                                    <Grid display={"inline-flex"}>
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
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid container spacing={2} p={1}>
                                                                    <Grid size={{ xs: 12 }}>
                                                                        <TextField
                                                                            sx={{ ...inputsTextSX, width: '50%' }}
                                                                            type="text"
                                                                            name="assuredFolio"
                                                                            margin="dense"
                                                                            onChange={handleChange}
                                                                            label="Folio de Control (FDC)"
                                                                            value={searchValues['assuredFolio'] || ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid container spacing={2} p={1}>
                                                                    <Grid size={{ xs: 12 }}>
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
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid container p={1} spacing={2}>
                                                                    <Grid container mb={2}>
                                                                        <Grid size={{ xs: 12, md: 12 }}>
                                                                            <strong>Fecha de Solicitud:</strong>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <br />
                                                                </Grid>

                                                                <Grid container spacing={2}>
                                                                    <Grid display={"inline-flex"}>
                                                                        Entre
                                                                    </Grid>
                                                                    <Grid display={"inline-flex"}>
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
                                                                    </Grid>
                                                                    <Grid display={"inline-flex"}>
                                                                        y
                                                                    </Grid>
                                                                    <Grid display={"inline-flex"}>
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
                                                                    </Grid>
                                                                </Grid>


                                                            </FormGroup>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }} display={'flex'} m={0} justifyContent={'end'}>
                                    <Button sx={cleanButtonSX} onClick={handleClean}>Limpiar</Button>
                                    <Button type="submit" sx={searchbuttonSX}>Buscar</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </form>
                </Card>
            </Box>
            <ScreenLoader loading={dataLoading} />
        </Box>
    )
}
export default BusquedaM;