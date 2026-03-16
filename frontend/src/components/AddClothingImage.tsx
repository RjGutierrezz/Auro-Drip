const AddClothingImage = () => {
	return (
		<div className="add-image-container glass-panel">
			<p>Add images</p>
			<div className="image-placeholder glass-panel">
				<p>Drop your files here or Browse</p>
			</div>
      <div >
        {/* TODO: need to add a delete icon here as well */}
        <p className="added-item-image glass-panel" >Polo.png</p>
        <p className="added-item-image glass-panel" >Polo.png</p>
        <p className="added-item-image glass-panel" >Polo.png</p>
      </div>
      <div className="cancel-container">
        <button className="cancel-btn glass-panel">Cancel</button>
      </div>
		</div>
	);
};

export default AddClothingImage;
