import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import axios from 'axios'

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

    const createNewReply = (event) => {
        event.preventDefault()
        // const authToken = localStorage.getItem('AuthToken')

        let newReply = {
            message: message,
            rating: rating,
            type: type
        }

        let options = {
            url: `https://sleepy-plateau-48238.herokuapp.com/https://us-central1-replyallgenerator.cloudfunctions.net/api/replies`,
            method: 'post',
            data: newReply
        }
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios(options)
            .then((response) => {
                console.log(response, "response from axios")
                props.setOpen(false)
                props.setReplies([...props.replies, newReply])
            })
            .catch((error) => {
                props.setOpen(true)
                console.log(error);
            })

        // fetch(process.env.REACT_APP_CORS + '/replies', {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //         'Authorization': `${authToken}`
        //     },
        //     body: JSON.stringify(newReply)
        // })
        // .then(response => response.json())
        // .then(props.setOpen(false))
        // .then(props.setReplies([...props.replies, newReply]))
        // .catch(error => console.log("Error, something went wrong: ", error))
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
                    <MenuItem value={type.name} key={type.typeId}>{type.name}</MenuItem>
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