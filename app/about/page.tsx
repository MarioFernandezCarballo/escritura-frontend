'use client'
import Layout from "@/components/layout/Layout"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Hero from "@/components/hero/Hero"
import Premios from "@/components/premios/page"
import SubscribeForm from "@/components/subscribeForm/SubscribeForm"
import Contacto from "@/components/contact/page"

export default function BlogDetails() {
    const Router = useParams();

    return (
        <Layout>
            <Hero from={"about"} />
			<section className="section-home-3 custom-header">
				<div className="container">
					<div className="row align-items-start">
						<div id="about" className="col-xl-8 col-md-12 mt-5 mx-auto">
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
							>
								Sobre mí
							</motion.h2>
							<motion.img 
								className="rounded-5 d-none" 
								src="assets/imgs/home-page-3/hero/img-1.webp" 
								alt="Mario Carballo - Escritor"
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 300 }}
							/>
							<p>Crecí entre ecuaciones y cohetes, pero fue en los universos de Asimov donde encontré mi verdadera pasión. Un día, mientras disfrutaba de “Las corrientes del espacio”, me descubrí imaginando finales alternativos y mundos inexplorados.</p>
							<p>¿Por qué no crear mis propias historias?</p>
                            <p>Este impulso dio vida a “Al otro lado de la esfera” en 2020, mi primera novela. Con sus cosas buenas y no tan buenas, es la primera, la que cala, la que rompe el hielo de una vocación. Como el primer lanzamiento de un Ariane.</p>
                            <p>Hoy, varios manuscritos, relatos y certámenes más tarde, sé que esto es lo que quiero hacer. No busco reinventar la ciencia ficción ni la fantasía. Busco contar las historias que me hubiera gustado leer, explorar ideas que me fascinan y compartir reflexiones sobre lo que nos hace humanos, incluso cuando imaginamos no serlo.</p>
                            <p>Mi viaje como escritor apenas comienza, y me alegra que estés aquí para acompañarme.</p>
						</div> 
					</div>
				</div>
			</section>
			<section id="cta" className="section-home-3 custom-header">
				<div className="container">
					<div className="row align-items-start">
						<div className="col-xl-8 col-md-12 mt-5 mx-auto mb-5">
							<SubscribeForm />
                        </div> 
					</div>
				</div>
			</section>
			<section id="premios">
				<div className="container">
					<div className="row">
						<div className="col-xl-8 col-md-12 mt-5 mx-auto">
							<h2>Reconocimientos</h2>
							<Premios/>
						</div>
					</div>
				</div>
			</section>
			<Contacto />
        </Layout>
    );
}
