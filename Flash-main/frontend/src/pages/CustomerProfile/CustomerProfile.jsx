import * as React from "react";
import {useState,useEffect} from 'react';
import './CustomerProfile.scss'
import {MDBCardText} from 'mdb-react-ui-kit';
import {BiEditAlt} from "react-icons/bi"
import {MdOutlineDoneOutline} from 'react-icons/md';

const CustomerProfile = () => {
    const [user,setUser]=useState(null)
    const [isInitialRender, setIsInitialRender]=useState(true)
    const [username,setUsername]=useState("")
    const [isEditingUsername,setIsEditingUsername]=useState(false)
    const [email,setEmail]=useState("")
    const [isEditingEmail,setIsEditingEmail]=useState(false)
    const [phoneNo,setPhoneNo]=useState("")
    const [isEditingPhoneNo,setIsEditingPhoneNo]=useState(false)
    const [street,setStreet]=useState("")
    const [city,setCity]=useState("")
    const [region,setRegion]=useState("")
    const [buildingNo,setBuildingNo]=useState("")
    const [floor,setFloor]=useState("")
    const [flatNo,setFlatNo]=useState("")
    const [isEditingAddress,setIsEditingAddress]=useState(false)
    const [oldPassword,setOldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [newPasswordRepeated,setNewPasswordRepeated]=useState("")
    const [isEditingPassword,setIsEditingPassword]=useState(false)

    const [error,setError]=useState(null)
    const [success,setSuccess]=useState(null)


useEffect(()=>{
    if(isInitialRender)
    {
        fetchUser()
    }
},[])

useEffect(()=>{
    if(user)
    {
        setUsername(user.username)
        setEmail(user.email)
        setPhoneNo(user.phoneNumber)
        setStreet(user.location.street)
        setCity(user.location.city)
        setRegion(user.location.region)
        setBuildingNo(user.location.buildingNo)
        setFloor(user.location.floor)
        setFlatNo(user.location.flatNo)
    }
},[user])

const fetchUser = async ()=>{
    const response = await fetch ('/users/getUser')
    const json = await response.json()
    if (response.ok)
    {
        setUser(json)
        console.log("response: ",json)
        setIsInitialRender(false);
     }
}

const handleUsernameChange=async()=>{
    const input = { newUsername: username};

    try {
      const response = await fetch("/users/editUsername", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
        body: JSON.stringify(input),
      });

      const json = await response.json();
      if (response.ok) {
       setIsEditingUsername(false)
       setSuccess(json.message)
       setError(null)
      } else {
       setError(json.error)
       setSuccess(null)
      }
    } catch (error) {
      console.error('Error:', error);
    }
}

const handleEmailChange=async()=>{
    const input = { newEmail: email};

    try {
      const response = await fetch("/users/editEmail", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
        body: JSON.stringify(input),
      });

      const json = await response.json();
      if (response.ok) {
       setIsEditingEmail(false)
       setError(null)
       setSuccess(json.message)
      } else {
        setSuccess(null)
       setError(json.error)
      }
    } catch (error) {
      console.error('Error:', error);
    }
}

const handlePhoneNoChange=async()=>{
    const input = { newPhoneNo: phoneNo};

    try {
      const response = await fetch("/users/editPhoneNo", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
        body: JSON.stringify(input),
      });

      const json = await response.json();
      if (response.ok) {
       setIsEditingPhoneNo(false)
       setSuccess(json.message)
       setError(null)
      } else {
        setSuccess(null)
       setError(json.error)
      }
    } catch (error) {
      setError(error)
      console.error('Error:', error);
    }
    
}

const handleAddressChange=async()=>{
    const input = { newStreet:street,newCity:city,newRegion:region,newBuildingNo:buildingNo,newFloor:floor,newFlatNo:flatNo};

    try {
      const response = await fetch("/users/editAddress", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
        body: JSON.stringify(input),
      });

      const json = await response.json();
      if (response.ok) {
       setIsEditingAddress(false)
       setError(null)
       setSuccess(json.message)
      } else {
        setSuccess(null)
       setError(json.error)
      }
    } catch (error) {
      console.error('Error:', error);
    }
}

const handlePasswordChange=async()=>{
    const input = { oldPassword: oldPassword,newPassword:newPassword};

    if(newPassword!==newPasswordRepeated)
    {
        setError("The new passwords do not match")
    }
    else{

    try {
      const response = await fetch("/users/editPassword", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
        body: JSON.stringify(input),
      });

      const json = await response.json();
      if (response.ok) {
       setIsEditingPassword(false)
       setSuccess(json.message)
       setError(null)
       setOldPassword("")
       setNewPassword("")
       setNewPasswordRepeated("")
      } else {
       setError(json.error)
       setSuccess(null)
       setOldPassword("")
       setNewPassword("")
       setNewPasswordRepeated("")
      }
    } catch (error) {
      console.error('Error:', error);
    }

}
}

