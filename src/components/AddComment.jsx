import { Component } from "react";
import { Form, Button } from "react-bootstrap";

class AddComment extends Component {
  state = {
    comment: "",
    rate: "1",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E0Y2IxNGNhMDcwNDAwMTU4YmY5NGMiLCJpYXQiOjE3Mzg4NTMxNDAsImV4cCI6MTc0MDA2Mjc0MH0.aGqXT_4w3KnObMpVtPz2zj7kGO6j5LtnCtjWyUoiCi0",
      },
      body: JSON.stringify({
        comment: this.state.comment,
        rate: this.state.rate,
        elementId: this.props.bookAsin,
      }),
    });
    this.setState({ comment: "", rate: "1" });
    this.props.refreshComments();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="mt-3">
        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control type="text" value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value })} required />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Rating</Form.Label>
          <Form.Select value={this.state.rate} onChange={(e) => this.setState({ rate: e.target.value })}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num}>{num}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit" className="mt-2 bg-success">
          Add Comment
        </Button>
      </Form>
    );
  }
}

export default AddComment;
