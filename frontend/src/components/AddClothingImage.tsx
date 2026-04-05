import { h3 } from "framer-motion/client";
import { useRef } from "react"

// define the props this component expects
type Props = {
  onImageSelected: (imageUrl: string) => void
  imageUrl: string
}




const AddClothingImage = ( {onImageSelected, imageUrl}: Props ) => {

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // so we can open a file picker when the button is clicked
  const openPicker = () => {
    fileInputRef.current?.click()
  }

  // only runs when the user selects a file from their computer
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // to get the first file the user selected
    const file = e.target.files?.[0]

    // error case if no file was selected
    if (!file) return

    // filereader() is used to read the selected file
    // converts image into a url
    const reader = new FileReader()

    // this runs after the file has finished being read
    reader.onload = () => {
      const result = reader.result

      // makes sure the result is a string before using it
      if (typeof result === "string") {

        // sends the image string back to the parent component
        onImageSelected(result)
      }
    }

    // starts reading the selected file URL
    reader.readAsDataURL(file)
  }

	return (
		<div className="add-image-container glass-panel">
			<h3>Add images</h3>
			<button className="image-placeholder glass-panel" onClick={openPicker}>
				<p>Drop your files here or Browse</p>
			</button>

      <input  
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none"}}
      />

      <div className="added-item-image glass-panel">
        {imageUrl ? (
          <img className="selected-image-preview" src={imageUrl} alt="Selected clothing" />
        ) : (
          <p>No image selected yet</p>
        )
        }
      </div>

			{/* <div> */}
			{/* 	<p className="added-item-image glass-panel">Polo.png</p> */}
			{/* 	<p className="added-item-image glass-panel">Polo.png</p> */}
			{/* 	<p className="added-item-image glass-panel">Polo.png</p> */}
			{/* </div> */}
			<div className="cancel-container">
				<button className="cancel-btn glass-panel">Cancel</button>
			</div>
		</div>
	);
};

export default AddClothingImage;
