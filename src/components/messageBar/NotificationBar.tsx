import { FC, useEffect, useState } from "react";
import { NotificationBarProps } from "../../interfaces/messageBar/NotificationBarProps";
import { Alert, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"
import Grid from "@mui/material/Grid2";
import { NotificationPage } from "../../interfaces/messageBar/NotificationPage";

const NotificationBar: FC<NotificationBarProps> = ({
    notification,
    onClose
}) => {
    const [notState,setNotState] = useState<NotificationPage[]>([]);
    useEffect(()=>{
        setNotState(notification)
    },[notification])
    return (
        <Box width={"100%"} m={2}>
            {notState.map((noti, index) => (
                noti.active && (
                    <Grid key={index} size={{ xs: 12 }}>
                        <Alert variant="filled" severity={noti.type}
                            action={
                                <IconButton
                                    color="inherit"
                                    size="small"
                                    onClick={() => onClose(index)}>
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }>
                            {noti.message}
                        </Alert>
                    </Grid>
                )
            ))}
            <br />
        </Box>
    )
}

export default NotificationBar;