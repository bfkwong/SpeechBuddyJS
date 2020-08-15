import React, { useState } from "react";
import natural from "natural";
import * as toxicity from "@tensorflow-models/toxicity";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Modal,
  Spinner
} from "react-bootstrap";
import "./SingleText.css";

import StatCard from "../StatCard/StatCard";
import SingleTextAnalysis from "../SingleTextAnalysis/SingleTextAnalysis";

import RecordingGif from "../../Images/recording.gif";

function SingleText() {
  const [textArea, setTextArea] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(1);
  const [nounsPerc, setNounsPerc] = useState(0);
  const [adjPerc, setAdjPerc] = useState(0);
  const [textAnalysis, setTextAnalysis] = useState({});
  const [recording, setRecording] = useState(false);
  const [analysisState, setAnalysisState] = useState("DONE");
  const { transcript, resetTranscript } = useSpeechRecognition();

  const runAnalysis = async () => {
    setAnalysisState("Loading Models ...");
    let wordTok = new natural.WordTokenizer();
    let toxModel = await toxicity.load();
    let tokenizedWords = wordTok.tokenize(textArea);

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

    setAnalysisState("Analyzing Sentiment ...");
    let analyzer = new natural.SentimentAnalyzer(
      "English",
      natural.PorterStemmer,
      "afinn"
    );

    setAnalysisState("Analyzing for Toxicity ...");
    if (toxModel) {
      let predictions = await toxModel.classify([textArea]);
      if (!predictions) {
        alert("prediction failed");
        return;
      }
      setTextAnalysis({
        sentiment: analyzer.getSentiment(tokenizedWords),
        toxicity: predictions,
        topTenWords: topTenWords
      });
      setAnalysisState("DONE");
    }
  };

  return (
    <div className="TopLevelDisplay">
      <h1>Single Text Analysis</h1>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={3} xs={6}>
            <StatCard value={wordCount} description="Words"></StatCard>
          </Col>
          <Col md={3} xs={6}>
            <StatCard value={sentenceCount} description="Sentences"></StatCard>
          </Col>
          <Col md={3} xs={6}>
            <StatCard
              value={`${Math.round(nounsPerc * 100)}%`}
              description="Are Nouns"></StatCard>
          </Col>
          <Col md={3} xs={6}>
            <StatCard
              value={`${Math.round(adjPerc * 100)}%`}
              description="Are Adjective"></StatCard>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <InputGroup>
            <FormControl
              className="main-text-area"
              as="textarea"
              aria-label="With textarea"
              rows="15"
              placeholder="Enter your text document here ..."
              value={textArea}
              onChange={(e) => {
                setTextArea(e.target.value);
                let wordTok = new natural.WordTokenizer();
                let tokenizedWords = wordTok.tokenize(e.target.value);
                setWordCount(tokenizedWords.length);

                let sentTok = new natural.SentenceTokenizer();
                setSentenceCount(sentTok.tokenize(e.target.value).length);

                let lexicon = new natural.Lexicon("EN", "N", "NNP");
                let ruleSet = new natural.RuleSet("EN");
                let tagger = new natural.BrillPOSTagger(lexicon, ruleSet);
                let taggedWordsSep = tagger.tag(tokenizedWords).taggedWords;

                let nouns = taggedWordsSep.filter(
                  (w) =>
                    w.tag === "NN" ||
                    w.tag === "NNS" ||
                    w.tag === "NNP" ||
                    w.tag === "NNPS"
                );
                let adjs = taggedWordsSep.filter(
                  (w) => w.tag === "JJ" || w.tag === "JJS" || w.tag === "JJR"
                );

                setNounsPerc(nouns.length / taggedWordsSep.length || 0);
                setAdjPerc(adjs.length / taggedWordsSep.length || 0);
              }}
            />
          </InputGroup>
        </Row>
        <Row className="justify-content-md-center">
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="mr-2" aria-label="First group">
              <Button className="analyze-button" onClick={() => runAnalysis()}>
                Analyze
              </Button>
            </ButtonGroup>
            <ButtonGroup className="mr-2" aria-label="Second group">
              <Button
                className="analyze-button"
                onClick={() => {
                  setRecording(true);
                  SpeechRecognition.startListening();
                }}>
                <img
                  src="https://img.pngio.com/record-button-png-6-png-image-record-png-2400_2093.png"
                  alt=""
                />
              </Button>
              <Button
                className="analyze-button"
                onClick={() => {
                  resetTranscript();
                  setTextArea("");
                }}>
                Clear
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Row>
        {analysisState !== "DONE" && (
          <Row className="justify-content-md-center TwoTxtSent__row">
            <Col md={1}>
              <Spinner animation="border" role="status"></Spinner>
            </Col>
            <Col md={"auto"}>
              <h3>{analysisState}</h3>
            </Col>
          </Row>
        )}
        {textArea !== "" && (
          <Row>
            <SingleTextAnalysis analysis={textAnalysis}></SingleTextAnalysis>
          </Row>
        )}
      </Container>

      <Modal
        show={recording}
        onHide={() => {
          setRecording(false);
          SpeechRecognition.startListening().then(() => {
            setTextArea(textArea + transcript);
          });
        }}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Recording ...</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setRecording(false);
              SpeechRecognition.startListening().then(() => {
                setTextArea(textArea + transcript);
              });
            }}>
            Finish Recording
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SingleText;
