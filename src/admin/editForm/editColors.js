import React, { useState, useEffect } from 'react';
import './editColors.css';
import fire from '../../config/fire';

const EditColors = (props) => {
  const [selectedFile, setSelectedFile] = useState('');
  const [preview, setPreview] = useState('');
  const [color,setColor] = useState('');
  const [error, setError] = useState('');
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
        if(!color){
            setError('Please provide a color description!')
        } else if(selectedFile && color){
            const newFile = fire.storage().ref(`/${selectedFile.name}`).put(selectedFile)
        newFile.on('state_changed',
        (snapshot)=>{

        },
        (error)=>{
            console.log(error)
        },
        ()=>{
            fire.storage().ref(`/${selectedFile.name}`).getDownloadURL().then(u=>{
                let colorToAdd = {
                    Color:color,
                    source:u
                };
                props.handleAddObject(colorToAdd)
            })
        })
    } else {
        console.log('nope')
    }
  }
  

  return (
    <div className='colorFormContainer'>
        {error?<h3 style={{color:'red'}}>{error}</h3>:''}
    <form id='newColorForm' onSubmit={handleSubmit}>
        <label htmlFor='color'>Color: </label>
        <input name='color' type='text' value={color || ''} onChange={event => setColor(event.target.value)}/>
        <input type='file' onChange={onSelectFile} />
        {selectedFile &&  <img id="uploadImg" alt='custom item' src={preview} /> }    
    </form>
    {<button type='submit' className='submitColorButton' form="newColorForm">Submit New Color</button>}
</div>
  )
};



export default EditColors;