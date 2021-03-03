import React, { useState, useEffect, useMemo } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import TableSortLabel from "@material-ui/core/TableSortLabel"

import Filter from "../Filter/Filter"

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

export default function DataTable({ rows, onUserClick }) {
    const classes = useStyles()

    const [sortedColumns, setSortedColumns] = useState(null)

    const [sortedRows, setSortedRows] = useState(null)

    const [toggleSorted, setToggleSorted] = useState(false)


    useEffect(() => {
        setSortedRows(rows)
    }, [rows])

    const toggleHandler = (column) => {
        setSortedColumns(column)
        setToggleSorted((prev) => !prev)
    }

    const tableSortLabel = (
        <TableSortLabel
            active={true}
            direction={toggleSorted ? "desc" : "asc"}
        ></TableSortLabel>
    )

    useMemo(() => {
        if (sortedColumns && sortedRows) {
            sortedRows.sort((a, b) => {
                if (a[sortedColumns] < b[sortedColumns]) {
                    return toggleSorted ? -1 : 1
                }
                if (a[sortedColumns] > b[sortedColumns]) {
                    return toggleSorted ? 1 : -1
                }
                return 0
            })
        }
        return sortedRows
    }, [sortedColumns, sortedRows, toggleSorted])

    const search = (input) => {
        if (input.length === 0) {
            return rows
        }

        const keysData = Object.keys(rows[0])

        return rows.reduce((acc, el) => {
            let i = 0
            while (i < keysData.length) {
                const key = keysData[i]
                const find = el[key]
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase().trim())
                if (find) {
                    acc.push(el)
                    break
                }
                i++
            }
            return acc
        }, [])
    }
    const onSearch = (input) => {
        const findRow = search(input)
        setSortedRows(findRow)
    }

    const onRowClick = (row) => {
        onUserClick(row)
        

    }

    return (
        <Container>
            <Filter onSearch={onSearch} />
            <TableContainer component={Paper}>
                <Table
                    className={classes.table}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={() => toggleHandler("id")}>
                                id
                                {sortedColumns === "id" && tableSortLabel}
                            </TableCell>
                            <TableCell
                                onClick={() => toggleHandler("firstName")}
                            >
                                First Name
                                {sortedColumns === "firstName" &&
                                    tableSortLabel}
                            </TableCell>
                            <TableCell
                                onClick={() => toggleHandler("lastName")}
                            >
                                Last Name
                                {sortedColumns === "lastName" && tableSortLabel}
                            </TableCell>
                            <TableCell onClick={() => toggleHandler("email")}>
                                email
                                {sortedColumns === "email" && tableSortLabel}
                            </TableCell>
                            <TableCell onClick={() => toggleHandler("phone")}>
                                phone
                                {sortedColumns === "phone" && tableSortLabel}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows &&
                            sortedRows.map((row, index) => (
                                <TableRow onClick = {() => onRowClick(row)} key={`${row.id}${index}`}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell>{row.firstName}</TableCell>
                                    <TableCell>{row.lastName}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
