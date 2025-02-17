import { motion } from 'framer-motion';

interface AwardProps {
    title?: string
    organization?: string
    date?: string
    description?: string
}

export default function Award({title, organization, date, description} : AwardProps) {
    return (
        <motion.li 
            className="position-relative z-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5}}
            whileHover={{ x: 10 }}
        >
            <motion.p 
                className="fs-5 text-dark mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                {title}
            </motion.p>
            <motion.div 
                className="d-flex gap-4"
                style={{listStyle: 'none'}}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
            >
                <p className="mb-2">{date}</p>         
                <p className="text-primary-3 mb-0">{organization}</p>
            </motion.div>
            <motion.p 
                className="mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
            >
                {description}
            </motion.p>
        </motion.li>
    )
}