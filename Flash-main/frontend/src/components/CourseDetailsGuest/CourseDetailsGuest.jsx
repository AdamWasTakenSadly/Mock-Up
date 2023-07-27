import { useEffect, useState } from "react"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useParams } from "react-router-dom";
//import RatingsView from "../RatingsView/RatingsView";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const CourseDetailsGuest = ({ course }) => {

    const [error, setError] = useState(null)
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [ratings, setRatings] = useState(null)

    const params = useParams();
    const id = params.id


    const fetchRatings = async () => {

       // const response = await fetch('/courses/' + course._id + '/ratings/guest')
       // const json = await response.json()

        //console.log(json)

        //if (response.ok) {
        //    setRatings(json)
        //}


    }

    useEffect(() => {

        if (isInitialRender) {
            setIsInitialRender(false);
            fetchRatings()
        }

    })

    return (
        <div className="left" >
        <Card sx={{}}className='card'>
 
    <CardMedia
    sx={{ objectFit: "contain"}}
    component="img"
    alt="green iguana"
    width="300"
    height="100"
    image="https://img.freepik.com/free-vector/english-book-illustration-design_23-2149509019.jpg"
    variant="contained"
    className='cardMedia'
/>
            <CardContent className='cardContent'>
                <Typography gutterBottom variant="h5" component="div" className='t1'>
                    <strong>{course.title} </strong>
                </Typography>
                <Typography variant="h7" className='t2'>
                <h7><strong>Total hours: </strong>hours</h7>
                <h7 id='ratings'><strong>Ratings: </strong>ratings</h7>
                <h7><strong>Price: </strong>price</h7> :<h7></h7>
                </Typography>
            </CardContent>
        </Card>     
    </div>
    )

}

export default CourseDetailsGuest


