import {
    Card as CardMUI,
    CardActions, 
    CardContent, 
    CardMedia, 
    Typography,
} from "@mui/material"

const Card = ({ image, title, subtitle, actions }) => {
       
    return(        
        <CardMUI sx={{maxHeight: 350, minHeight:350}}>
            <CardMedia sx={{ paddingTop: '65%' }} 
                image={image}
                title={title}  
            />
            <CardContent sx={{mb: 0}}>
                <Typography component='h2' variant='h6'>
                    {title}
                </Typography>
                <Typography   sx={{mt: 2, mb: 0}} >
                    {subtitle}
                </Typography>
            </CardContent>
            {
                actions
                ? (
                    <CardActions sx={{mt: 0, pb: 10}}>
                        {actions}
                    </CardActions>
                ) : null
            }            
        </CardMUI>
    )
}

export default Card