import { Box } from '@mui/material'

import Header from '../components/Header'
import Footer from '../components/Footer'
import theme from '../theme'

const Defalut = ({ children }) => {
    return(
        <>
            <Header />
                <Box sx={{
                        padding: theme.spacing(6,0,6),
                    }}
                >
                    {children}
                </Box>
            <Footer />
        </>
    )
}

export default Defalut