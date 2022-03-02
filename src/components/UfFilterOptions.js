import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { 
    Box, 
    Chip, 
    Grid, 
    Typography 
} from "@mui/material"

const UfFilterOptions = () => {
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

    return(

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
                                            pathname: `/search/${a.id}`,
                                            query: { sigla: a.sigla }
                                        })
                                    }
                                } 
                            />
                            
                        </Grid>
                    ))                                                  
                }                           
                
            </Grid>
            
        </Box>

    )
}

export default UfFilterOptions