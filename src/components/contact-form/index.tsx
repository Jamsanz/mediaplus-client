import { IUser } from '../../interfaces/IUser';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { 
    Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Jumbotron,
  Spinner,
  Row } from 'react-bootstrap';
import toastr, { http} from 'utils/utils';
import AOS from 'aos';
import 'aos/dist/aos.css'

const ContactForm: React.FC = ():JSX.Element => {
    const [user, setUser] = useState<IUser>();
    const [Loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
      const {name, value} = e.target;
      const data: {[key: string]: any} = {...user};
      data[name] = value;
      setUser(data as IUser);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      setLoading(!Loading);
      try {
        const userData  = {...user, status: 'New'}
        console.log(userData);
        const response = await http.post('/contacts', userData);
        setLoading(!Loading);
        toastr.success(`${(response as any).data.message}`);
        setTimeout(()=>window.location.reload(), 1500);
        // setUser(user => user?.email: "",);
      } catch (error: any) {
        setLoading(false);
        toastr.error(`${error}`);
      }
      
    }

    useEffect(() => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
      AOS.refresh();
    }, []);

    return (
      <div className="grey-1">
        <Container id="contact">
          <Row>
            <Col lg={6}>
              <Jumbotron className="mt-5" data-aos="fade-right">
                <h1>Get In Touch</h1>
                <p className='mt-4 text-left fa-1x'>
                   <i className="fas fa-map-marker-alt mr-3 "></i>
                   Ahmadu Bello University Zaria (A.B.U), Mass Comm.
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i>
                  08012345678
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i>
                  mediaP@gmail.com
                </p>
              </Jumbotron>
            </Col>
            <Col lg={6} className="py-5" data-aos="fade-left">
                <h3 className="text-center mb-3">Contact Us</h3>
              <Form role="form" onSubmit={handleSubmit}>
                <div className="contact-input">
                    <i className="fas fa-user"></i>
                    <input
                      id="name"
                      placeholder="Full Name"
                      type="text"
                      onChange={handleChange}
                      name="name"
                      value={user?.name}
                      required
                    />
                </div>
                <div className="contact-input">
                  <i className="fas fa-phone"></i>
                  <input
                    id="phone"
                    placeholder="Phone"
                    type="text"
                    onChange={handleChange}
                    name="phone"
                    value={user?.phone}
                    required
                  />
                </div>
                <div className="contact-input">
                  <i className="fas fa-at"></i>
                    <input
                      id="email"
                      placeholder="Email"
                      type="text"
                      onChange={handleChange}
                      name="email"
                      value={user?.email}
                      required
                    />
                </div>
                <div className="contact-input">
                    <i className="fas fa-network-wired"></i>
                    <select
                      id="service"
                      placeholder="Service required"
                      onChange={handleChange}
                      name="service"
                      value={user?.service}
                      required
                    >
                      <option value="">Service Required</option>
                      <option value="Media Campaign">Media Campaign</option>
                      <option value="Research">Research</option>
                   </select>
                </div>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Text className="addon">
                      <i className="fas fa-envelope msg"></i>
                    </InputGroup.Text>
                      <FormControl
                        id="message"
                        as="textarea"
                        style={{height:"100px"}}
                        placeholder="Message"
                        onChange={handleChange}
                        name="message"
                        value={user?.message}
                    />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Button
                    type="submit"
                    block
                    size="lg"
                    variant="primary"
                    disabled={Loading}
                  >
                    {Loading ? <Spinner animation="border" /> : "Submit"}
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
        </div>
    )
}

export default ContactForm;
