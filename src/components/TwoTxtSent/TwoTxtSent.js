import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card,
  Spinner
} from "react-bootstrap";
import natural from "natural";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as similarity from "compute-cosine-similarity";

const LOADING_MODEL = "Loading Text Analysis Models ...";
const ANALYZING_TXT1 = "Embedding Text 1 ...";
const ANALYZING_TXT2 = "Embedding Text 2 ...";
const FINALIZING = "Finalizing Analysis ...";
const DONE = "DONE";

function TwoTxtSent() {
  const [txt1, settxt1] = useState("");
  const [txt2, settxt2] = useState("");
  const [analysisStatus, setanalysisStatus] = useState("DONE");
  const [jwdAnalysis, setjwdAnalysis] = useState([]);
  const runAnalysis = async () => {
    setanalysisStatus(LOADING_MODEL);
    let model = await use.load();
    let sentTok = new natural.SentenceTokenizer();
    let txt1Sent = sentTok.tokenize(txt1);
    let txt2Sent = sentTok.tokenize(txt2);

    setanalysisStatus(ANALYZING_TXT1);
    let embeddings1 = await model.embed(txt1Sent);
    let values1 = embeddings1.arraySync();
    let arr1 = Array.from(values1);

    setanalysisStatus(ANALYZING_TXT2);
    let embeddings2 = await model.embed(txt2Sent);
    let values2 = embeddings2.arraySync();
    let arr2 = Array.from(values2);

    setanalysisStatus(FINALIZING);
    let res = [];
    for (let sent1 = 0; sent1 < txt1Sent.length; sent1++) {
      for (let sent2 = 0; sent2 < txt2Sent.length; sent2++) {
        res.push({
          sent1: txt1Sent[sent1],
          sent2: txt2Sent[sent2],
          jwd: similarity(arr1[sent1], arr2[sent2])
        });
      }
    }

    res.sort((a, b) => {
      if (a.jwd === b.jwd) return 0;
      return a.jwd < b.jwd ? 1 : -1;
    });

    setjwdAnalysis(res);
    setanalysisStatus(DONE);
  };

  return (
    <div className="TopLevelDisplay">
      <h1>Two Text Analysis</h1>
      <Container>
        <Row>
          <Col>
            <h3>Text 1</h3>
            <InputGroup>
              <FormControl
                className="main-text-area"
                as="textarea"
                aria-label="With textarea"
                rows="15"
                placeholder="Enter your text document here ..."
                value={txt1}
                onChange={(e) => settxt1(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col>
            <h3>Text 1</h3>
            <InputGroup>
              <FormControl
                className="main-text-area"
                as="textarea"
                aria-label="With textarea"
                rows="15"
                placeholder="Enter your text document here ..."
                value={txt2}
                onChange={(e) => settxt2(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} md={4}>
            <Button
              variant="primary"
              className="analyze-button"
              onClick={() => runAnalysis()}>
              Analyze
            </Button>
          </Col>
        </Row>
        {analysisStatus !== "DONE" && (
          <Row
            className="justify-content-md-center"
            style={{ marginTop: "20px" }}>
            <Col md={1}>
              <Spinner animation="border" role="status"></Spinner>
            </Col>
            <Col md={"auto"}>
              <h3>{analysisStatus}</h3>
            </Col>
          </Row>
        )}
        <Row>
          <Col style={{ textAlign: "left" }}>
            {jwdAnalysis.map((sent, i) => (
              <Card key={i} style={{ marginBottom: "20px" }}>
                <Card.Body>
                  <Card.Title>Cosine Distance: {sent.jwd}</Card.Title>
                  <Card.Subtitle>Text 1</Card.Subtitle>
                  <Card.Text style={{ paddingBottom: "20px" }}>
                    {sent.sent1}
                  </Card.Text>
                  <Card.Subtitle>Text 2</Card.Subtitle>
                  <Card.Text>{sent.sent2}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TwoTxtSent;
