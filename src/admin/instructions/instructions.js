import React from 'react';

let edit =   <ul>
<h3 style={{textAlign:'center'}}>Editing an Item</h3>
    <li>Click the item you want to edit</li>
    <li>Click the 'edit' button</li>
    <li>A new form appears</li>
    <li>Change any field you'd like*</li>
    <li>To add a color fill out the 'colors' field with the color you'd like to add</li>
    <li>Click 'add color'. You can add as many as you like but be sure to click 'add color' after each</li>
    <li>The list after the word 'colors' will be longer</li>
    <li>To remove a color click clear all colors. You will have to re-enter your list.</li>
    <li>Every field most be filled out *except 'colors' field.</li>
    <li>When you are done editing click the "submit edit" button and you will get a message.</li>
    <li>If you don't want to edit anything click 'cancel edit' instead.</li>
</ul>;

let add =  <ul>
<h3 style={{textAlign:'center'}}>Adding an Item</h3>
    <li>Every field most be filled out here!</li>
    <li>To add a color fill out the 'colors' field with the color you'd like to add</li>
    <li>Click 'add color'. You can add as many as you like but be sure to click 'add color' after each</li>
    <li>The list after the word 'colors' will be longer</li>
    <li>To remove a color click clear all colors. You will have to re-enter your list.</li>
    <li>To upload your image click 'choose file'</li>
    <li>choose your file... and wait!</li>
    <li>you will see a green "Ready" message appear.</li>
    <li>Click create item.</li>
</ul>;

let deleteI = <ul>
<h3 style={{textAlign:'center'}}>Deleting an Item</h3>
    <li>Don't click this yet.</li>
    <li>It works but is not sending the response I want.</li>
    <li>If you do you click it. Refresh your page. It'll be gone.</li>
</ul>;

class Instructions extends React.Component{
    constructor(props){
        super(props);
        this.state={
            instructions:''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({instructions: event.target.value});
        
      }

      handleInstructions(){
        let instructions = this.state.instructions;  
        if(instructions === 'add'){
            return add
        } else if(instructions === 'edit'){
            return edit
        } else if(instructions === 'deleteI'){
            return deleteI
        } else {
            return
        }
      }
    
    render(){
        return(  
        <div style={{display:'flex',flexWrap:'wrap',flexDirection:'column',alignItems:'center'}}>
        <span style={{textAlign:'center'}}>Instructions</span>
      <select value={this.state.instructions} onChange={this.handleChange} id='hello'>
          <option value={''}>None</option>
          <option value={'add'}>Adding an Item</option>
          <option value={'edit'}>Editing an Item</option>
          <option value={'deleteI'}>Deleting an Item</option>
      </select>
       {this.handleInstructions()}
    </div>)
    }
};

export default Instructions;