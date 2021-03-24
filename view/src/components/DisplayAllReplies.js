import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'


const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    table: {
        minWidth: 650
    }
}))

const DisplayAllReplies = (props) => {

    const classes = useStyles()

    let [replies, setReplies] = useState([])
    let [loading, setLoading] = useState(false)
    let [errors, setErrors]   = useState('')

    useEffect(() => {
        setLoading(true)
        fetch(process.env.REACT_APP_CORS + '/replies')
        .then(response => response.json())
        .then(data => {
            setReplies([...replies, data])
            setLoading(false)
        })
        .catch(error => {
            setErrors(error)
            console.log(error, "something went wrong")
        })

    }, [])

    let replyTable = null

    if (replies.length !== 0) {
        replyTable = (
            <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Body of reply</TableCell>
                            <TableCell align="right">Type of reply</TableCell>
                            <TableCell align="right">Personality score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {replies.map((reply) => (
                            <TableRow key={reply.replyId}>
                                <TableCell component="th" scope="row">
                                    {reply.message}
                                </TableCell>
                                <TableCell align="right">{reply.type}</TableCell>
                                <TableCell align="right">{reply.rating}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </>
        )
    }

    return(
        <main className={classes.content}>
            {replies.length? {replyTable} : <div>Nothing yet...</div>}
        </main>
    )
}

export default DisplayAllReplies