import slugify from 'slugify'
import Link from 'next/link'
import { 
    Box,
    Container, 
    Grid,
    Typography,
} from '@mui/material'

import TemplateDefault from '../../src/templates/Defaut'
import Card from '../../src/components/Card'
import theme from '../../src/theme'
import ProductsModel from '../../src/models/products'
import { formatCurrency } from '../../src/utils/currency'
import InputSearch from '../../src/components/InputSearch'

const List = ({ products, searchTerm }) => {
    
    return(
        <TemplateDefault>
            <Container maxWidth='lg'>

           <InputSearch />

            <Box sx={{
                    backgroundColor: theme.palette.background.white,
                    padding: theme.spacing(3),
                    marginBottom: theme.spacing(3),
                    borderRadius: 1,
                    marginTop: 5,
                }}
            >
                <Typography component='h6' variant='h6' align='Left' color='textPrimary'>
                    Anúncios
                </Typography>
                <Typography component='span' variant='subtitle2' align='Left' color='textPrimary'>
                    {
                        products.length >= 1
                        ? `Encontrados ${products.length} anúncios para o termo: ${searchTerm}`
                        : `Não foram encontrados anúncios para o termo: ${searchTerm}`                       
                    }   
                </Typography>

                <br /><br />

                <Grid container spacing={4}>                    
                    {
                        products.map(product => {
                            const category = slugify(product.category).toLowerCase()
                            const title = slugify(product.title).toLowerCase()

                            return(
                                <Grid key={product._id} item xs={12} sm={6} md={3}>
                                    <Link href={`/${category}/${title}/${product._id}`}>
                                        <a>
                                            <Card               
                                                image={`/uploads/${product.files[0].name}`}
                                                title={product.title}
                                                subtitle={formatCurrency(product.price)}
                                            />
                                        </a>
                                    </Link>
                                </Grid>    
                            )
                        })
                    } 
                </Grid>

            </Box>
            </Container>
        </TemplateDefault>
    )
}

export async function getServerSideProps({ query }) {
    const { q } = query

    const products = await ProductsModel.find({
        $or: [
            { 
                title: {
                    $regex: q,
                    $options: 'i',
                } 
            },
            { 
                description: {
                    $regex: q,
                    $options: 'i',
                } 
            },
        ]
    })

    return{
        props: {
            products: JSON.parse(JSON.stringify(products)),
            searchTerm: q,
        }
    }
}

export default List