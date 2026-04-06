import { inspitationItemsPlaceholder } from "../constants"
import InspirationCard from "./InspirationCard"

const DripInspiration = () => {
  return (
    <div className="drip-inspo-container">
      <div className="inspo-grid">
        { inspitationItemsPlaceholder.map((clothes) => (
          <InspirationCard 
            key={clothes.id}
            name={clothes.name}
            vibe={clothes.vibe}
            imageUrl={clothes.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}

export default DripInspiration
