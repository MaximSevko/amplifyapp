// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
// eslint-disable-next-line
import Amplify, { API } from 'aws-amplify'
// eslint-disable-next-line
import React, { useEffect, useState } from 'react'


import { Authenticator, SelectField, ThemeProvider, AmplifyProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);



const myAPI = "amplifyapi"
const path = '/customers'; 

const App = () => {
  const [input, setInput] = useState("")
  const [votes, setVote] = useState([])

  function getVote(e) {
    let vote = e.input
    API.get(myAPI, path + "/" + vote)
       .then(response => {
         console.log(response)
         let newVote = [...votes]
         newVote.push(response)
         setVote(newVote)

       })
       .catch(error => {
         console.log(error)
       })
  }
  

  return (
    
    
    <AmplifyProvider>
  

    <div className="App">
    


        <SelectField
          label="Fruit"
          descriptiveText="What's your favorite fruit?"
          errorMessage="error"
          value={input}

        onChange={(e) => setInput(e.target.value)}>


      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </SelectField>

      <br/>
      
      <button onClick={() => getVote({input})}>Vote</button>

      <h2 style={{visibility: votes.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
      {
       votes.map((thisVote, index) => {
         return (
        <div key={thisVote.voteId}>
          <span><b>VoteId:</b> {thisVote.voteId} - <b>VoteName</b>: {thisVote.voteName}</span>
        </div>)
       })
      }

    </div>
    
               <Authenticator loginMechanisms={['email']} socialProviders={['amazon', 'apple', 'facebook', 'google']}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
    

    
  
    </AmplifyProvider>  
    
    
  )
}




export default App;
