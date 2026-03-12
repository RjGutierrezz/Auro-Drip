import { useState } from "react"
import type { CreateClothingInput } from "../api/clothing"

type Props = {
  onSubmit: (input: CreateClothingInput) => Promise<void>
}

export default function AddClothingItem({ onSubmit }: Props) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("Tops")
  const [color, setColor] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await onSubmit({ name, category, color})
      setName("")
      setCategory("Tops")
      setColor("")
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="add-clothing-form">
      <input value={name} onChange={(e) => setName(e.target.value)}
      placeholder="Name" required/>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Tops</option>
        <option>Bottoms</option>
        <option>Shoes</option>
        <option>Outerwear</option>
      </select>
    
      <input value={color} onChange={(e) => setColor(e.target.value)}
      placeholder="Color" required/>
      <button className="glass-card" type="submit" disabled={submitting}>{submitting ? "Adding..." : "Add"}</button>
    </form>
  )
}




