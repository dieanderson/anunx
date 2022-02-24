import Link from 'next/link'
import slugify from 'slugify'
import { useState } from 'react'
import { useRouter } from 'next/router'
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
import dbConnect from '../src/utils/dbConnect'
import ProductsModel from '../src/models/products'
import { formatCurrency } from '../src/utils/currency'

const Home = ({ products }) => {
    
    const [search, setSearch] = useState()
    const router = useRouter()
    
    const handleSubmitSearch = (e) => {
        e.preventDefault()
        router.push({
            pathname: `/search/${search}`,
        })
    }

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
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ ml: 1, flex: 1 }} 
                        placeholder='Ex: mesa de cozinha com 6 cadeiras'                        
                        fullWidth
                    />
                    <IconButton onClick={handleSubmitSearch} type='submit' sx={{ p: '10px' }} aria-label='search'>
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