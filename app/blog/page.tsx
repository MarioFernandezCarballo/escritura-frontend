import BlogPost from '@/components/blog/BlogPost'
import Layout from '@/components/layout/Layout'

export default function Blog() {
    return (
        <>
            <Layout headerStyle={3} footerStyle={3}>
                <section className="section-home-3 bg-1000 pb-130 pt-96 section-work">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div id="blog" className="blog">
                                    <h3>Blog Posts</h3>
                                    <div className="position-relative pt-4">
                                        <BlogPost showItem={6} style={3} showPagination />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}
