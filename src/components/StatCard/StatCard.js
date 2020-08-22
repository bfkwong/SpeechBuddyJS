import React from "react";
import { Card } from "react-bootstrap";
import "./StatCard.css";

function StatCard(props) {
  return (
    <Card className="card-padding">
      <Card.Body>
        <Card.Title data-testid="SC_value">{props.value}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" data-testid="SC_description">
          {props.description}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default StatCard;
