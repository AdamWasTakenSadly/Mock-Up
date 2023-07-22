import { async } from "babel-runtime/regenerator"
import { useEffect, useState } from "react"
import { useAsyncValue } from "react-router-dom"

import CourseDetailsGuest from "../../components/CourseDetailsGuest/CourseDetailsGuest"
import Cookie from 'js-cookie'



const SearchCoursesGuest =() => {
    let searchWord;
    const [error, setError] = useState(null)
    const [courses, setCourses] = useState(null)
    const [courses1, setCourses1] = useState(null)
   const[pressed,setPressed] = useState(false);
    
    const [isLoading1,setIsLoading1]=useState(true)
    const [isInitialRender,setIsInitialRender]=useState(true)


    const params = new URLSearchParams(window.location.search);
    const searchItem = params.get('search');
    searchWord=searchItem;

    useEffect (()=>{
      Submit();
    })
   
    const Submit = async () => {
    
        const input = {"input":searchWord}
        const  response = await fetch('/courses/search/guest', {
          method: 'POST',
          body: JSON.stringify(input),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
        
        if (!response.ok) {          
          setError(json.error)
        }
        else
        {
          setError(null)
          setCourses(json)
         
        }
      }
    

      return (       
        <div className="All-page"  style={{ height:"145vh"}}>
        <div className="view-course">
            {
            pressed==false?
            <div className="topbar" style={{overflowY:"auto", height:"30px",position:"absolute"}}>
            {courses && courses.map(course => (


             <CourseDetailsGuest key={course._id}  course={course}></CourseDetailsGuest>
            ))}
           </div>
           
           : <div className="topbar" style={{overflowY:"auto", height:"30px",position:"absolute"}}>
           {courses1 && courses1.map(course1 => (
            <CourseDetailsGuest key={course1._id}  course={course1}></CourseDetailsGuest>
           ))}
          </div>
          }
        </div>
        </div> 
     
      )
    
}


export default SearchCoursesGuest