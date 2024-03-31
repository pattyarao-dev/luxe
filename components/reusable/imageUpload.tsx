"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from 'next/image'
import { UploadButton } from "@uploadthing/react"
import { OurFileRouter } from "@/app/api/uploadthing/core"
const ImageUpload = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    return <>
        <div>
        <UploadButton<OurFileRouter, "imageUploader">
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                console.log(res[0].url);
                setImageUrl(res[0].url);
                alert("Upload Complete!");
            }}
            onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
            }}
            />
        </div>

        {imageUrl ? (
            <div>
                <Image className="w-full" src={imageUrl} width={500} height={500} alt="Sunset in the mountains" />
            </div>
        ) : null}
        
    </>
}

export default ImageUpload