import {
    Container, 
    Grid, 
    IconButton, 
    InputBase, 
    Paper, 
    Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import TemplateDefault from '../src/templates/Defaut'
import Card from '../src/components/Card'

const Home = () => {
    return(
        <TemplateDefault>
            <Container maxWidth='md'>
                <Typography component='h1' variant='h3' align='center' color='textPrimary'>
                    O que deseja encontrar?
                </Typography>
                <Paper 
                    component='form' 
                    sx={{ 
                        p: '2px 4px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        mt: 6,
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
            </Container>

            <Container maxWidth='lg' sx={{ paddingTop: 8 }}>
                
                <Typography component='h2' variant='h4' align='Left' color='textPrimary'>
                    Anúncios recentes
                </Typography>
                <br />
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
            </Container>
        </TemplateDefault>
    )
}

export default Home