import { 
    Avatar,
    Box,
    Card,
    CardHeader,
    CardMedia,
    Chip,
    Container, 
    Grid,
    Slide,
    Typography, 
} from '@mui/material'
import Carousel from 'react-material-ui-carousel'

import TemplateDefault from '../src/templates/Defaut'
import theme from '../src/theme'

const Product = () => {
    return(
        <TemplateDefault>
            <Container maxWidth='lg'>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Box sx={{
                                backgroundColor: theme.palette.background.white,
                                padding: theme.spacing(3),
                                marginBottom: theme.spacing(3),
                            }}
                        >
                            <Carousel
                                autoPlay={false}
                                animation='slide'
                                navButtonsAlwaysVisible={true}
                                navButtonsProps={{
                                    style: {
                                        color: 'white',
                                    }
                                }} 
                            >
                                <Card sx={{ height: '100%' }}>
                                    <CardMedia sx={{ paddingTop: '56%' }} 
                                        image={'https://source.unsplash.com/random?a=1'}
                                        title='Título da imagem'    
                                    />
                                </Card>
                                <Card sx={{ height: '100%' }}>
                                    <CardMedia sx={{ paddingTop: '56%' }} 
                                        image={'https://source.unsplash.com/random?p=2'}
                                        title='Título da imagem'    
                                    />
                                </Card>
                            </Carousel>
                        </Box>

                        <Box sx={{
                                backgroundColor: theme.palette.background.white,
                                padding: theme.spacing(3),
                                marginBottom: theme.spacing(3),
                            }}
                        >
                            <Typography
                                component='span'
                                variant='caption'
                            >
                                Publicado em 15 de Fevereiro de 2022
                            </Typography>
                            <Typography
                                component='h4'
                                variant='h4'
                                sx={{ margin: '15px 0' }}
                            >
                                Jaguar XE 2.0 D R-Sport Automático 2019
                            </Typography>
                            <Typography
                                component='h4'
                                variant='h4'
                                sx={{ fontWeight: 'bold', marginBottom: '15px' }}
                            >
                                R$ 250.000,00
                            </Typography>
                            <Chip label='Categoria' />
                        </Box>

                        <Box sx={{
                                backgroundColor: theme.palette.background.white,
                                padding: theme.spacing(3),
                                marginBottom: theme.spacing(3),
                            }}
                        >
                            <Typography
                                component='h6'
                                variant='h6'
                            >
                                Descrição
                            </Typography>
                            <Typography
                                component='p'
                                variant='body2'
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nisi et sem semper elementum vel vel magna. Nulla tempor leo scelerisque egestas vestibulum. Nullam sed mi varius, pharetra mauris a, cursus urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur dapibus, lacus vel placerat viverra, lorem dui egestas sapien, et tempus ex arcu quis nulla. Nullam sapien sem, volutpat nec dui ut, blandit porttitor nisl. Nulla facilisi. Sed porta orci at pulvinar pretium.
                            </Typography>
                        </Box>
                    </Grid>                    

                    <Grid item xs={4}>
                        <Card elevation={0} sx={{
                                backgroundColor: theme.palette.background.white,
                                padding: theme.spacing(3),
                                marginBottom: theme.spacing(3),
                            }}
                        >
                            <CardHeader 
                                avatar={<Avatar>D</Avatar>}
                                title='Diego Anderson'
                                subheader='dieanderson@gmail.com'
                            />
                            <CardMedia sx={{ paddingTop: '56%' }}
                                image={'https://source.unsplash.com/random?d=3'}
                                title='Diego Anderson'
                            />
                        </Card>
                        <Box sx={{
                                backgroundColor: theme.palette.background.white,
                                padding: theme.spacing(3),
                                marginBottom: theme.spacing(3),
                                borderRadius: 1,
                            }}
                        >
                            <Typography
                                component='h6'
                                variant='h6'
                            >
                                Localização
                            </Typography>
                        </Box>                        
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export default Product