import React from "react"
import {useFormik} from "formik"
import * as Yup from "yup"
import store from "../store";
import {setDisplayOrderNav} from "../store/order";

const ContactUs = () => {
    store.dispatch(setDisplayOrderNav(false));

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(45, "Nimen on oltava max. 40 merkkia pituinen")
                .required("Pakollinen kenttä"),
            email: Yup.string()
                .email("Virheellinen sähköpostiosoite")
                .required("Pakollinen kenttä"),
            subject: Yup.string()
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
        <div className="contactUsMainDiv">
            <h2>Onko kysyttävää?</h2>
            <h3>Lähetä meille viestin ja me vastaamme mahdollisimman pian</h3>
            <form onSubmit={formik.handleSubmit} className="contactUs">
                <div id="flexRows">
                    <div id="gridContainer">
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
                    </div>
                    <div id="gridContainer">
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
                    </div>
                </div>

                <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Aihe"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.subject}
                />
                {formik.touched.subject && formik.errors.subject ? <p>{formik.errors.subject}</p> : null}
                <div>
            <textarea
                rows="10"
                cols="50"
                id="message"
                name="message"
                placeholder="Viestisi"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.message}
            />
                    {formik.touched.message && formik.errors.message ? <p>{formik.errors.message}</p> : null}
                </div>
                <button type="submit" className="hvr-pulse">Lähetä</button>
            </form>
        </div>
    )
}
export default ContactUs