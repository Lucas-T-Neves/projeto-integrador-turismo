import style from './style.module.css'

function formatarData(data) {
  if (!data) return '—'
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(`${data}T00:00:00Z`))
}

export function CardViagem({ viagem }) {
  return (
    <article className={style.card}>
      <div className={style.destination}>
        <span>Destino</span>
        <h3>{viagem.destino}</h3>
      </div>
      <div className={style.details}>
        <p><strong>Saída</strong><span>{viagem.partida}</span></p>
        <p><strong>Período</strong><span>{formatarData(viagem.dataIda)} a {formatarData(viagem.dataVolta)}</span></p>
        <p><strong>Ingresso</strong><span>R$ {Number(viagem.precoIngresso).toFixed(2).replace('.', ',')}</span></p>
        <p><strong>Vagas</strong><span>{viagem.vagas}</span></p>
      </div>
    </article>
  )
}
