import ClothingCard from "./ClothingCard";

// dont need this anymore since we can feed in data to our database
// import { wardrobeClothesPlaceholder } from "../constants"

import { useEffect, useState } from "react";
import {
	type ClothingItems,
	deleteClothingItem,
	getClothingItems,
	updateClothingItem,
} from "../api/clothing";
import { itemColorPalette } from "../constants";

type WardrobeClothesProps = {
	activeCategory: string;
	searchTerm: string;
	sortOrder: "name-dec" | "name-asc";
};

// for message and visual type for the success or error 
type ToastState = {
  message: string
  type: "success" | "error"
} | null


const WardrobeClothes = ({
	activeCategory,
	searchTerm,
	sortOrder,
}: WardrobeClothesProps) => {
	const [favoritedById, setFavoritedById] = useState<Record<string, boolean>>(
		{},
	);

	const toggleFavorite = (id: string) => {
		setFavoritedById((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

  // states
	// starts an empty array
	const [items, setItems] = useState<ClothingItems[]>([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [editingId, setEditingId] = useState<string | null>(null);
	const [editName, setEditName] = useState("");
	const [editCategory, setEditCategory] = useState("Tops");
	const [editColor, setEditColor] = useState(itemColorPalette[0]);

  // true while patch request is in flight
  const [isSavingEdit, setIsSavingEdit] = useState(false)

  const [toast, setToast] = useState<ToastState>(null)

  // toast helper: resuable helper to show a toast and then auto hides it after timer
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type })
    window.setTimeout(() => setToast(null), 2200)
  }

	const fetchItems = async () => {
		setLoading(true);
		setError(null);

		try {
			// check to see if the data is there
			const data = await getClothingItems();
			setItems(data);
		} catch {
			setError("We couldn't load your wardrobe right now.");
		} finally {
			setLoading(false);
		}
	};

  // this use effect is for data fetch on amount
	useEffect(() => {
		// To use async inside useEffect you have to do the ff
		fetchItems();
	}, []);

  useEffect(() => {
    // only listens when the panel is open
    if (!editingId) return

    // handler for keyboard events
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cancelEdit()
      }
    }

    // register listener when panel opens
    window.addEventListener("keydown", onKeyDown)

    // cleanup listener when panel closes
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [editingId])


	if (error) {
		return (
			<div className="state-card error-state">
				<h3>Something went wrong</h3>
				<p>{error}</p>
				<button className="retry-btn" onClick={fetchItems}>
					Try again
				</button>
			</div>
		);
	}
  
	// checking error cases
	if (loading) {
		// updating the loading screen so it looks more professional
		return (
			<section className="clothing-grid">
				{Array.from({ length: 8 }).map((_, i) => (
					<article key={i} className="clothing-card skeleton-card">
						<div className="clothing-image-container skeleton-block" />
						<div className="clothing-body">
							<div className="skeleton-line skeleton-line-title" />
							<div className="skeleton-line skeleton-line-meta" />
						</div>
					</article>
				))}
			</section>
		);
	} else if (error) {
		return <p>{error}</p>;
	} else if (items.length === 0) {
		return <p>There are no clothes yet 😓. Start uploading!</p>;
	}

	// category filter
	const filteredItems =
		activeCategory === "All"
			? items
			: items.filter((item) => item.category === activeCategory);

	// error cases for the empty storage or filtered items
	// if (!error && items.length === 0) {
	// 	return (
	// 		<div className="state-card empty-state">
	// 			<h3>Your wardrobe is empty</h3>
	// 			<p>Add your first item from the Add Item page to get started.</p>
	// 		</div>
	// 	);
	// }
	//
	// if (!error && filteredItems.length === 0) {
	// 	return (
	// 		<div className="state-card empty-state">
	// 			<h3>No items in "{activeCategory}"</h3>
	// 			<p>Try another category or add a new item in this category.</p>
	// 		</div>
	// 	);
	// }

	// delete handler
	const handleDelete = async (id: string) => {
		try {
			await deleteClothingItem(id);

			// leave the id's that we are not trying to delete
			setItems((prev) => prev.filter((item) => item.id !== id));

      showToast("Item deleted", "success")
		} catch (error) {
			setError("Could not delete the item.");
      showToast("Delete failed", "error")
		}
	};

	const startEdit = (item: ClothingItems) => {
		setEditingId(item.id);
		setEditName(item.name);
		setEditCategory(item.category);
		setEditColor(item.color);
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditName("");
		setEditCategory("Tops");
		setEditColor(itemColorPalette[0]);
	};




	const saveEdit = async () => {
		if (!editingId) return;
		try {
			const updated = await updateClothingItem(editingId, {
				name: editName,
				category: editCategory,
				color: editColor,
			});

			setItems((prev) =>
				prev.map((item) => (item.id === editingId ? updated : item)),
			);
        
			cancelEdit();
      showToast("Changes saved" , "success")
		} catch (error) {
			setError("Could not update item.");
      showToast("Update failed", "error")
		}
	};

	const normalizeSearch = searchTerm.trim().toLowerCase();

  // search filter
  const searchFiltered =
		normalizeSearch.length === 0
			? filteredItems
			: filteredItems.filter((item) =>
					item.name.toLowerCase().includes(normalizeSearch),
				);

  // sort by copying first so we never mutate original array
  const visibleItems = [...searchFiltered].sort((a, b) => {
    const compare = a.name.localeCompare(b.name)
    return sortOrder === "name-asc" ? compare : -compare
  })


  // friendly empty states for search and category
  if (!loading && !error && items.length === 0) {
		return (
			<div className="state-card empty-state">
				<h3>Your wardrobe is empty</h3>
				<p>Add your first item from the Add Item page to get started.</p>
			</div>
		);
  }


  if (!loading && !error && visibleItems.length === 0) {
		return (
			<div className="state-card empty-state">
				<h3>No result for this filter/search in "{activeCategory}"</h3>
				<p>Try another category or add a new item in this category.</p>
			</div>
		);
  }


	return (
		<section className="clothing-grid">
			{/* to loop through each (filtered) items and re-render each card */}
			{visibleItems.map((clothes) => (
				<div key={clothes.id}>
					<ClothingCard
						key={clothes.id}
						name={clothes.name}
						category={clothes.category}
						color={clothes.color}
						isFavorited={!!favoritedById[clothes.id]}
						onToggleFavorite={() => toggleFavorite(clothes.id)}
						onDelete={() => handleDelete(clothes.id)}
						onEdit={() => startEdit(clothes)}
					/>
				</div>
			))}
			{editingId && (
				<div className="edit-backdrop" onClick={cancelEdit}>
					<div className="edit-panel" onClick={(e) => e.stopPropagation()}>
						<div className="edit-panel-header">
							<h3>Edit Item</h3>
							<button className="edit-close-btn" onClick={cancelEdit}>
								✕
							</button>
						</div>

						<div className="edit-panel-body">
							<div className="edit-field-group">
								<label className="edit-label">Name</label>
								<input
									className="edit-input"
									value={editName}
									onChange={(e) => setEditName(e.target.value)}
									placeholder="e.g. Denim Pants"
								/>
							</div>

							<div className="edit-field-group">
								<label className="edit-label">Category</label>
								<select
									className="edit-input edit-select"
									value={editCategory}
									onChange={(e) => setEditCategory(e.target.value)}
								>
									<option>Tops</option>
									<option>Bottoms</option>
									<option>Shoes</option>
									<option>Outerwear</option>
								</select>
							</div>

							<div className="edit-field-group">
								<label className="edit-label">Color</label>
								<div
									className="color-palette"
									role="radiogroup"
									aria-label="Edit item color"
								>
									{itemColorPalette.map((swatch) => (
										<button
											key={swatch}
											type="button"
											className={
												editColor === swatch
													? "color-swatch active"
													: "color-swatch"
											}
											style={{ backgroundColor: swatch }}
											onClick={() => setEditColor(swatch)}
											aria-label={`Select color ${swatch}`}
										/>
									))}
								</div>
							</div>
						</div>

						<div className="edit-panel-actions">
							<button className="edit-btn-save" onClick={saveEdit} disabled={isSavingEdit}>
                {isSavingEdit ? "Saving" : "Save Changes"}
							</button>
							<button className="edit-btn-cancel" onClick={cancelEdit}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

      {/* render toast UI */}
      {
        toast && (
          <div className="toast-stack">
            {/* the class name depends if the type is success or error */}
            <div className={toast.type === "success" ? "toast toast-success" :
              "toast toast-error"}>
              {toast.message}
            </div>
          </div>
        )
      }
		</section>
	);
};

export default WardrobeClothes;
