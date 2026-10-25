import { useState, useEffect } from 'react'
import './ImageGallery.css'

function ImageGallery() {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchImages = async (pageNum) => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${pageNum}&limit=9`
      )
      const data = await res.json()
      const formatted = data.map((item) => ({
        id: item.id,
        url: item.download_url,
        author: item.author,
      }))
      setImages((prev) => (pageNum === 1 ? formatted : [...prev, ...formatted]))
    } catch (err) {
      console.error('Failed to fetch images')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages(1)
  }, [])

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchImages(nextPage)
  }

  return (
    <div className="gallery">
      <h2>Image Gallery</h2>

      <div className="grid">
        {images.map((img) => (
          <div key={img.id} className="card">
            <img src={img.url} alt={`Photo by ${img.author}`} loading="lazy" />
            <p className="author">{img.author}</p>
          </div>
        ))}
      </div>

      {loading && <p className="status">Loading...</p>}

      {!loading && images.length > 0 && (
        <div className="load-more-wrap">
          <button className="load-more" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageGallery
