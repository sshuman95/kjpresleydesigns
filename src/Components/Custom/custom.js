import React, { useState, useEffect } from 'react';
import './custom.css';
import fire from '../../config/fire';
import axios from 'axios';

const Custom = () => {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
      if (!selectedFile) {
          setPreview(undefined)
          return
      }

      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = event => {
      if (!event.target.files || event.target.files.length === 0) {
          setSelectedFile(undefined)
          return
      }
      setSelectedFile(event.target.files[0])
  }



  const handleSubmit = event =>{
        event.preventDefault();
        if(!email){
            setError('Please provide an active email address!')
        } else if(selectedFile && email){
            const newFile = fire.storage().ref(`/${selectedFile.name}`).put(selectedFile)
        newFile.on('state_changed',
        (snapshot)=>{

        },
        (error)=>{
            console.log(error)
        },
        ()=>{
            fire.storage().ref(`/${selectedFile.name}`).getDownloadURL().then(u=>{
                axios.post(`/custom`,{
                    name:name,
                    message:message,
                    email:email,
                    url:u
                })
            })
            setError('')
            setSuccess(true)
            
        })
    } else {
        console.log('nope')
    }
  }
  

  return (
    <div className='customContainer'>
          
    <h1>Here you can submit your own custom order!</h1>
    <h3>Simply fill out the form below</h3>
    {error?<h3 style={{color:'red'}}>{error}</h3>:''}
    <form id='customForm' onSubmit={handleSubmit}>
        <div className='personalInfo'>
            <div className='formInput'>
                <label htmlFor='name'>Name: </label>
                <input name='name' type='text' value={name} onChange={event => setName(event.target.value)}/>
                <label htmlFor='email'>Email: </label>
                <input name='email' type='text' value={email} onChange={event => setEmail(event.target.value)}/>
                </div>
                <div className='imageInfo'>
                    {selectedFile &&  <img id="uploadImg" alt='custom item' src={preview} /> }
                    <input type='file' onChange={onSelectFile} />
                    
                </div>
                </div>
        <div className='textAreaInput'>
        <label htmlFor='message'>Details: </label>
        <textarea name='message' placeholder='Provide us with a few details about your item' type='text' value={message} onChange={event => setMessage(event.target.value)}/>
        </div>
       
        
    </form>
    {success?<h3>Thank you! We will responds as soon as we can!</h3>:<button type='submit' className='customButton' form="customForm">Submit Custom Order</button>}
</div>
  )
};



export default Custom;
