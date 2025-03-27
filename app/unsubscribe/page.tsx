'use client'
import Layout from "@/components/layout/Layout";
import { useSubscribers } from "@/util/api";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Unsubscribe() {
    const [newEmail, setNewEmail] = useState('');
    const { deleteSubscriberByEmail } = useSubscribers()

    const handleUnsubscribe = () => {
        deleteSubscriberByEmail(newEmail)
    }
    return (
        <Layout>
            <section className="custom-header">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-md-12 mt-5 mx-auto">
                            <h2>Darse de baja</h2>
                            <p>Para dejar de recibir correos de Mario carballo, introduce tu email aquí</p>
                            <input 
                                className="d-inline-block form-control"
                                type="email" 
                                name="email" 
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="Escribe tu email" 
                                required 
                                aria-label="Correo electrónico para suscripción"
                                aria-required="true"
                                aria-describedby="form-status"
                            />
                            <button 
                                type="submit" 
                                title="unsubscribe-submit"
                                style={{width: 'fit-content'}}
                                className="btn btn-secondary-3 mc-button fw-medium mx-auto mx-md-0"
                                onClick={handleUnsubscribe}>
                                Date de baja
                                <i className="ri-arrow-right-up-line fw-medium"/>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}