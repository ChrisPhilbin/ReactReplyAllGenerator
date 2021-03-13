import React, { useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({

}))

const CreateReply = () => {

    let [types, setTypes] = useState([])

    useEffect(() => {
        
    }, [])

    const classes = useStyles()

    return(
        <Container maxWidth={sm}>
            <Paper elevation={3}>
                <Typography align="center" variant="h3" gutterBottom>Add a new reply</Typography>
            </Paper>
        </Container>
    )
}
export default CreateReply