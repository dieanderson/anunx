import { useState } from 'react'
import { useRouter } from 'next/router'
import { 
    IconButton, 
    InputBase, 
    Paper, 
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'

const InputSearch = () => {
    const [search, setSearch] = useState()
    const router = useRouter()
    
    const handleSubmitSearch = (e) => {
        e.preventDefault()
        router.push({
            pathname: `/search/${search}`,
        })
    }

    return(

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

    )
}

export default InputSearch