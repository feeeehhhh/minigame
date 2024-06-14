import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import LinearProgress from '@mui/material/LinearProgress'

import correto from '../assets/Som de acerto.mp3'
import errado from '../assets/Som de erro.mp3'
import Button from '@mui/material/Button'

interface GameProps {
  nivel: 'Easy' | 'Hard'
  onBackToInitial: () => void
}

const Easy = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
const Hard = [...Easy, ...Array.from({ length: 10 }, (_, i) => i.toString())]

const Game: React.FC<GameProps> = ({ nivel, onBackToInitial }) => {
  const [caracteresSorteados, setCaracteresSorteados] = useState<string[]>([])
  const [tempoRestante, setTempoRestante] = useState<number>(0)
  const [resultado, setResultado] = useState<string>('')
  const [indiceAtual, setIndiceAtual] = useState<number>(0)
  const [coresAnteriores, setCoresAnteriores] = useState<string[]>(
    Array(6).fill(''),
  )
  const [jogoAtivo, setJogoAtivo] = useState<boolean>(false)
  const [pontos, setPontos] = useState(0)

  const gameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.focus()
    }
  }, [])
  const reiniciarJogo = () => {
    const tempoInicial = nivel === 'Easy' ? 10 : 3
    setTempoRestante(tempoInicial)
    const arrayParaSortear = nivel === 'Easy' ? Easy : Hard
    sortearCaracteres(arrayParaSortear)
    setJogoAtivo(true)
    setIndiceAtual(0)
    setCoresAnteriores(Array(6).fill(''))
    setResultado('')
  }

  const handleBackToInitial = () => {
    setJogoAtivo(false) // Garantir que o jogo pare se estiver ativo
    onBackToInitial() // Chamar a função para voltar ao Initial
  }

  const sortearCaracteres = (array: string[]) => {
    const caracteresSorteados = []
    const quantidadeCaracteres = 6
    for (let i = 0; i < quantidadeCaracteres; i++) {
      const indiceAleatorio = Math.floor(Math.random() * array.length)
      const caractereSorteado = array[indiceAleatorio]
      caracteresSorteados.push(caractereSorteado)
    }

    setCaracteresSorteados(caracteresSorteados)
  }

  useEffect(() => {
    const tempoInicial = nivel === 'Easy' ? 10 : 3

    setTempoRestante(tempoInicial)
    const arrayParaSortear = nivel === 'Easy' ? Easy : Hard
    sortearCaracteres(arrayParaSortear)
    setJogoAtivo(true)
  }, [nivel])

  useEffect(() => {
    if (tempoRestante > 0) {
      const temporizador = setTimeout(() => {
        setTempoRestante((prevTempo) => prevTempo - 1)
      }, 1000)
      return () => clearTimeout(temporizador)
    } else if (tempoRestante === 0 && jogoAtivo) {
      setJogoAtivo(false)
      setResultado('Tempo esgotado!')
    }
  }, [tempoRestante, jogoAtivo])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!jogoAtivo) return
    event.preventDefault()
    const tecla = event.key.toUpperCase()
    const esperado = caracteresSorteados[indiceAtual]
    const newCoresAnteriores = [...coresAnteriores]

    const audioCorreto = new Audio(correto)
    const audioErrado = new Audio(errado)
    audioCorreto.volume = 0.3
    audioErrado.volume = 0.1

    if (tecla === esperado) {
      audioCorreto.play()
      newCoresAnteriores[indiceAtual] = 'bg-green-500'
      setResultado('Caractere correto!')
      setPontos((prevPontos) => prevPontos + 1)
    } else {
      audioErrado.play()
      newCoresAnteriores[indiceAtual] = 'bg-red-500'
      setResultado('Caractere incorreto!')
      setPontos((prevPontos) => prevPontos - 1)
    }

    setCoresAnteriores(newCoresAnteriores)

    if (indiceAtual === 5) {
      setResultado(`Sua pontuação foi: ${pontos}`)
    } else {
      setIndiceAtual((prevIndice) => prevIndice + 1)
    }
  }

  return (
    <div
      ref={gameRef}
      className="text-yellow-50 min-w-[500px] flex flex-col items-center w-full outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="p-4 w-full">
        <div className="flex gap-8">
          {caracteresSorteados.map((caractere, index) => (
            <motion.div
              key={index}
              className={`flex text-slate-950 rounded-lg text-2xl p-2 px-4 font-bold ${
                index === indiceAtual ? 'bg-blue-500 text-white' : ''
              } ${coresAnteriores[index]}`}
              initial={{ rotate: 0 }}
              animate={
                coresAnteriores[index] === 'bg-red-500' // Aplicar animação se for incorreto
                  ? {
                      rotate: [0, 15, -15, 15, -15, 0],
                      transition: { duration: 0.5 },
                    }
                  : {}
              }
            >
              {caractere}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-full ">
        <div className="flex items-center justify-center gap-2 py-2">
          <LinearProgress
            variant="determinate"
            value={(tempoRestante / (nivel === 'Easy' ? 10 : 3)) * 100}
            className="py-1 rounded-3xl w-[250px]"
          />
          <p>{resultado}</p>
        </div>

        <div
          className={`space-x-7 flex justify-between mx-10 py-4 ${jogoAtivo === true ? 'hidden' : ''}`}
        >
          <Button onClick={reiniciarJogo} variant="contained">
            Reiniciar
          </Button>
          <Button onClick={handleBackToInitial} variant="contained">
            Voltar ao inicio
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Game
