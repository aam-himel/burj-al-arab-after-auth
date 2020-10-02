import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';

const Bookings = () => {
    
    const [booking, setBooking] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    

    useEffect(() => {
        fetch('http://localhost:5000/bookings?email='+ loggedInUser.email, {
            headers: {
                'authorization' : sessionStorage.getItem('jwtToken'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => setBooking(data));
    }, [])

    return (
        <div>
            <h1>You have {booking.length} bookings</h1>
            {
               booking.length && booking.map(book => <li>{book.email} {(new Date(book.checkIn)).toDateString('dd/yy')} {(new Date(book.checkOut)).toDateString('dd/yy')} </li>)
            }
        </div>
    )
}

export default Bookings;
