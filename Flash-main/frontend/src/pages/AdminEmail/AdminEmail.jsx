import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function AdminEmail() {
  const [text, setText] = useState('');
  const [subject, setSubject] = useState('');
  const [error, setError] = useState(null);

  const sendEmail = async (e) => {
    e.preventDefault()
    if(text == '' || subject == ''){
      setError('Please fill in all the fields')
    }

    else
    {
      const email = {
        text,
        subject,
        }
        const response = await fetch ("/log/emailToDevs",{
            method: 'POST',
            body:JSON.stringify(email),
            headers: {
                'Content-Type':'application/json'
            }
        })

        const json = await response.json()

        if (response.status == 500) {
            setError(json.error);
        }
        if (response.status == 200){
            window.location.href="/adminEmail"
        
    }
}
}
return (
    <>
    <div class="CenterWithin">
  <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
       <h2 >Report A Bug To Your Developers</h2>
       <br></br>
            </div>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Enter Subject"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Enter Detailed Explanation of Bug">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '150px' }}
          value={text} onChange={(e) => setText(e.target.value)}
        />
      </FloatingLabel>
      {error && <div className="error" style={{color: "red", fontSize: "small"}}>{error}</div>}
      <button class="btn-mdb2"  onClick={sendEmail}>
          Report Bug
        </button>
    </>
  );
}

export default AdminEmail;