if(isInitialRender)
{
    return(<div>Loading...</div>)
}

    return (
        <div>
        <div className="empty-space"></div>
        <div className="profile-container">
            <h2 className="profile-container-text">Manage your profile</h2>
          <div className="user-info">
            <h3 className="profile-container-text">Username</h3>
            {!isEditingUsername &&
            <p className="edit-line">
            <span className="edit-line-label">Hello!</span>
            <MDBCardText className="text-muted">{username}
            <BiEditAlt class="edit-icon" onClick={(e)=>{setIsEditingUsername(true)}} />
            </MDBCardText>
            </p> 
            }
            {isEditingUsername &&
            <p className="edit-line">
                <span className="edit-line-label">Hello!</span>
                <input class="form-control" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                <MdOutlineDoneOutline class="done-icon" onClick={handleUsernameChange} />
            </p>}

            <hr className="divider-line" />

            <h3 className="profile-container-text">Contact Information</h3>
            {!isEditingEmail &&
            <p className="edit-line">
            <span className="edit-line-label">Email</span>
            <MDBCardText className="text-muted">{email}
            <BiEditAlt class="edit-icon" onClick={(e)=>{setIsEditingEmail(true)}} />
            </MDBCardText>
            </p> 
            }
            {isEditingEmail &&
            <p className="edit-line">
                <span className="edit-line-label">Email</span>
                <input class="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <MdOutlineDoneOutline class="done-icon" onClick={handleEmailChange} />
            </p>}

            {!isEditingPhoneNo &&
            <p className="edit-line">
            <span className="edit-line-label">Phone Number</span>
            <MDBCardText className="text-muted">{phoneNo}
            <BiEditAlt class="edit-icon" onClick={(e)=>{setIsEditingPhoneNo(true)}} />
            </MDBCardText>
            </p> 
            }
            {isEditingPhoneNo &&
            <p className="edit-line">
                <span className="edit-line-label">Phone Number</span>
                <input class="form-control" value={phoneNo} onChange={(e)=>{setPhoneNo(e.target.value)}} />
                <MdOutlineDoneOutline class="done-icon" onClick={handlePhoneNoChange} />
            </p>}

            <hr className="divider-line" />

            {!isEditingAddress &&
            <>
            <p className="edit-line">
            <h3 className="profile-container-text">Current Address</h3>
            <BiEditAlt class="edit-icon" onClick={(e)=>{setIsEditingAddress(true)}} />
            </p>
            <p className="edit-line">
            <span className="edit-line-label">Street</span>
            <MDBCardText className="text-muted">{street}</MDBCardText>
            </p>
            <p className="edit-line">
            <span className="edit-line-label">City</span>
            <MDBCardText className="text-muted">{city}</MDBCardText>
            </p>
            <p className="edit-line">
            <span className="edit-line-label">Region</span>
            <MDBCardText className="text-muted">{region}</MDBCardText>
            </p>
            <p className="edit-line">
            <span className="edit-line-label">Building number</span>
            <MDBCardText className="text-muted">{buildingNo}</MDBCardText>
            </p>
            <p className="edit-line">
            <span className="edit-line-label">Floor</span>
            <MDBCardText className="text-muted">{floor}</MDBCardText>
            </p>
            <p className="edit-line">
            <span className="edit-line-label">Flat number</span>
            <MDBCardText className="text-muted">{flatNo}</MDBCardText>
            </p>
            </>
            }
            
            {isEditingAddress &&
            <>
            <p className="edit-line">
            <h3 className="profile-container-text">Current Address</h3>
            <MdOutlineDoneOutline class="done-icon" onClick={handleAddressChange} />
            </p>
            <p className="edit-line">
            <span className="edit-line-label">Street</span>
            <input class="form-control" value={street} onChange={(e)=>{setStreet(e.target.value)}} />
            </p>
            <p className="edit-line">
            <span className="edit-line-label">City</span>
            <input class="form-control" value={city} onChange={(e)=>{setCity(e.target.value)}} />
            </p>
            <p className="edit-line">
            <span className="edit-line-label">Region</span>
            <input class="form-control" value={region} onChange={(e)=>{setRegion(e.target.value)}} />
            </p>
            <p className="edit-line">
            <span className="edit-line-label">Building number</span>
            <input class="form-control" value={buildingNo} onChange={(e)=>{setBuildingNo(e.target.value)}} />
            </p>
            <p className="edit-line">
            <span className="edit-line-label">Floor</span>
            <input class="form-control" value={floor} onChange={(e)=>{setFloor(e.target.value)}} />
            </p>
            <p className="edit-line">
            <span className="edit-line-label">Flat number</span>
            <input class="form-control" value={flatNo} onChange={(e)=>{setFlatNo(e.target.value)}} />
            </p>
            </>
            }
             <hr className="divider-line" />
           
           {!isEditingPassword && 
            <p className="edit-line">
            <h3 className="profile-container-text">Edit Password</h3>
            <BiEditAlt class="edit-icon" onClick={(e)=>{setIsEditingPassword(true)}} />
            </p> 
            }
            {isEditingPassword &&
            <>
            <p className="edit-line">
                <h3 className="profile-container-text">Edit Password</h3>
                <MdOutlineDoneOutline class="done-icon" onClick={handlePasswordChange} />
            </p>
             <p className="edit-line">
             <span className="edit-line-label">Old password</span>
             <input class="form-control" type="password" value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}} />
             </p>
             <p className="edit-line">
             <span className="edit-line-label">New password</span>
             <input class="form-control" type="password" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value);setError(null)}} />
             </p>
             <p className="edit-line">
             <span className="edit-line-label">New password</span>
             <input class="form-control" type="password" value={newPasswordRepeated} onChange={(e)=>{setNewPasswordRepeated(e.target.value);setError(null)}} />
             </p>
             </>
            }

            
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </div>
      </div>
      </div>
    );
  }

export default CustomerProfile;