import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Container, TextField } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}))

const AddRow = ({ pushRow, visibleAddForm }) => {
    const classes = useStyles()

    const [inputId, setinputId] = useState("")
    const [inputFirstName, setinputFirstName] = useState("")
    const [inputLastName, setinputLastName] = useState("")
    const [inputEmail, setinputEmail] = useState("")
    const [inputPhone, setinputPhone] = useState("")

    const [checkEmail, setCheckEmail] = useState(false)
    const [checkPhone, setCheckPhone] = useState(false)

    const [fillError, setFillError] = useState(false)

    const onChangePhone = (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, "")
        if (onlyNums.length < 10) {
            setCheckPhone(false)
            setinputPhone(onlyNums)
        } else if (onlyNums.length === 10) {
            const number = onlyNums.replace(
                /(\d{3})(\d{3})(\d{4})/,
                "($1)$2-$3"
            )
            setCheckPhone(true)
            setinputPhone(number)
        }
    }
    const onChangeId = (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, "")
        setinputId(onlyNums)
    }

    const onChangeFirstName = (e) => {
        const onlyLetters = e.target.value.replace(/[^a-zа-яё ]/iu, "")
        setinputFirstName(onlyLetters)
    }
    const onChangeLastName = (e) => {
        const onlyLetters = e.target.value.replace(/[^a-zа-яё ]/iu, "")
        setinputLastName(onlyLetters)
    }
    const onChangeEmail = (e) => {
        const email = e.target.value.match(
            /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
        )
        setCheckEmail(email)
        setinputEmail(e.target.value)
    }

    const addNewRow = () => {
        if (!inputId || !inputFirstName || !inputLastName || !inputEmail.match(/@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/) || inputPhone.length < 10) {
            setFillError(true)
            return 
        }
        pushRow({
            id: inputId,
            firstName: inputFirstName,
            lastName: inputLastName,
            email: inputEmail,
            phone: inputPhone,
        })
        visibleAddForm(false)
    }

    const FillingError = () => {
        return (
            <div>
                Необходимо заполнить все поля 
            </div>
        )
    }

    return (
        <Container>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        error={inputId ? false : true}
                        onChange={onChangeId}
                        label="Id"
                        value={inputId}
                    />
                    <TextField
                        error={inputFirstName ? false : true}
                        onChange={onChangeFirstName}
                        label="FirstName"
                        value={inputFirstName}
                    />
                    <TextField
                        error={inputLastName ? false : true}
                        onChange={onChangeLastName}
                        label="LastName"
                        value={inputLastName}
                    />
                    <TextField
                        error={!checkEmail}
                        onChange={onChangeEmail}
                        label="Email"
                        value={inputEmail}
                    />
                    <TextField
                        error={!checkPhone}
                        onChange={onChangePhone}
                        label="Phone"
                        value={inputPhone}
                    />
                </div>
                {fillError && <FillingError/>}
                <Button variant="contained" color="primary" onClick={addNewRow}>
                    Добавить в таблицу
                </Button>
            </form>
        </Container>
    )
}

export default AddRow
