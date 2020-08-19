import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card,
  Spinner,
  Modal
} from "react-bootstrap";
import natural from "natural";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as toxicity from "@tensorflow-models/toxicity";
import * as similarity from "compute-cosine-similarity";
import "./TwoTxtSent";
import SingleTextAnalysis from "../SingleTextAnalysis/SingleTextAnalysis";

const LOADING_MODEL = "Loading Text Analysis Models ...";
const ANALYZING_TXT1 = "Embedding Text 1 ...";
const ANALYZING_TXT2 = "Embedding Text 2 ...";
const FINALIZING = "Finalizing Analysis ...";
const DONE = "DONE";

function TwoTxtSent(props) {
  const [txt1, settxt1] = useState("");
  const [txt2, settxt2] = useState("");
  const [analysisStatus, setanalysisStatus] = useState("DONE");
  const [jwdAnalysis, setjwdAnalysis] = useState([]);
  const [textAnalysis, setTextAnalysis] = useState({});
  const [showModal, setshowModal] = useState(false);

  const closeModal = () => {
    setshowModal(false);
  };

  const runSingleAnalysis = async (text) => {
    let wordTok = new natural.WordTokenizer();
    let tokenizedWords = wordTok.tokenize(text);

    let wrdCnt = {};
    tokenizedWords.forEach((word) => {
      if (wrdCnt[word] === undefined) {
        wrdCnt[word] = 0;
      }
      wrdCnt[word] += 1;
    });
    let wordCountPair = Object.keys(wrdCnt).map((key) => [key, wrdCnt[key]]);
    wordCountPair.sort(function (a, b) {
      // Sort by the 2nd value in each array
      if (a[1] === b[1]) return 0;
      return a[1] < b[1] ? 1 : -1;
    });
    let topTenWords =
      wordCountPair.length > 20 ? wordCountPair.slice(0, 20) : wordCountPair;

    let analyzer = new natural.SentimentAnalyzer(
      "English",
      natural.PorterStemmer,
      "afinn"
    );

    let toxModel = await toxicity.load();
    if (toxModel) {
      let predictions = await toxModel.classify([text]);
      if (!predictions) {
        alert("prediction failed");
        return;
      }
      setTextAnalysis({
        sentiment: analyzer.getSentiment(tokenizedWords),
        toxicity: predictions,
        topTenWords: topTenWords
      });
      setshowModal(true);
    }
  };

  const runAnalysis = useCallback(
    async (text1, text2) => {
      if (text1 === undefined) {
        text1 = txt1;
      }
      if (text2 === undefined) {
        text2 = txt2;
      }

      setanalysisStatus(LOADING_MODEL);
      let model = await use.load();
      let sentTok = new natural.SentenceTokenizer();
      let txt1Sent = sentTok.tokenize(text1);
      let txt2Sent = sentTok.tokenize(text2);

      console.log(txt1Sent, txt2Sent);

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
    },
    [txt1, txt2]
  );

  useEffect(() => {
    if (props && props.location && props.location.multTextProps) {
      settxt1(props.location.multTextProps.txt1);
      settxt2(props.location.multTextProps.txt2);
      runAnalysis(
        props.location.multTextProps.txt1,
        props.location.multTextProps.txt2
      );
    }
  }, [props, runAnalysis]);

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
            <Button
              variant="primary"
              className="analyze-button"
              onClick={() => {
                runSingleAnalysis(txt1);
              }}>
              Analyze Text 1
            </Button>
          </Col>
          <Col>
            <h3>Text 2</h3>
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
            <Button
              variant="primary"
              className="analyze-button"
              onClick={() => {
                runSingleAnalysis(txt2);
              }}>
              Analyze Text 2
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} md={4}>
            <Button
              variant="primary"
              className="analyze-button"
              onClick={() => runAnalysis()}>
              Analyze For Plagiarism
            </Button>
          </Col>
        </Row>
        {analysisStatus !== "DONE" && (
          <Row className="justify-content-md-center TwoTxtSent__row">
            <Col md={1}>
              <Spinner animation="border" role="status"></Spinner>
            </Col>
            <Col md={"auto"}>
              <h3>{analysisStatus}</h3>
            </Col>
          </Row>
        )}
        <Row>
          <Col className="TwoTxtSent__col">
            {jwdAnalysis.map((sent, i) => (
              <Card key={i} className="TwoTxtSent__cardWrapper">
                <Card.Body>
                  <Card.Title>Cosine Distance: {Math.round(sent.jwd*100)}%</Card.Title>
                  <Card.Subtitle>Text 1</Card.Subtitle>
                  <Card.Text className="TwoTxtSent__cardText">
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
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Single Text Analysis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SingleTextAnalysis analysis={textAnalysis}></SingleTextAnalysis>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TwoTxtSent;
