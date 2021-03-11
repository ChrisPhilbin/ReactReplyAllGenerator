import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    replyForm: {
        padding: 20
    }
}))

const ReplySelector = () => {

    const classes = useStyles();

    let [rating, setRating] = useState(0)
    let [type, setType]     = useState('')
    let [name, setName]     = useState('')

    return(
        <Container maxWidth="sm">
            <Paper elevation={3} className={classes.replyForm}>
                <Typography align="center" variant="h3" gutterBottom>Craft your reply</Typography>
                
                <TextField fullWidth id="name" label="name" helperText="Who are you replying to?" onChange={(e) => setName(e.target.value)} />
                <Select
                    fullWidth
                    labelId="reply-type"
                    id="reply-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem value="promotion">Promotion</MenuItem>
                    <MenuItem value="shoutout">Shout out</MenuItem>
                    <MenuItem value="tip">Tip</MenuItem>
                </Select>
            </Paper>
        </Container>
    )
}

export default ReplySelector