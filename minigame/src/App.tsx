import React, { useState } from 'react'
import Initial from './components/Initial'
import Game from './components/Game'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    ochre: Palette['primary']
  }
  interface PaletteOptions {
    ochre?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ochre: true
  }
}

const theme = createTheme({
  palette: {
    ochre: {
      main: 'rgb(250 204 21)',
      light: 'rgb(253 224 71)',
      dark: 'rgb(254 240 138)',
      contrastText: 'rgb(254 252 232)',
    },
  },
})

const App: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [nivel, setNivel] = useState<'Easy' | 'Hard' | null>(null)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setNivel(null)
  }

  const handleSelectDifficulty = (nivelSelecionado: 'Easy' | 'Hard') => {
    setNivel(nivelSelecionado)
  }
  const handleBackToInitial = () => {
    setNivel(null)
  }

  return (
    <main>
      <ul className="flex flex-col items-center mt-12 gap-10 text-yellow-50">
        <li>
          <h1 className="text-3xl font-semibold text-yellow-100">MINIGAME</h1>
        </li>
        <li className="space-y-4">
          <p className="text-lg max-w-[650px]">
            Este jogo é um minigame interativo, com o objetivo de melhorar a
            agilidade do jogador com o teclado.
          </p>
          <h2 className="text-xl">Como Jogar ?</h2>
          <ul className="text-lg max-w-[650px] space-y-2">
            <li>
              1. Temos dois tipos de dificuldade, no primeiro que é o Easy o
              tempo limite é de 10 segundos envolvendo só letras do alfabeto. Já
              no modo Hard envolve letras e números com o tempo reduzido para 3
              segundos.
            </li>
            <li>
              2. O jogador deverá clicar nas teclas informadas pelo jogo com um
              limite tempo de acordo com o seu nível de dificuldade.
            </li>
          </ul>
          <h3 className="text-xl max-w-[650px] space-y-2">
            Preparado ??? Clique no botão abaixo para iniciar.
          </h3>
        </li>
        <li>
          <ThemeProvider theme={theme}>
            <Button color="ochre" variant="contained" onClick={handleClickOpen}>
              Iniciar Minigame
            </Button>
          </ThemeProvider>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent className="bg-slate-900" sx={{ m: 0, p: 0 }}>
              <div className="bg-slate-900 border border-yellow-100 m-2  rounded-md ">
                <h1 className="text-center text-slate-50 text-2xl font-semibold py-2">
                  MINI-GAME
                </h1>
                {nivel === null ? (
                  <Initial onSelectDifficulty={handleSelectDifficulty} />
                ) : (
                  <Game nivel={nivel} onBackToInitial={handleBackToInitial} />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </li>
      </ul>
    </main>
  )
}

export default App
