"use client"
import { useRef, useState } from "react"
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next"

type ImageUploadProps = {
  onUploadSuccess?: (url: string) => void
}

export const ImageUpload = ({ onUploadSuccess }: ImageUploadProps) => {
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const authenticator = async () => {
    try {
      const res = await fetch("/api/upload-auth")
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text)
      }
      const data = await res.json()
      const { signature, expire, token, publicKey } = data
      return { signature, expire, token, publicKey }
    } catch (e) {
      console.log(e)
      throw new Error("Auth failed")
    }
  }

  const handleUpload = async () => {
    const inp = fileInputRef.current
    if (!inp || !inp.files || inp.files.length === 0) {
      alert("Please select a file to upload")
      return
    }

    const file = inp.files[0]

    
    let authParams
    try {
      authParams = await authenticator()
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError)
      return
    }
    const { signature, expire, token, publicKey } = authParams

    const abortController = new AbortController()

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name, 
        
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100)
        },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
      })
      console.log("Upload response:", uploadResponse)
      if (uploadResponse.url) {
        onUploadSuccess?.(uploadResponse.url)
      }
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason)
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message)
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message)
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message)
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error)
      }
    }
  }

  return (
    <>
      {/* File input element using React ref */}
      <input type="file" ref={fileInputRef} accept="image/*" />
      {/* Button to trigger the upload process */}
      <button type="button" onClick={handleUpload}>
        Upload file
      </button>
      <br />
      {/* Display the current upload progress */}
      Upload progress: <progress value={progress} max={100}></progress>
    </>
  )
}
