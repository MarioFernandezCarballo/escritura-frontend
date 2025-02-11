import Link from 'next/link'

export default function Contacto () {
    return (
        <div id="contact" className="contact pt-70">
            <h3>Contacto</h3>
            <div className="d-flex align-items-center gap-5 mt-4">
                <Link href="mailto:mariofernandezcarballo@gmail.com">
                    <i className="ri-mail-fill text-primary-3 fs-7" />
                    <span className="text-300 fs-6 ms-2">mariofernandezcarballo@gmail.com</span>
                </Link>
                <Link href="https://x.com/MarioFCarballo">
                    <i className="ri-twitter-x-line text-primary-3 fs-7" />
                    <span className="text-300 fs-6 ms-2">@MarioFCarballo</span>
                </Link>
                <Link href="https://bsky.app/profile/mariocarballo.bsky.social">
                    <i className="ri-bluesky-fill text-primary-3 fs-7" />
                    <span className="text-300 fs-6 ms-2">@mariocarballo.bsky.social</span>
                </Link>
            </div>
            <div className="position-relative z-2 mt-4">
                <h5 className="text-dark mb-3">Hablemos</h5>
                <form action="#">
                    <div className="row g-3">
                        <div className="col-md-6 ">
                            <input type="text" className="form-control bg-3 border border-secondary-3 rounded-3" id="name" name="name" placeholder="Nombre" aria-label="username" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control bg-3 border border-secondary-3 rounded-3" id="email" name="email" placeholder="Emaill" aria-label="email" />
                        </div>
                        <div className="col-md-12">
                            <input type="text" className="form-control bg-3 border border-secondary-3 rounded-3" id="subject" name="subject" placeholder="Asunto" aria-label="subject" />
                        </div>
                        <div className="col-12">
                            <textarea className="form-control bg-3 border border-secondary-3 rounded-3" id="message" name="message" placeholder="Mensaje" aria-label="With textarea" defaultValue={""} />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-secondary-3 fw-medium">
                                Enviar mensaje
                                <i className="ri-arrow-right-up-line fw-medium" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}