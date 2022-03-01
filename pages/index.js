import Link from 'next/link'
import slugify from 'slugify'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
    Box,
    Container, 
    Grid,
    Typography,
    Chip,
} from '@mui/material'

import TemplateDefault from '../src/templates/Defaut'
import Card from '../src/components/Card'
import dbConnect from '../src/utils/dbConnect'
import ProductsModel from '../src/models/products'
import { formatCurrency } from '../src/utils/currency'
import InputSearch from '../src/components/InputSearch'

const Home = ({ products }) => {
    const [ listUf, setListUf ] = useState([])
    const router = useRouter()

    function loadUf() {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')            
            .then( response => {
                const ufs= response.data.sort((a,b) => a.nome.localeCompare(b.nome))
                setListUf([...ufs])
            })            
    }  

    useEffect(()=>{
        loadUf() 
    }, []) 

    const handleClickUf = () => {

    }

    return(
        <TemplateDefault>
            <Container maxWidth='md'>
                <Typography component='h1' variant='h3' align='center' color='textPrimary'>
                    O que deseja encontrar?
                </Typography>
                
                <InputSearch />

            </Container>

            <Container maxWidth='lg' sx={{ paddingTop: 8 }}>
               
                <Box sx={{backgroundColor:'white', padding: 1, mb: 4, borderRadius: 2}}>
                    <Typography component='h2' variant='h5' align='center' color='textPrimary' marginBottom={1}>
                        Busca por Estado
                    </Typography>
                    <Grid spacing='1px' container direction='row'
                        display='inline' alignItems='center' justifyContent='center'
                    >                        

                        {                                                      
                            listUf.map((a,b) => (                                                  
                                
                                <Grid key={a.id} item display='inline' alignItems='center' justifyContent='center'>
                                   <Chip label={a.sigla} key={a.id} onClick={()=>{                                                
                                                router.push({
                                                    pathname: `/search/uf/${a.id}`,
                                                    query: { uf: a.id, sigla: a.sigla}
                                                })
                                            }
                                        } 
                                   />
                                   
                                </Grid>
                            ))                                                  
                        }                           
                        
                    </Grid>
                    
                </Box>
                
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
        $sample: { size: 8 }
    }])

    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        }
    }

}

export default Home