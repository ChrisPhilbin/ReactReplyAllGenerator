import React, { useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    divider: {
        margin: 15
    },
}))

const CreateReply = () => {

    let [types, setTypes] = useState([])
    let [type, setType]   = useState('')
    let [rating, setRating] = useState(5)

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

    useEffect(() => {
        fetch('/types')
        .then(response => response.json)
        .then(data => setTypes(data))
    }, [])

    const classes = useStyles()

    const handleRatingChange = (event, newValue) => {
        setRating(newValue)
    }

    return(
        <Container maxWidth={sm}>
            <Paper elevation={3}>
                <Typography align="center" variant="h3" gutterBottom>Add a new reply</Typography>
                <Select
                    fullWidth
                    labelId="reply-type"
                    id="reply-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    {types.map((type) => {
                        <MenuItem value={type.name}>{type.name}</MenuItem>
                    })}
                </Select>
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
            </Paper>
        </Container>
    )
}
export default CreateReply