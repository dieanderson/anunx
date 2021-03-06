import { Box, Container, Grid, Typography } from "@mui/material"
import Link from "next/link"

import theme from "../theme"

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}        
          Anunx         
        {' '}{new Date().getFullYear()}
        {'.'}
      </Typography>
    )
  }

const Footer = () => {
    return(
        <Container 
            maxWidth='lg' 
            component='footer'
            sx={{
                borderTop: `1px solid ${theme.palette.divider}`,
                paddingTop: theme.spacing(3),
                paddingBottom: theme.spacing(3),
                [theme.breakpoints.up('sm')]:{
                    paddingTop: theme.spacing(6),
                    paddingBottom: theme.spacing(6),    
                }
            }}
        >
            <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                    <Box textAlign='center'>
                        <Link href='#' passHref>
                            <a><Typography color='textSecondary' variant='subtitle1' >Dicas de Segurança</Typography></a>
                        </Link>                       
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box textAlign='center'>
                        <Link href='#' passHref>
                            <a><Typography color='textSecondary' variant='subtitle1' >Dicas de Segurança</Typography></a>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box textAlign='center'>
                        <Link href='#' passHref>
                            <a><Typography color='textSecondary' variant='subtitle1' >Anunciar e Vender</Typography></a>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box textAlign='center'>
                        <Link href='#' passHref>
                            <a><Typography color='textSecondary' variant='subtitle1' >Plano Profissional</Typography></a>
                        </Link>
                    </Box>
                </Grid>
            </Grid>

            <Copyright sx={{ mt: 8, mb: 4 }} />
            
        </Container>
    )
}

export default Footer