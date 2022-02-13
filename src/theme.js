import { createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            contrastText: 'white',
        },
        background: {
            default: 'rgb(242, 244, 245)',
            white: '#ffffff',
        },
    }
})

export default theme