import React from "react";
import { Container, Table } from "react-bootstrap";
import { Radar, Bar } from "react-chartjs-2";
import "./SingleTextAnalysis.css";

function SingleTextAnalysis(props) {
  if (props.analysis.sentiment === undefined) {
    return <div></div>;
  }

  return (
    <Container className="SingleTextAnalysis">
      <h3 className="SingleTxtAnalysis__h3">Text Analysis</h3>

      <h5 className="SingleTxtAnalysis__h5">Top Ten Words</h5>
      <Bar
        data={{
          labels: props.analysis.topTenWords.map((v) => v[0]),
          datasets: [
            {
              label: `Top ${props.analysis.topTenWords.length} Words`,
              data: props.analysis.topTenWords.map((v) => v[1])
            }
          ]
        }}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }}></Bar>

      <h5 className="SingleTxtAnalysis__h5">Sentiment Analysis</h5>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Sentiment</th>
            <th>{props.analysis.sentiment}</th>
          </tr>
        </tbody>
      </Table>

      <h5 className="SingleTxtAnalysis__h5">Toxicity Analysis</h5>
      <Radar
        data={{
          labels: props.analysis.toxicity.map((t) => t.label),
          datasets: [
            {
              label: "Likelihood of Toxicity",
              backgroundColor: "#212C31",
              data: props.analysis.toxicity.map(
                (t) => t.results[0].probabilities[1]
              )
            }
          ]
        }}
        options={{
          scale: {
            ticks: {
              max: 1,
              min: 0,
              stepSize: 0.2
            }
          }
        }}
      />
    </Container>
  );
}

export default SingleTextAnalysis;
