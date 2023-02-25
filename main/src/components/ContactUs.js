import React from "react"
import {useFormik} from "formik"
import * as Yup from "yup"

const ContactUs = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(45, "Nimen on oltava max. 40 merkkia pituinen")
                .required("Pakollinen kenttä"),
            email: Yup.string()
                .email("Virheellinen sähköpostiosoite")
                .required("Pakollinen kenttä"),
            message: Yup.string()
                .max(45, "Viestin on oltava max. 1000 merkkia pituinen")
                .required("Pakollinen kenttä"),
        }),
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                id="name"
                name="name"
                type="text"
                placeholder="Nimesi"
                onChange={formik.handleChange}
                // getting touched property
                onBlur={formik.handleBlur}
                value={formik.values.name}
            />
            {/*if the name field has been touched(clicked) and there is
             some validation errors, display <p>, else display null*/}
            {formik.touched.name && formik.errors.name ? <p>{formik.errors.name}</p> : null}
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Sähköpostiosoitteesi"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
            <textarea
                id="message"
                name="message"
                placeholder="Viestisi"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.message}
            />
            {formik.touched.message && formik.errors.message ? <p>{formik.errors.message}</p> : null}
            <button type="submit">Lähetä</button>
        </form>
    )
}
export default ContactUs