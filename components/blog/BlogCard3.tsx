import Link from "next/link"

export default function BlogCard3({ item }: any) {
    return (
        <div className="card-services rounded-4 border border-secondary-3 bg-white p-lg-4 p-md-4 p-3 mb-3">
            <p className="fs-18 text-primary-3">{item.category}</p>
            <div className="d-flex align-items-center gap-5">
                <div>
                    <Link href={`/blog/${item.id}`}>
                        <p className="fs-26 text-dark">{item.title}</p>
                    </Link>
                    <p className="mb-0">{item.excerpt}</p>
                </div>
                <div className="image-right">
                    <img className="rounded-3 w-100 h-100" src={item.img} alt={item.title} />
                </div>
            </div>
        </div>
    )
}
