import slugify from 'slugify'
import Link from 'next/link'
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
import ProductsModel from '../../src/models/products'
import { formatCurrency } from '../../src/utils/currency'

const List = ({ products, searchTerm }) => {
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