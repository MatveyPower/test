import React from 'react'
import Container from "@material-ui/core/Container"
import Pagination from '@material-ui/lab/Pagination';

const Pag = ({userPerPage, totalUsers , paginate}) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalUsers / userPerPage); i++){
        pageNumbers.push(i)
    }

    const handleChange = (e, value) => {
        paginate(value)

    }

    return (
        <Container>
        <Pagination count = {Math.ceil(totalUsers / userPerPage)} onChange = {handleChange}/>
        </Container>
    )
}

export default Pag
