import { IUser } from '../../interfaces/IUser';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { 
    Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Jumbotron,
  Row } from 'react-bootstrap';
import toastr, { http} from 'utils/utils';

const ContactForm: React.FC = ():JSX.Element => {
    const [user, setUser] = useState<IUser>();
    const [Loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
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
        response.status === 201 && setLoading(!Loading);
        toastr.success(`${(response as any).data.message}`)
      } catch (error: any) {
        setLoading(false);
        toastr.error(`${error}`);
      }
      
    }

    return (
        <Container id="contact">
          <Row>
            <Col lg={6}>
              <Jumbotron className="mt-5 grey-1">
                <h1>Lorem Ipsum</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque laboriosam ullam, neque,
                   error quia ab cupiditate odit illo
                   obcaecati cumque consequuntur, assumenda quis vel magnam eum eos beatae iusto molestiae.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat dolor dolores excepturi aspernatur repudiandae
                   iste iure praesentium architecto voluptas laborum
                  unde repellendus provident, voluptatibus consequuntur, accusantium reiciendis. Repudiandae, ab. Ipsam?
                </p>
              </Jumbotron>
            </Col>
            <Col lg={6} className="py-5">
                <h3 className="text-center mb-3">Contact Us</h3>
              <Form role="form" onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Text className="addon">
                    <i className="fas fa-user"></i>
                    </InputGroup.Text>
                    <FormControl
                      id="name"
                      placeholder="Full Name"
                      type="text"
                      onChange={handleChange}
                      name="name"
                      value={user?.name}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Text className="addon">
                    <i className="fas fa-phone"></i>
                    </InputGroup.Text>
                    <FormControl
                      id="phone"
                      placeholder="Phone"
                      type="text"
                      onChange={handleChange}
                      name="phone"
                      value={user?.phone}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Text className="addon">
                    <i className="fas fa-at"></i>
                    </InputGroup.Text>
                    <FormControl
                      id="email"
                      placeholder="Email"
                      type="text"
                      onChange={handleChange}
                      name="email"
                      value={user?.email}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Text className="addon">
                    <i className="fas fa-network-wired"></i>
                    </InputGroup.Text>
                    <FormControl
                      id="service"
                      as="select"
                      placeholder="Service required"
                      type="text"
                      onChange={handleChange}
                      name="service"
                      value={user?.service}
                      required
                    >
                      <option value="">Service Required</option>
                      <option value="Media Campaign">Media Campaign</option>
                      <option value="Research">Research</option>
                   </FormControl>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Text
                    className="addon"
                    >
                    <i className="fas fa-envelope"></i>
                    </InputGroup.Text>
                    <FormControl
                      id="message"
                      as="textarea"
                      style={{height:"100px"}}
                      placeholder="Message"
                      type="text"
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
                    {Loading ? "Submitting...": "Submit"}
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
    )
}

export default ContactForm;
