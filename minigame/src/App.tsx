import React from 'react'

import Initial from './assets/components/Initial'

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

function App() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <main>
      <ul className="flex flex-col  items-center  mt-12 gap-10 text-yellow-50">
        <li className="">
          <h1 className="text-3xl font-semibold text-yellow-100">MINIGAME</h1>
        </li>
        <li className="space-y-4">
          <p className="text-lg max-w-[650px]">
            Este jogo é um minigame interativo, com o objetivo de melhorar a
            agilidade do jogador com o teclado.
          </p>
          <h2 className="text-xl ">Como Jogar ?</h2>
          <ul className="text-lg max-w-[650px] space-y-2">
            <li>
              1. Temos dois tipos de dificuldade, no primeiro que é o Easy o
              tempo limite é de 10 segundos envolvendo só letras do alfabeto. Já
              no modo Hard envolve letras e numeros com o tempo reduzido para 3
              segundos.
            </li>
            <li>
              2. O jogador deverá clicar nas teclas informadas pelo jogo com um
              limite tempo de acordo com o seu nivel de dificuldade.
            </li>
          </ul>
          <h3 className="text-xl max-w-[650px] space-y-2">
            Preparado ??? Clique no botao abaixo para iniciar.
          </h3>
        </li>
        <li>
          <ThemeProvider theme={theme}>
            <Button color="ochre" variant="contained" onClick={handleClickOpen}>
              Iniciar Minigame
            </Button>
          </ThemeProvider>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent className="bg-slate-900" sx={{ m: 0, p: 2 }}>
              <Initial />
            </DialogContent>
          </Dialog>
        </li>
      </ul>
    </main>
  )
}

export default App
