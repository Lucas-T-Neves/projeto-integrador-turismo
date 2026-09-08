import { useState } from 'react'
import style from './style.module.css'

const estadoInicial = {
  dataIda: '',
  dataVolta: '',
  partida: '',
  destino: '',
  precoIngresso: '',
  vagas: '',
}

export function CadastroViagem({ func }) {
  const [dados, setDados] = useState(estadoInicial)
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  function atualizarCampo(event) {
    const { name, value } = event.target
    setDados((dadosAtuais) => ({ ...dadosAtuais, [name]: value }))
    setErro('')
  }

  function validar() {
    if (Object.values(dados).some((valor) => !valor)) {
      return 'Preencha todos os campos.'
    }

    if (dados.dataVolta < dados.dataIda) {
      return 'A data de volta não pode ser anterior à data de ida.'
    }

    if (Number(dados.precoIngresso) <= 0 || Number(dados.vagas) <= 0) {
      return 'O preço e a quantidade de vagas devem ser maiores que zero.'
    }

    return ''
  }

  async function onEnviar(event) {
    event.preventDefault()
    const mensagemErro = validar()

    if (mensagemErro) {
      setErro(mensagemErro)
      return
    }

    setEnviando(true)
    try {
      await func({
        ...dados,
        precoIngresso: Number(dados.precoIngresso),
        vagas: Number(dados.vagas),
      })
      setDados(estadoInicial)
    } catch {
      // A mensagem da API é exibida pelo componente principal.
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className={style.container} onSubmit={onEnviar}>
      <div className={style.heading}>
        <p className={style.eyebrow}>Nova viagem</p>
        <h2>Cadastre os detalhes</h2>
        <p>Preencha os campos abaixo para salvar um novo roteiro.</p>
      </div>

      <div className={style.fields}>
        <label className={style.field}>
          Data de ida
          <input name="dataIda" value={dados.dataIda} className={style.input} type="date" onChange={atualizarCampo} />
        </label>
        <label className={style.field}>
          Data de volta
          <input name="dataVolta" value={dados.dataVolta} className={style.input} type="date" onChange={atualizarCampo} />
        </label>
        <label className={style.field}>
          Cidade de partida
          <input name="partida" value={dados.partida} className={style.input} type="text" maxLength="40" placeholder="Ex.: São Paulo" onChange={atualizarCampo} />
        </label>
        <label className={style.field}>
          Destino
          <input name="destino" value={dados.destino} className={style.input} type="text" maxLength="40" placeholder="Ex.: Recife" onChange={atualizarCampo} />
        </label>
        <label className={style.field}>
          Preço do ingresso (R$)
          <input name="precoIngresso" value={dados.precoIngresso} className={style.input} type="number" min="0.01" step="0.01" placeholder="0,00" onChange={atualizarCampo} />
        </label>
        <label className={style.field}>
          Vagas disponíveis
          <input name="vagas" value={dados.vagas} className={style.input} type="number" min="1" step="1" placeholder="Ex.: 20" onChange={atualizarCampo} />
        </label>
      </div>

      <button type="submit" disabled={enviando} className={style.button}>
        {enviando ? 'Salvando...' : 'Cadastrar viagem'}
      </button>
      {erro && <p className={style.error} role="alert">{erro}</p>}
    </form>
  )
}
