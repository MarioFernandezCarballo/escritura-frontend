import Link from "next/link"

export default function BlogCard3({ item }: any) {
    return (
        <div className="card__inner rounded-4 border border-secondary-3 bg-white p-lg-5 p-md-4 p-3 d-flex gap-4 position-relative flex-row justify-content-between flex-lg-row" style={{ height: '250px' }}>
            <div className="d-flex flex-column">
                <p className="fs-18 text-primary-3">{Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || 'Blog'}</p>
                <Link href={`/blog/${item.id}`}>
                    <p className="fs-26 text-dark">{item.title}</p>
                </Link>
                <p className="mb-0 text-dark">{item.content.replace(/<[^>]*>/g, '').substring(0, 150)}...</p>
            </div>  
            
            <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
                <img 
                    className="rounded-3" 
                    src={item.image_url || "assets/imgs/home-page-3/blog/img-1.png"} 
                    alt={item.title}
                    style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }} 
                />
            </div>
        </div>
    )
}
