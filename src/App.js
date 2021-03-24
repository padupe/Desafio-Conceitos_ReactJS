import React, {useEffect, useState} from "react"

import "./styles.css";
import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Desafio ReactJS',
      url: 'https://www.desafioreact.com',
      techs: ['Node.js', 'ReactJS']
    })
    
    setRepositories([...repositories, response.data ])  
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(
      repository => repository.id != id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover Repositório
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar Repositório</button>
    </div>
  )
}

export default App
