import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
    return (
        <MDBFooter bgColor='white' className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Lisää tietoa meistä:</span>
                </div>

                <div>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="facebook-f" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="twitter" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="google" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="instagram" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="linkedin" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="github" />
                    </a>
                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon icon="gem" className="me-3" />
                                Autovuokraamo
                            </h6>
                            <p>
                                Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit.
                            </p>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Palvelut</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Vuokraamo
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Huolto
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Yritys-asiakkaat
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Jotain muuta
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Linkit</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Hinnasto
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Asetukset
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Tilaukset
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    FAQ
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Yhteystiedot</h6>
                            <p>
                                <MDBIcon icon="home" className="me-2" />
                                Helsinki, 00111, Esimerkkiosoite
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-3" />
                                info@example.com
                            </p>
                            <p>
                                <MDBIcon icon="phone" className="me-3" /> + 358 111202376
                            </p>
                            <p>
                                <MDBIcon icon="print" className="me-3" /> + 358 111202375
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2021 Copyright:
                <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                    MDBootstrap.com
                </a>
            </div>
        </MDBFooter>
    );
}