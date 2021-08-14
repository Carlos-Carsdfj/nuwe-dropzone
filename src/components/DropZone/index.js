import { useEffect, useState } from 'react'
import {
  Modal,
  makeStyles,
  Paper,
  Button,
  Box,
  Typography,
  CircularProgress
} from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import ListFiles from './ListFiles.js'
const useStayles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 400
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
    width: '100%',
    backgroundImage: `url(${'/conjunto.png'})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundColor: theme.palette.background.main,
    boxShadow: '0px 0px 17px 7px #4F934A'
  },
  upfileButton: {
    width: '100%',
    fontSize: 20,
    height: '10%'
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalPaperWithStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '90%',
    backgroundColor: theme.palette.primary.dark,
    maxWidth: 556,
    padding: theme.spacing(4)
  },
  modalPaper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '90%',
    backgroundColor: theme.palette.warning.light,
    maxWidth: 556,
    padding: theme.spacing(4)
  },
  closeButton: {
    alignSelf: 'flex-start'
  }
}))

export default function DropZone() {
  const [isLoading, setIsLoading] = useState(false)
  const [statusFiles, setStatusFiles] = useState(false)
  const [message, setMessage] = useState({
    title: 'ups',
    main: '',
    footer: '',
    style: false
  })
  const [files, setFiles] = useState([])
  const classes = useStayles()
  const typeFilesAccepts = {
    accept: 'image/*, .txt, .csv ',
    maxFiles: 3,
    noDrag: isLoading,
    noClick: isLoading
  }

  const handlerSubmit = () => {
    if (files.length > 0) {
      setIsLoading(true)
      setFiles([])
      setTimeout(() => {
        setIsLoading(false)
        setMessage({
          title: 'Estamos listo',
          main: 'tus archivos se han subido correctamente',
          footer: '',
          style: true
        })
        setStatusFiles(true)
      }, 5000)
    } else {
      setMessage({
        title: 'Ups, algo a ido mal',
        main: 'No hemos podido subir tu arhivo, compruebe que has cargado correctamente el archivo a la dropzone',
        footer: ' tienes que cargar tus  arhivo antes de poder subirlo ',
        style: false
      })
      setStatusFiles(true)
    }
  }
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections
  } = useDropzone(typeFilesAccepts)

  useEffect(() => {
    setFiles([])
    const isRejection = fileRejections.length > 0

    if (isRejection) {
      setMessage({
        title: 'Ups, algo a ido mal',
        main: 'No hemos podido cargar tu archivo, revisa el formato o ',
        footer:
          'solo se admiten imagenes, .txt y csv y solo  3 archivos a la vez ',
        style: false
      })
      setStatusFiles(true)
    } else {
      let tempFiles = []
      acceptedFiles.forEach(file => {
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result
          const tempFile = {
            name: file.name,
            size: `${file.size}bytes`,
            bufferData: binaryStr,
            type: file.type
          }
          setFiles(prev => [...prev, tempFile])
        }
        reader.readAsArrayBuffer(file)
      })
    }
  }, [acceptedFiles, fileRejections])

  const modalClose = () => {
    setStatusFiles(false)
  }

  const modalBody = (
    <Paper
      elevation={3}
      className={
        message.style ? classes.modalPaperWithStyle : classes.modalPaper
      }
    >
      <Typography variant="h5" component="h2" color="secondary">
        {message.title}
      </Typography>
      <Typography variant="subtitle1" component="p" color="secondary">
        {message.main}
      </Typography>
      <Typography variant="body2" component="p" color="secondary">
        {message.footer}
      </Typography>
      <Button
        variant="contained"
        color={message.style ? 'secondary' : 'primary'}
        onClick={modalClose}
        className={classes.closeButton}
        size="large"
      >
        Cerrar
      </Button>
    </Paper>
  )
  const isFiles = files.length > 0

  return (
    <Box
      display="flex"
      m={0}
      width="90%"
      gap={10}
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
    >
      <Paper elevation={3} className={classes.paper} {...getRootProps()}>
        <input {...getInputProps()} />

        {isLoading ? (
          <CircularProgress color="primary" />
        ) : isDragActive ? (
          <Typography
            variant="h4"
            component="h3"
            color="secondary"
            align="center"
          >
            SUELTA PARA AGREGAR
          </Typography>
        ) : isFiles ? (
          <ListFiles files={files} />
        ) : (
          <Typography
            variant="h4"
            component="h3"
            color="secondary"
            align="center"
          >
            ARRASTRA TUS ARCHIVOS AQUÍ
          </Typography>
        )}
      </Paper>
      <Button
        size="large"
        className={classes.upfileButton}
        variant="contained"
        color="primary"
        onClick={handlerSubmit}
      >
        Subir archivos
      </Button>
      <Modal className={classes.modal} open={statusFiles} onClose={modalClose}>
        {modalBody}
      </Modal>
    </Box>
  )
}
