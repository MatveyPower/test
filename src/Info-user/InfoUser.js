import React, { useState,useEffect } from "react"
import Container from "@material-ui/core/Container"

const InfoUser = ({ user }) => {

    const address = user?.address

    return (
        user && (
            <Container>
                <div>
                    Выбран пользователь{" "}
                    <b>{`${user.firstName} ${user.lastName}.`}</b>
                    Описание:{user.description}.
                    Адрес проживания: <b>{address.streetAddress}.</b>
                    Город: <b>{address.city}.</b>
                    Провинция/штат: <b>{address.state}.</b>
                    Индекс: <b>{address.zip}.</b>
                </div>
            </Container>
        )
    )
}

export default InfoUser
