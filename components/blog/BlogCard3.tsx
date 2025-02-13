import Link from "next/link"

export default function BlogCard3({ item }: any) {
    return (
        <div className="card-services rounded-4 border border-secondary-3 bg-white p-lg-4 p-md-4 p-3 mb-3 zoom-img" style={{ height: '250px' }}>
            <p className="fs-18 text-primary-3">{Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || 'Blog'}</p>
            <div className="d-flex align-items-center gap-5">
                <div>
                    <Link href={`/blog/${item.id}`}>
                        <p className="fs-26 text-dark">{item.title}</p>
                    </Link>
                    <p className="mb-0">{item.content.replace(/<[^>]*>/g, '').substring(0, 150)}...</p>
                </div>
                <div className="image-right" style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
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
        </div>
    )
}
