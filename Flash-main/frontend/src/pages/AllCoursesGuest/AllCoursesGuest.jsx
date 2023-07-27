import { useEffect,useState } from "react"

//components
import CourseDetailsGuest from '../../components/CourseDetailsGuest/CourseDetailsGuest'




const AllCourses =() => {
    const [courses, setCourses] = useState(null)
 

    useEffect(()=>{
        const fetchCourses = async ()=>{
            //const response = await fetch ('/courses/guest')
            //const json = await response.json()

           // console.log(json)

           // if (response.ok)
          //  {
          //      setCourses(json)
          //  }
          }

        fetchCourses()
    },[])

    return (
      <div className="All-page"  style={{ height:"145vh"}}>
      <div className="view-course">
      <div className="topbar" style={{overflowY:"auto", height:"30px",position:"absolute"}}>
            {courses && courses.map(course => (
              <CourseDetailsGuest key={course._id}  course={course}></CourseDetailsGuest>
            ))}
          </div>   
        </div>
        </div> 
      )
    
}

export default AllCourses