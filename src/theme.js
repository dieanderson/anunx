import { createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            contrastText: 'white',
        },
        secondary: {
            main: '#ffffff',
        },
        background: {
            default: 'rgb(242, 244, 245)',
            white: '#ffffff',
        },
    }
})

export default theme