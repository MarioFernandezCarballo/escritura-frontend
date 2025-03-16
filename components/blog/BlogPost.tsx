
'use client'
import React, { useEffect, useState } from "react"
import BlogCard3 from "./BlogCard3"
import Pagination from "./Pagination"
import { API_BASE_URL } from "../../util/config"

interface BlogPostProps {
    style?: number
    showItem?: number
    showPagination?: boolean
    
}

export default function BlogPost({ style, showItem, showPagination }: BlogPostProps) {
    const [posts, setPosts] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [currentPage, setCurrentPage] = useState<number>(1)
    const paginationItem: number = 4
    const [pagination, setPagination] = useState<number[]>([])
    const [limit, setLimit] = useState<number>(showItem || 0)
    const [pages, setPages] = useState<number>(0)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/blog/posts`)
                if (!response.ok) {
                    throw new Error('Error al obtener los posts')
                }
                const data = await response.json()
                setPosts(data)
                setPages(Math.ceil(data.length / limit))
                setLoading(false)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido')
                setLoading(false)
            }
        }
        fetchPosts()
    }, [limit])

    useEffect(() => {
        if (posts.length > 0) {
            createPagination()
        }
    }, [limit, pages, posts.length])

    const createPagination = (): void => {
        const arr: number[] = new Array(Math.ceil(posts.length / limit))
            .fill(undefined)
            .map((_, idx) => idx + 1)

        setPagination(arr)
        setPages(Math.ceil(posts.length / limit))
    }

    const startIndex: number = currentPage * limit - limit
    const endIndex: number = startIndex + limit
    const getPaginatedProducts: any[] = posts.slice(startIndex, endIndex)

    const start: number = Math.floor((currentPage - 1) / paginationItem) * paginationItem
    const end: number = start + paginationItem
    const getPaginationGroup: number[] = pagination.slice(start, end)

    const next = (): void => {
        setCurrentPage((page) => page + 1)
    }

    const prev = (): void => {
        setCurrentPage((page) => page - 1)
    }

    const handleActive = (item: number): void => {
        setCurrentPage(item)
    }
    return (
        <>
            {loading && <h3>Cargando posts...</h3>}
            {error && <h3>Error: {error}</h3>}
            {!loading && !error && getPaginatedProducts.length === 0 && (
                <h3>No se encontraron posts</h3>
            )}

            {getPaginatedProducts.map(item => (
                <div className="typical" key={item.id}>
                    <BlogCard3 item={item} />
                </div>
            ))}
    
                    <div className='d-flex flex-column align-items-center gap-4'>
            {showPagination &&
                <Pagination
                    getPaginationGroup={
                        getPaginationGroup
                    }
                    currentPage={currentPage}
                    pages={pages}
                    next={next}
                    prev={prev}
                    handleActive={handleActive}
                />
            }
            </div>
        </>
    )
}
