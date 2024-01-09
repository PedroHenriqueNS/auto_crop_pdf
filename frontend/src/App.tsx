import { useMemo, useState } from 'react'
import './App.css'

import { TFile } from './common.types'
import { useDropzone } from 'react-dropzone'
import Header from './components/Header'
import Button from './components/Button'



const baseStyle = {
  borderColor: '#888',
  borderStyle: 'dashed',
  borderWidth: '3px',
  outline: 'none',
  transition: 'all .24s ease-in-out',
};

const acceptStyle = {
  borderColor: '#00e676',
  backgroundColor: 'rgb(0, 230, 118, 0.1)'
};

const rejectStyle = {
  borderColor: '#ff1744',
  backgroundColor: 'rgb(255, 23, 68, 0.1)'
};



function App() {
  const [isPdfAdded, setIsPdfAdded] = useState(false)
  const [pdfs, setPdfs] = useState<TFile[]>([])
  const [imagePreview, setImagePreview] = useState()



  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject } = useDropzone({
    multiple: true,
    accept: { 'application/pdf': ['.pdf'] },
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length == 0) return // TODO: Add Reject Animation for drag and drop

      const files: TFile[] = []
      let filesIndex = pdfs.length

      acceptedFiles.forEach((file: File) => {
        files.push({
          id: filesIndex,
          cutBairro: false,
          file,
        })
        filesIndex++
      })

      if (!isPdfAdded) {
        setPdfs(files)
        handleShowPreview(0)
      } else {
        setPdfs(prevState => [...prevState, ...files])
      }
      setIsPdfAdded(true)
    }
  })

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragAccept,
    isDragReject
  ]);

  const handleChangeBairro = (id: number) => {
    const pdfs_raw: TFile[] = []

    pdfs.forEach(pdf => {
      if (pdf.id === id) pdf.cutBairro = !pdf.cutBairro
      pdfs_raw.push(pdf)
    })

    setPdfs(pdfs_raw)
  }

  const handleShowPreview = async (id: number) => {
    console.log("Teste " + id)
  }

  const handleCutPDF = async () => {
    console.log("Teste")
  }



  return (
    <>
      <Header />

      <main className='main_content'>
        {isPdfAdded ?
          <div className='flex w-full text-center justify-evenly'>
            <div className='pdf_controller'>
              <div className='flex w-full m-2 justify-between'>
                <h3 className='w-[60%] text-left'>Nome</h3>
                <h3 className='w-[20%] text-right'>Cortar bairros</h3>
                <div className='w-[20%]' />
              </div>
              {pdfs.map(pdf => (
                <div className='flex w-full m-2 justify-between'>
                  <p className='w-[60%] text-left text-ellipsis overflow-hidden whitespace-nowrap'>{pdf.file.name}</p>
                  <input
                    className='w-[20%]'
                    type='checkbox'
                    checked={pdf.cutBairro}
                    onChange={() => handleChangeBairro(pdf.id)}
                  />
                  <button
                    className='w-[14%] py-1'
                    onClick={handleCutPDF}
                  >Preview</button>
                </div>
              ))}

              <button
                className='w-[20%] my-10'
                onClick={() => console.log("Cortar")}
              >Cortar</button>

              <div className='rounded-2xl p-5 w-[50%] h-24 text-center justify-center cursor-pointer transition-all duration-1000 ease-in-out'  {...getRootProps({ style })}>
                <div className='absolute flex text-center justify-center transition-all duration-500' style={{ opacity: isDragReject ? 100 : 0 }}>
                  <p>Um dos arquivos arrastados <strong>não é PDF</strong></p>
                </div>

                <div className='w-full h-full flex flex-col text-center justify-center transition-all duration-500' style={{ opacity: isDragReject ? 0 : 100 }}>
                  <h1 className='text-2xl'>Adicione um arquivo PDF</h1>
                  <p>Clique aqui ou arraste e solte</p>
                </div>
              </div>
            </div>
            <div className='pdf_preview'>
              <h1>Preview</h1>
            </div>
          </div>
          :
          <div className='add_pdf_container' {...getRootProps({ style })}>
            <div className='absolute flex text-center justify-center transition-all duration-500' style={{ opacity: isDragReject ? 100 : 0 }}>
              <p>Um dos arquivos arrastados <strong>não é PDF</strong></p>
            </div>

            <div className='w-full h-full flex flex-col text-center justify-center transition-all duration-500' style={{ opacity: isDragReject ? 0 : 100 }}>
              <h1>Adicione um arquivo PDF</h1>
              <p>Clique aqui ou arraste e solte</p>
            </div>
          </div>
        }
      </main>
    </>
  )
}

export default App
