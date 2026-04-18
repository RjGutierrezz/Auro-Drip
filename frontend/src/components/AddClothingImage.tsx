import { type ChangeEvent, type DragEvent, useRef, useState } from "react";

// define the props this component expects
// the parent receive the call back and the preview
type Props = {
	onImageSelected: (file: File, previewUrl: string) => void;
	imageUrl: string;
};

const AddClothingImage = ({ onImageSelected, imageUrl }: Props) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	// so we can open a file picker when the button is clicked
	const openPicker = () => {
		fileInputRef.current?.click();
	};

	const handleSelectedFile = (file: File) => {
		if (!file.type.startsWith("image/")) {
			return;
		}

		const previewUrl = URL.createObjectURL(file);
		onImageSelected(file, previewUrl);
	};

	// only runs when the user selects a file from their computer
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		// to get the first file the user selected
		const file = e.target.files?.[0];

		// error case if no file was selected
		if (!file) return;

		// const previewUrl = URL.createObjectURL(file)
		// onImageSelected(file, previewUrl)
		handleSelectedFile(file);
	};

	const handleDragOver = (event: DragEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsDragging(false);

		const file = event.dataTransfer.files?.[0];
		if (!file) return;

		handleSelectedFile(file);
	};

	const handleDropLeave = () => {
		setIsDragging(false);
	};

	return (
		<div className="add-image-container glass-panel">
			<h3>Add images</h3>
			<button
				className={
					isDragging
						? "image-placeholder image-placeholder-active glass-panel"
						: "image-placeholder glass-panel"
				}
				onClick={openPicker}
				onDragOver={handleDragOver}
				onDragLeave={handleDropLeave}
				onDrop={handleDrop}
			>
				<p className="profile-hero-text">
					{isDragging
						? "Drop your image here"
						: "Drop your files here or Browse"}
				</p>
			</button>

			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				style={{ display: "none" }}
			/>

			<div className="added-item-image glass-panel">
				{imageUrl ? (
					<img
						className="selected-image-preview"
						src={imageUrl}
						alt="Selected clothing"
					/>
				) : (
					<p className="profile-hero-text">No image selected yet</p>
				)}
			</div>

			{/* <div> */}
			{/* 	<p className="added-item-image glass-panel">Polo.png</p> */}
			{/* 	<p className="added-item-image glass-panel">Polo.png</p> */}
			{/* 	<p className="added-item-image glass-panel">Polo.png</p> */}
			{/* </div> */}
			<div className="cancel-container">
				<button className="cancel-btn glass-panel">Delete Image</button>
			</div>
		</div>
	);
};

export default AddClothingImage;
