import BlogPost from '@/components/blog/BlogPost'
import Layout from '@/components/layout/Layout'

export default function Blog() {
    return (
        <>
            <Layout headerStyle={3} footerStyle={3}>
                <section className="section-home-3 pb-130 pt-50">
                    <div className="container">
                        <div className="row align-items-start">
                            <div className="col-xl-8 col-md-12 mt-4 mx-auto">
                                <div id="blog" className="blog">
                                    <h3>Entradas al blog</h3>
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
