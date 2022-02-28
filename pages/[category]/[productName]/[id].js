import { useState } from 'react'
import Carousel from 'react-material-ui-carousel'
const { DateTime } = require("luxon")
import { 
    Avatar,
    Box,
    Card,
    CardHeader,
    CardMedia,
    Chip,
    Container, 
    Grid,
    Typography, 
} from '@mui/material'

import TemplateDefault from '../../../src/templates/Defaut'
import theme from '../../../src/theme'
import dbConnect from '../../../src/utils/dbConnect'
import ProductsModel from '../../../src/models/products'
import { formatCurrency } from '../../../src/utils/currency'
import { getUfFromCodUf } from '../../../src/utils/getUfFromCodUf'
import { formatPhoneNumber } from 'react-phone-number-input'

const Product = ({ product }) => {
    const [uf, setUf] = useState()
    
    const data = product.date
    const dateFormated = DateTime.fromISO(data).setLocale('pt').toLocaleString(DateTime.DATETIME_MED)
    
    getUfFromCodUf(product.user.uf)
        .then( resp => {
            setUf(resp)
        })   
    
    return(
        <TemplateDefault>
            <Container maxWidth='lg'>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8} >
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
                                {
                                    product.files.map(file => (
                                        <Card key={file.name} sx={{ height: '100%' }}>
                                            <CardMedia sx={{ paddingTop: '56%' }} 
                                                image={`/uploads/${file.name}`}
                                                title={product.title}    
                                            />
                                        </Card>    
                                    ))
                                }                                
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
                                Publicado em {dateFormated}
                            </Typography>
                            <Typography
                                component='h4'
                                variant='h4'
                                sx={{ margin: '15px 0' }}
                            >
                                {product.title}
                            </Typography>
                            <Typography
                                component='h4'
                                variant='h4'
                                sx={{ fontWeight: 'bold', marginBottom: '15px' }}
                            >
                                {formatCurrency(product.price)}
                            </Typography>
                            <Chip label={product.category} />
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
                                {product.description}
                            </Typography>
                        </Box>
                    </Grid>                    

                    <Grid item xs={12} sm={4}>
                        <Card elevation={0} sx={{
                                backgroundColor: theme.palette.background.white,
                                padding: theme.spacing(3),
                                marginBottom: theme.spacing(3),
                            }}
                        >
                            <Typography
                                component='h6'
                                variant='h6'
                            >
                                Dados do vendedor:
                            </Typography>
                            <CardHeader
                                sx={{pb:1}}                                
                                avatar={
                                    <Avatar src={product.user.image}>
                                        {                                             
                                            product.user.image != 'null' 
                                                ? product.user.image 
                                                : product.user.name[0] 
                                        }
                                    </Avatar>
                                }
                                
                                title={product.user.name}
                                subheader={product.user.email}                         
                            />
                            <Typography component='p' variant="body2" color="text.secondary" sx={{ml:9}}>
                                    { formatPhoneNumber(`+55${product.user.phone}`)}
                                       
                            </Typography>
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
                                mb={2}
                            >
                                Localização
                            </Typography>

                            <Typography
                                component='p'
                                variant='body1'
                            >
                                {product.user.city} / {uf}
                            </Typography>
                        </Box>                        
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export async function getServerSideProps({ query }) {
    const { id } = query

    await dbConnect()

    const product = await ProductsModel.findOne({ _id: id })

    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        }
    }
}

export default Product