import { useRef } from "react"

// define the props this component expects
// the parent receive the call back and the preview
type Props = {
  onImageSelected: (file: File, previewUrl: string) => void
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
    
    const previewUrl = URL.createObjectURL(file)
    onImageSelected(file, previewUrl)
  }

	return (
		<div className="add-image-container glass-panel">
			<h3>Add images</h3>
			<button className="image-placeholder glass-panel" onClick={openPicker}>
				<p className="profile-hero-text">Drop your files here or Browse</p>
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
          <p className="profile-hero-text">No image selected yet</p>
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
