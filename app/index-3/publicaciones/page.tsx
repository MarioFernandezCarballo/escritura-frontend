'use client'
import Link from 'next/link'


export default function Publicaciones() {
	return (
		<>
        <div id="publicaciones" className="typical pt-70">
            <h3>Publicaciones</h3>
            <div className="container px-0 pt-4">
                <div className="row">
                    <div className="card-scroll">
                        <div className="cards">
                            <div className="card-custom pt-0" data-index={0}>
                                <div className="card__inner rounded-4 border border-secondary-3 bg-white p-lg-5 p-md-4 p-3">
                                    <div className="card__image-container w-50 rounded-0 zoom-img position-relative">
                                        <img className="object-fit-contain w-100 h-50" src="assets/imgs/home-page-3/typical/Esfera.jpg" alt="zelio" style={{ objectFit: 'cover' }} />
                                        <Link href="https://www.amazon.es/otro-lado-esfera-Mario-Fern%C3%A1ndez/dp/B08B33M1WS" target="_blank" className="card-image-overlay position-absolute start-0 end-0 w-100 h-100" />
                                    </div>
                                    <div className="card__content px-md-4 px-3 pt-lg-0 pb-lg-8 pb-5">
                                        <div className="card__title mb-0 mb-lg-2">
                                            <p className="text-300 fs-5 mb-0">2020</p>
                                            <Link href="#">
                                                <p className="fs-3 text-dark">Al otro lado de la esfera</p>
                                            </Link>
                                        </div>
                                        <p className="text-300 mb-lg-auto mb-md-4 mb-3">2230 EG. Ciudad de Teno. Imoye se prepara en secreto para el primer viaje en el tiempo de la historia. El Centro de Defensa Espacial la eligió por su maestría en los combates de voluntad, y el futuro de la población de la Tierra está en sus manos. Debe recabar información del pasado para hacer frente al verdugo del mundo, que se acerca desde lo más profundo del cosmos. ¿Serán suficientes sus habilidades?</p>
                                        <p className="text-300 mb-lg-auto mb-md-4 mb-3">2022 DC. Ciudad de Boston. El sueño de Mark siempre fue formar parte de Edén. Ellos son los defensores del libre pensamiento. La punta de lanza contra las grandes corporaciones. Su último intento ha dado resultado, y la organización se ha fijado en él para llevar a cabo su movimiento final. Ahora que ha conseguido entrar en Edén, ya no hay marcha atrás...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
								
		</>
	)
}
