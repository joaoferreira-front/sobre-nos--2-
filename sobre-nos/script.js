// Data inicial - 28 de outubro de 2023 às 18:45
const dataInicial = new Date("2023-10-28T18:45:00")

// Elementos do cronômetro
const cronometroGrid = document.getElementById("cronometro")
const infoElement = document.getElementById("info")

// Função para calcular a diferença de tempo
function calcularTempo() {
  const agora = new Date()
  const diferenca = Math.abs(agora - dataInicial)

  // Cálculos de tempo
  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24))
  const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60))
  const segundos = Math.floor((diferenca % (1000 * 60)) / 1000)

  // Cálculos adicionais
  const semanas = Math.floor(dias / 7)
  const anos = Math.floor(dias / 365.25) // Considerando anos bissextos

  return { dias, horas, minutos, segundos, semanas, anos }
}

// Função para adicionar um item ao cronômetro
function adicionarItemCronometro(valor, label) {
  const item = document.createElement("div")
  item.className = "cronometro-item"

  const numero = document.createElement("div")
  numero.className = "cronometro-numero"
  numero.textContent = valor

  const texto = document.createElement("div")
  texto.className = "cronometro-label"
  texto.textContent = label

  item.appendChild(numero)
  item.appendChild(texto)
  cronometroGrid.appendChild(item)
}

// Função para atualizar o cronômetro
function atualizarCronometro() {
  if (!cronometroGrid || !infoElement) return

  const tempo = calcularTempo()

  // Limpar o grid
  cronometroGrid.innerHTML = ""

  // Adicionar itens ao grid
  adicionarItemCronometro(tempo.anos, "Anos")
  adicionarItemCronometro(tempo.semanas, "Semanas")
  adicionarItemCronometro(tempo.dias, "Dias")
  adicionarItemCronometro(tempo.horas, "Horas")
  adicionarItemCronometro(tempo.minutos, "Minutos")
  adicionarItemCronometro(tempo.segundos, "Segundos")

  // Atualizar informação adicional
  const dataFormatada = dataInicial.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
  infoElement.textContent = `Contando desde ${dataFormatada}`
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  atualizarCronometro()
  setInterval(atualizarCronometro, 1000)
})
