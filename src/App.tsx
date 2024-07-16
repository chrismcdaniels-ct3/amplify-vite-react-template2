import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [challenges, setChallenges] = useState<Array<Schema["Challenge"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  useEffect(() => {
    client.models.Challenge.observeQuery().subscribe({
      next: (data) => setChallenges([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function createChallenge() {
    console.log("createChallenge")
    client.models.Challenge.create({ description: window.prompt("Challenge content") });
    console.log("createChallenge2")
  }
    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (

        
    <Authenticator>
        {({ signOut, user }) => (

    
    <main>

      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ new Todo</button>
      <button onClick={createChallenge}>+ new Challenge</button>
      <ul>
        {todos.map((todo) => (
          <li           
          onClick={() => deleteTodo(todo.id)}
          key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id}>{challenge.description}</li>
        ))}        
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>

      <button onClick={signOut}>Sign out</button>
    </main>
        
      )}
      </Authenticator>
  );
}

export default App;
