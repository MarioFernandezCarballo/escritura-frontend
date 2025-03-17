'use client'
import Hero from '@/components/hero/Hero'
import Layout from '@/components/layout/Layout'
import Contacto from '@/components/contact/page'

export default function Contact() {
    
    return (
        <>
            <Layout headerStyle={3} footerStyle={3}>
                <Hero from={"contacto"} />
                <Contacto />
            </Layout>
        </>
    )
}
