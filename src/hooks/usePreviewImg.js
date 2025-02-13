import { useState } from 'react'
import useShowToast from './useShowToast'

const usePreviewImg=()=>{
    const [selectedFile, setSelectedFile] = useState(null)
    const showToast = useShowToast()
    const maxFileSizeInBytes  = 2 * 1024 *1024

    const handleImageChange = (e) =>{
        const file = e.target.files[0]
        if(file && file.type.startsWith('image/')){
            if(file.size > maxFileSizeInBytes){
                showToast("Error", "file size must be less than 2mb", "error")
                setSelectedFile(null)
                return
            }
            const reader = new FileReader()

            reader.onloadend = () =>{
                setSelectedFile(reader.result)
            }
            reader.readAsDataURL(file)
        }else{
            showToast("Error", "Plese select an image file", "eror")
            setSelectedFile(null)
        }
    }
    return {selectedFile, handleImageChange, setSelectedFile}
}

export default usePreviewImg