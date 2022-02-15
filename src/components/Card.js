import {
    Card as CardMUI,
    CardActions, 
    CardContent, 
    CardMedia, 
    Typography,
} from "@mui/material"

const Card = ({ image, title, subtitle, actions }) => {
    return(
        <CardMUI>
            <CardMedia sx={{ paddingTop: '56%' }} 
                image={image}
                title={title}  
            />
            <CardContent>
                <Typography component='h2' variant='h5'>
                    {title}
                </Typography>
                <Typography>
                    {subtitle}
                </Typography>
            </CardContent>
            {
                actions
                ? (
                    <CardActions>
                        {actions}
                    </CardActions>
                ) : null
            }            
        </CardMUI>
    )
}

export default Card