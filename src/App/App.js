import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import DataTable from "../Data-table/DataTable"
import AddRow from "../Add-row/AddRow"
import InfoUser from "../Info-user/InfoUser"
import CircularProgress from '@material-ui/core/CircularProgress';


import "./App.css"

import axios from "axios"
import Pag from "../Pagination/Pag"

function App() {
    const [data, setData] = useState([])
    const [fieldAddRowView, setFieldAddRowView] = useState(false)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [userPerPage] = useState(50)
    
    

    const fetchData = async (count) => {
        setLoading(true)
        try {
            const { data } = await axios.get(
                `http://www.filltext.com/?rows=${count}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
            )
            setData(data)
            setError(false)
            setLoading(false)
        } catch (err) {
            setError(true)
        }
    }
    const ViewButton = () => {
        return (
            <Button onClick={() => setFieldAddRowView(!fieldAddRowView)}>
                Добавить
            </Button>
        )
    }

    const pushRow = (obj) => {
        data.push(obj)
    }
    const visibleAddForm = (value) => {
        setFieldAddRowView(value)
    }

    const onUserClick = (user) => {
        setUser(user)
    }

    const indexOfLastUser = currentPage * userPerPage
    const indexOfFirstUser = indexOfLastUser - userPerPage

    const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    return loading ? <CircularProgress /> : (
        <div>
            <header className="header">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => fetchData(32)}
                >
                    Small Data
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => fetchData(1000)}
                >
                    Big Data
                </Button>
                {fieldAddRowView ? (
                    <AddRow pushRow={pushRow} visibleAddForm={visibleAddForm} />
                ) : (
                    <ViewButton />
                )}
            </header>

            {data.length > 0 ? <main>
                {<DataTable rows={currentUsers} onUserClick={onUserClick} loading = {loading} />}
                {error && <p>Ошибка</p>}
                <InfoUser user={user} />
                {<Pag userPerPage = {userPerPage} totalUsers = {data.length} paginate = {paginate}/>}
            </main> : null}
        </div>
    )
}

export default App
