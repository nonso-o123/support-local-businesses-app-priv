import React, { Component } from "react";
import Airtable from "airtable";
import showdown from "showdown";
import { Col, Row, Form, Button } from "react-bootstrap";
import { Route, Link } from "react-router-dom";
import Step2 from "./components/Step2";
import Thankyou from "./components/Thankyou";

const markdownConverter = new showdown.Converter();

const base = new Airtable({ apiKey: "keyy2T6XEQCBzl1PH" }).base(
  "app7LKgKsFtsq1x8D"
);

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    const fields = {
      fields: {
        Name: this.state.name,
        Email: this.state.email,
        Choice: this.state.value
      }
    };
    fetch("https://api.airtable.com/v0/app7LKgKsFtsq1x8D/Step%201", {
      method: "POST",
      headers: {
        Authorization: "Bearer keyy2T6XEQCBzl1PH",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fields)
    })
      .then(() => alert("Form Sent!"))
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    base("Step 1")
      .select({ view: "Grid 1" })
      .eachPage((records, fetchNextPage) => {
        this.setState({
          records
        });
        console.log(records);
        fetchNextPage();
      });
  }

  createHTML(markdown) {
    return markdownConverter.makeHtml(markdown);
  }

  render() {
    //const { url } = this.props.match;
    return (
      <div className="App">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="password"
              name="email"
              placeholder="Email"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Choose a way to verify
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Email listed on Google"
                  name="verify"
                  value="Phone number listed on Google"
                  defaultChecked
                  onChange={this.handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Phone number listed on Google"
                  name="verify"
                  value="Phone number listed on Google"
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Group>
          </fieldset>
          <Link to="Step2">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </Link>
          <Route path="/Step2" component={Step2} />
        </Form>
      </div>
    );
  }
}

export default Verify;
