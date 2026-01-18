import React from 'react'

const Category = ({ setCategory }) => {
    const categories = [
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Clothes/Shoes",
                "Beauty/Health",
                "Sports",
                "Outdoor",
                "Home"
            ]
  return (
    <div>
        {categories.map((category) => (
            <h5 
                key={category} 
                style={{ cursor: "pointer" }}
                onClick={() => setCategory(category)}
            >
                {category}
            </h5>
        ))}
    </div>
  )
}

export default Category