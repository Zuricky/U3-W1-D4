import { Button, ListGroup } from "react-bootstrap";

const CommentsList = ({ comments, refreshComments }) => (
  <ListGroup className="mt-3">
    {comments.map((comment) => (
      <ListGroup.Item key={comment._id} className="d-flex justify-content-between align-items-center">
        {comment.comment} - <strong>{comment.rate}/5</strong>
        <Button
          variant="danger"
          size="sm"
          onClick={async () => {
            await fetch(`https://striveschool-api.herokuapp.com/api/comments/${comment._id}`, {
              method: "DELETE",
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E0Y2IxNGNhMDcwNDAwMTU4YmY5NGMiLCJpYXQiOjE3Mzg4NTMxNDAsImV4cCI6MTc0MDA2Mjc0MH0.aGqXT_4w3KnObMpVtPz2zj7kGO6j5LtnCtjWyUoiCi0",
              },
            });
            refreshComments();
          }}
        >
          X
        </Button>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default CommentsList;
