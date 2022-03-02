import slugify from 'slugify'
import Link from 'next/link'
import { 
    Box,
    Chip,
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
                    {
                        products.length >= 1
                        ? `Foram encontrados ${products.length} anúncios`
                        : `Não foram encontrados anúncios`                       
                    }   
                </Typography>
                <Chip label={searchTerm} />

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
    const { q, sigla } = query

    if (sigla == undefined) {
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
    } else{
        const products = await ProductsModel.find({ 'user.uf': q }) 
        return{
            props: {
                products: JSON.parse(JSON.stringify(products)),
                searchTerm: sigla,
            }
        } 
    } 

   
}

export default List