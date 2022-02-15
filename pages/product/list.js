import { 
    Box,
    Container, 
    Grid, 
    IconButton, 
    InputBase, 
    Paper,
    Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import TemplateDefault from '../../src/templates/Defaut'
import Card from '../../src/components/Card'
import theme from '../../src/theme'

const List = () => {
    return(
        <TemplateDefault>
            <Container maxWidth='lg'>

            <Paper 
                component='form' 
                sx={{ 
                    p: '2px 4px', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }} 
                    placeholder='Ex: mesa de cozinha com 6 cadeiras'
                    inputProps={{'aria-label': 'Ex: mesa de cozinha com 6 cadeiras'}}
                    fullWidth
                />
                <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
                    <SearchIcon />
                </IconButton>
            </Paper>

            <Box sx={{
                    backgroundColor: theme.palette.background.white,
                    padding: theme.spacing(3),
                    marginBottom: theme.spacing(3),
                    borderRadius: 1,
                }}
            >
                <Typography component='h6' variant='h6' align='Left' color='textPrimary'>
                    Anúncios
                </Typography>
                <Typography component='span' variant='subtitle2' align='Left' color='textPrimary'>
                    Encontrados 5 anúncios
                </Typography>
                <br /><br />
                <Grid container spacing={4}>                    
                    <Grid item xs={12} sm={6} md={3}>
                        <Card               
                            image={'https://source.unsplash.com/random'}
                            title='Produto X'
                            subtitle='60,00'
                            actions={false}  
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card               
                            image={'https://source.unsplash.com/random'}
                            title='Produto X'
                            subtitle='60,00'
                            actions={false}  
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card               
                            image={'https://source.unsplash.com/random'}
                            title='Produto X'
                            subtitle='60,00'
                            actions={false}  
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card               
                            image={'https://source.unsplash.com/random'}
                            title='Produto X'
                            subtitle='60,00'
                            actions={false}  
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card               
                            image={'https://source.unsplash.com/random'}
                            title='Produto X'
                            subtitle='60,00'
                            actions={false}  
                        />
                    </Grid>
                </Grid>


            </Box>
            </Container>
        </TemplateDefault>
    )
}

export default List