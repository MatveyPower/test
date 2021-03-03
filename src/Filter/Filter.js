import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    btn: {
        marginTop: 20,
    }
}))

const Filter = ({ onSearch }) => {
    const [value, setValue] = useState("")

    const onChange = (e) => {
        e.preventDefault()
        setValue(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        onSearch(value)
        setValue("")
    }

    const classes = useStyles()
    return (
        <Container>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
                <TextField
                    onChange={onChange}
                    id="standard-basic"
                    label="Поиск"
                    value={value}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    type="submit"
                >
                    Найти
                </Button>
            </form>
        </Container>
    )
}

export default Filter
