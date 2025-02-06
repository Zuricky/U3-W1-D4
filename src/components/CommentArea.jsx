import { Component } from "react";
import { Alert, Spinner } from "react-bootstrap";
import CommentsList from "./CommentList";
import AddComment from "./AddComment";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: false,
    error: null,
  };

  fetchComments = async () => {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.bookAsin}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E0Y2IxNGNhMDcwNDAwMTU4YmY5NGMiLCJpYXQiOjE3Mzg4NTMxNDAsImV4cCI6MTc0MDA2Mjc0MH0.aGqXT_4w3KnObMpVtPz2zj7kGO6j5LtnCtjWyUoiCi0",
        },
      });
      if (!response.ok) throw new Error("Errore nel recupero dei commenti");
      const data = await response.json();
      this.setState({ comments: data, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  componentDidMount() {
    this.fetchComments();
  }

  render() {
    return (
      <div className="mt-3">
        {this.state.isLoading && <Spinner animation="border" variant="primary" />}
        {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
        <CommentsList comments={this.state.comments} />
        <AddComment bookAsin={this.props.bookAsin} refreshComments={this.fetchComments} />
      </div>
    );
  }
}

export default CommentArea;
