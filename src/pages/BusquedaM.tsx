import {  Box, Button, Card, CardContent, FormControl, FormControlLabel, FormGroup,  InputLabel, MenuItem, Radio, RadioGroup, Select, SxProps, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import ScreenLoader from "../components/loader/ScreenLoader";
import { SearchFormDataM } from "../interfaces/pages/busqueda/SearchFormDataM";
import { PYMNTMET } from "../interfaces/pages/busqueda/PYMNTMET";
import { NotificationPage } from "../interfaces/messageBar/NotificationPage";
import ErrorNotification from "../components/messageBar/NotificationBar";
const BusquedaM = () => {

    const navigate = useNavigate();
    const [dataLoading, setDataLoading] = useState<boolean>(false);
    const [notifucations,setNotifications]=useState<NotificationPage[]>([]);
    const [payment,setPayment]=useState<PYMNTMET[]>([]);

    const handleCloseNotification=(index:number)=>{
        const notUpdated=[...notifucations];
        notUpdated[index].active=false;
        setNotifications(notUpdated)
    }

    useEffect(()=>{
        axios.get<PYMNTMET[]>("/PYMNTMET.json")
        .then((data:AxiosResponse<PYMNTMET[]>)=>{
            setPayment(data.data);                        
                     
        })        
        .catch((e)=>{
            console.error(e);
            const err:NotificationPage={
                active:true,
                message:"Error Fetching Payment methods",
                type:"error"
            }
            setNotifications((prev)=>([...prev,err]));
        })
    },[])

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
    const initialSearchValues: SearchFormDataM = {
        status: "",
        typeOfBusinessIs: ""
    }
    const [searchValues, setSearchValues] = useState<SearchFormDataM>(initialSearchValues)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("form submit", searchValues)
        setDataLoading(true)
        try {
            const res = await axios.get("/bandejaE.json")
            let data = res.data
            data = [];
            // const data = res.data

            if (data && data.length > 0) {
                navigate("/busquedaresultados", { state: { searchResults: data } });
            } else {
                // navigate("/busquedaresultados", { state: { searchResults: [] } });
                // setSearchDataOk(false);
                setNotifications((prev)=>([
                    ...prev,
                    {
                        active:true,
                        message:"No Results",
                        type:"info"
                    }
                ]))
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

    const handleDateChange = (newDate: Dayjs | null, name: keyof SearchFormDataM) => {
        if (newDate) {
            setSearchValues((prev) => (
                {
                    ...prev,
                    [name]: newDate.toDate()
                }
            ))
        }
    }

    // const handleCloseSearchDataOk = () => {
    //     setSearchDataOk(true);
    // }

    return (
        <Box p={3}>
            <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} p={2}>               
                <ErrorNotification notification={notifucations} onClose={handleCloseNotification} />

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
                                                                    value={searchValues['typeOfBusinessIs']}
                                                                    name="typeOfBusinessIs"
                                                                    onChange={handleChange}>
                                                                    <FormControlLabel value="NB" control={<Radio />}
                                                                        label="Nuevo Negocio" />
                                                                    <FormControlLabel value="IN" control={<Radio />}
                                                                        label="Incremento" />
                                                                    <FormControlLabel value="IC" control={<Radio />}
                                                                        label="Inclusiones" />
                                                                    <FormControlLabel value="" control={<Radio />}
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
                                                                    value={searchValues['status']}
                                                                    name="status"
                                                                    onChange={handleChange}
                                                                >
                                                                    <FormControlLabel value="gblbk31" control={<Radio />} label="Pendiente de Suscripción Manual" />
                                                                    <FormControlLabel value="gblbk32" control={<Radio />} label="Completado" />
                                                                    <FormControlLabel value="" control={<Radio />} label="Todos" />
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
                                                                                value={searchValues['gender'] || ""}
                                                                                name="gender"
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
                                                                            name="ownerPaternalLastName"
                                                                            margin="dense"
                                                                            label="Apellido Paterno"
                                                                            value={searchValues['ownerPaternalLastName'] || ""}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid container m={2} p={1} spacing={2}>
                                                                    <Grid size={{ xs: 12 }}>
                                                                        <TextField
                                                                            sx={inputsTextSX}
                                                                            type="text"
                                                                            name="ownerMaternalLastName"
                                                                            margin="dense"
                                                                            label="Apellido Materno"
                                                                            value={searchValues["ownerMaternalLastName"] || ""}
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
                                                                            name="insuredPaternalLastName"
                                                                            margin="dense"
                                                                            label="Apellido Paterno"
                                                                            onChange={handleChange}
                                                                            value={searchValues["insuredPaternalLastName"] || ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid container p={1} spacing={2}>
                                                                    <Grid size={{ xs: 12 }}>
                                                                        <TextField
                                                                            sx={inputsTextSX}
                                                                            type="text"
                                                                            name="insuredMaternalLastName"
                                                                            margin="dense"
                                                                            label="Apellido Materno"
                                                                            onChange={handleChange}
                                                                            value={searchValues["insuredMaternalLastName"] || ""}
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
                                                                                name="dteOfBirthBefore"
                                                                                onChange={(newDate: Dayjs | null) => handleDateChange(newDate, "dteOfBirthBefore")}
                                                                                format="DD/MM/YYYY"
                                                                                sx={inputsTextSX}
                                                                                value={searchValues["dteOfBirthBefore"] ? dayjs(searchValues["dteOfBirthBefore"]) : null}
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
                                                                                name="dteOfBirthAfter"
                                                                                onChange={(newDate: Dayjs | null) => handleDateChange(newDate, 'dteOfBirthAfter')}
                                                                                format="DD/MM/YYYY"
                                                                                sx={inputsTextSX}
                                                                                value={searchValues["dteOfBirthAfter"] ? dayjs(searchValues['dteOfBirthAfter']) : null}
                                                                            />
                                                                        </LocalizationProvider>
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid container spacing={2} p={1}>
                                                                    <Grid size={{ xs: 12 }}>
                                                                        <TextField
                                                                            sx={{ ...inputsTextSX, width: '50%' }}
                                                                            type="text"
                                                                            name="policyNumber"
                                                                            margin="dense"
                                                                            onChange={handleChange}
                                                                            label="Folio de Control (FDC)"
                                                                            value={searchValues["policyNumber"] || ""}
                                                                        />
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid container spacing={2} p={1}>
                                                                    <Grid size={{ xs: 12 }}>
                                                                        <FormControl sx={{ width: "45%" }}>
                                                                            <InputLabel>Conducto de cobro</InputLabel>
                                                                            <Select
                                                                                label="Conducto de cobro"
                                                                                value={searchValues["paymentMethod"] || ""}
                                                                                name="paymentMethod"
                                                                                onChange={(e) => handleSelectChange(e as ChangeEvent<{ value: unknown }>, e.target.name)}>
                                                                                {/* <MenuItem value="nomina">Descuento por nomina</MenuItem>
                                                                                <MenuItem value="efectivo">Efectivo</MenuItem>
                                                                                <MenuItem value="tarjetaC">Tarjeta de Credito</MenuItem> */}
                                                                                {payment.map((pay)=>(
                                                                                    <MenuItem key={pay.strCode} value={pay.strDesc}>{pay.strDesc}</MenuItem>
                                                                                ))}
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
                                                                                name="dteOfAppBefore"
                                                                                onChange={(newDate: Dayjs | null) => handleDateChange(newDate, 'dteOfAppBefore')}
                                                                                format="DD/MM/YYYY"
                                                                                sx={inputsTextSX}
                                                                                value={searchValues["dteOfAppBefore"] ? dayjs(searchValues['dteOfAppBefore']) : null}
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
                                                                                name="dteOfAppAfter"
                                                                                onChange={(newDate: Dayjs | null) => handleDateChange(newDate, 'dteOfAppAfter')}
                                                                                format="DD/MM/YYYY"
                                                                                sx={inputsTextSX}
                                                                                value={searchValues["dteOfAppAfter"] ? dayjs(searchValues['dteOfAppAfter']) : null}
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