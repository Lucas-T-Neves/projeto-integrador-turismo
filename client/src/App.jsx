import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { CadastroViagem } from './componentes/CadastroViagem/CadastroViagem'
import { CardViagem } from './componentes/cardViagem/CardViagem'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/viagens'

function App() {
  const [viagens, setViagens] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')

  const carregarViagens = useCallback(async () => {
    setCarregando(true)
    setErro('')

    try {
      const resposta = await axios.get(API_URL)
      setViagens(resposta.data)
    } catch (error) {
      console.error('Erro ao buscar viagens:', error)
      setErro('Não foi possível carregar as viagens. Verifique se a API está em execução.')
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    // A consulta inicial sincroniza a interface com os dados persistidos na API.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarViagens()
  }, [carregarViagens])

  async function cadastrarViagem(novaViagem) {
    setErro('')
    setMensagem('')

    try {
      await axios.post(API_URL, novaViagem)
      setMensagem('Viagem cadastrada com sucesso.')
      await carregarViagens()
    } catch (error) {
      console.error('Erro ao cadastrar viagem:', error)
      if (error.response?.status === 409) {
        setErro('Essa viagem já está cadastrada.')
      } else if (error.response?.status === 400) {
        setErro('Os dados informados são inválidos. Confira o formulário.')
      } else {
        setErro('Não foi possível cadastrar a viagem. Verifique se a API está em execução.')
      }
      throw error
    }
  }

  return (
    <main className="page">
      <header className="hero">
        <h1>Cadastro de viagens</h1>
      </header>

      <section className="content-grid" aria-label="Cadastro e consulta de viagens">
        <CadastroViagem func={cadastrarViagem} />

        <section className="list-section" aria-labelledby="viagens-cadastradas">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Sua agenda</p>
              <h2 id="viagens-cadastradas">Viagens cadastradas</h2>
            </div>
            <button type="button" className="refresh-button" onClick={carregarViagens} disabled={carregando}>
              {carregando ? 'Atualizando...' : 'Atualizar'}
            </button>
          </div>

          {mensagem && <p className="feedback success" role="status">{mensagem}</p>}
          {erro && <p className="feedback error" role="alert">{erro}</p>}

          {carregando ? (
            <p className="empty-state">Carregando viagens...</p>
          ) : viagens.length === 0 ? (
            <p className="empty-state">Nenhuma viagem cadastrada ainda.</p>
          ) : (
            <div className="cards-grid">
              {viagens.map((viagem) => (
                <CardViagem key={viagem.id} viagem={viagem} />
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

export default App
