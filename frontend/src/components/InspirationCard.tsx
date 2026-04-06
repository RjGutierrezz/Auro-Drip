type InspirationCardProps = {
  name: string
  vibe: string
  imageUrl: string
}

// not sure if its even worth adding the name of the image
const InspirationCard = ({name, vibe, imageUrl}: InspirationCardProps) => {
  return (
    <div>
      <article className="inspo-card glass-panel">
        <div className="inspo-image-container">
          {/* image from the api here */}
          <img src={imageUrl} alt={name} />
        </div>
      </article>
    </div>
  )
}

export default InspirationCard
