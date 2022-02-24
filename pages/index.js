import Link from 'next/link'
import slugify from 'slugify'
import {
    Container, 
    Grid,
    Typography,
} from '@mui/material'

import TemplateDefault from '../src/templates/Defaut'
import Card from '../src/components/Card'
import dbConnect from '../src/utils/dbConnect'
import ProductsModel from '../src/models/products'
import { formatCurrency } from '../src/utils/currency'
import InputSearch from '../src/components/InputSearch'

const Home = ({ products }) => {

    return(
        <TemplateDefault>
            <Container maxWidth='md'>
                <Typography component='h1' variant='h3' align='center' color='textPrimary'>
                    O que deseja encontrar?
                </Typography>
                
                <InputSearch />

            </Container>

            <Container maxWidth='lg' sx={{ paddingTop: 8 }}>
                
                <Typography component='h2' variant='h4' align='Left' color='textPrimary'>
                    Anúncios recentes
                </Typography>
                <br />
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
            </Container>
        </TemplateDefault>
    )
}

export async function getServerSideProps() {
    
    await dbConnect()

    const products = await ProductsModel.aggregate([{
        $sample: { size: 6 }
    }])

    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        }
    }

}

export default Home