import { 
    Box, 
    IconButton, 
    Typography,
} from '@mui/material'

import { DeleteForever } from '@mui/icons-material'

import { useDropzone } from 'react-dropzone'

import styles from '../../styles/publish.module.css'
import theme from '../../src/theme'


const FileUpload = ({ files, errors, touched, setFieldValue }) => {

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFile) => {
            const newFiles = acceptedFile.map(file => {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            })
            setFieldValue('files', [
                ...files,
                ...newFiles,
            ])
        }
    })

    const handleRemoveFile = fileName => {
        const newFilesState = files.filter( file => file.name !== fileName)
        setFieldValue('files', newFilesState)
    }
    
    return (

        <>
            <Typography component='h6' variant='h6' color={ errors && touched ? 'error' : 'textPrimary'}>
                Imagens
            </Typography>
            <Typography component='div' variant='body2' color={ errors && touched ? 'error' : 'textPrimary'}>
                A primeira imagem é a foto principal do seu anúncio.(máx. 10 imagens)
            </Typography>
            {
                errors && touched
                ? <Typography variant='body2' color='error' gutterBottom>{errors}</Typography>
                : null  
            }
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap', marginTop: 3 }}>
                
                <Box 
                    className={styles.boxDrop} 
                    sx={{ backgroundColor: theme.palette.background.default }}
                    {...getRootProps()}
                >
                    <input name='files' {...getInputProps()} />
                    <Typography variant='body2' color={ errors && touched ? 'error' : 'textPrimary'}>
                        Clique para adicionar ou arraste a imagem para aqui.
                    </Typography>
                </Box>

                {
                    
                    files.map( (file, index) => (
                    

                        <Box 
                            key={file.name} 
                            className={styles.thumb} 
                            sx={{
                                position: 'relative',
                                backgroundImage: `url(${file.preview ? file.preview : '/uploads/'+file.name})`,
                                backgroundSize: 'contain',
                            }}
                        >
                            {
                                index === 0 ?
                                    <Box sx={{
                                        position: 'absolute', 
                                        backgroundColor: 'blue', 
                                        padding: '4px 10px', 
                                        bottom: 0, 
                                        left: 0,
                                        borderRadius: '0 10px 0 0',
                                    }}
                                    >
                                        <Typography variant='body2' color='secondary'>
                                            Principal
                                        </Typography>
                                    </Box>
                                : null
                            }
                            
                            <Box className={styles.mask}>
                                <IconButton color='secondary' onClick={() => handleRemoveFile(file.name)}>
                                    <DeleteForever fontSize='large'/>
                                </IconButton>
                            </Box>    
                        </Box>

                    ))
                }                            

            </Box>
        </>

    )
}

export default FileUpload