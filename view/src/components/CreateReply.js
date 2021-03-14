import React, { useState} from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    divider: {
        margin: 15
    },
}))

const CreateReply = (props) => {

    let types = props.types

    let [type, setType]   = useState('')
    let [rating, setRating] = useState(5)
    let [message, setMessage] = useState('')

    const marks = [
        {
            value: 2,
            label: "No personality"
        },
        {
            value: 5,
            label: "Normal"
        },
        {
            value: 9,
            label: "Sold your soul"
        }
    ]

    const classes = useStyles()

    const handleRatingChange = (event, newValue) => {
        setRating(newValue)
    }

    const createNewReply = () => {
        let newReply = {
            message: message,
            type: type,
            rating: rating,
            createdAt: new Date()
        }
        alert(newReply.message)
        props.setOpen(false)
    }

    return(
        <Container maxWidth="sm">
            <Select
                fullWidth
                labelId="reply-type"
                id="reply-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                {types.map((type) => (
                    <MenuItem value={type.name}>{type.name}</MenuItem>
                ))}
            </Select>
            <Divider className={classes.divider}/>
            <Typography id="rating-slider" gutterBottom>Personality rating</Typography>
            <Slider
                defaultValue={5}
                value={rating}
                onChange={handleRatingChange}
                aria-labelledby="discrete-slider-always"
                step={1}
                max={10}
                min={1}
                marks={marks}
                valueLabelDisplay="on"
            />
            <Divider className={classes.divider}/>
            <TextField fullWidth multiline rows={8} id="message" label="message" helperText="Enter the body of your reply here" onChange={(e) => setMessage(e.target.value)} />
            <Button variant="contained" color="primary" onClick={createNewReply}>Save reply</Button>
        </Container>
    )
}
export default CreateReply