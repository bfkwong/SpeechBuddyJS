import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Container, Row, Col, Button, Table, Spinner } from "react-bootstrap";
import styled from "styled-components";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as similarity from "compute-cosine-similarity";
import * as natural from "natural";
import "./MultiText.css";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  background-color: #d1f0f0;
  color: #23686c;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
`;

function MultiText() {
  const [analysis, setAnalysis] = useState([]);
  const [fileContents, setFileContents] = useState([]);
  const [analysisState, setAnalysisState] = useState("DONE");

  const onDrop = useCallback(
    (newFile) => {
      newFile.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const string = reader.result;
          fileContents.push(string);
          setFileContents(fileContents);
        };
        reader.readAsText(file);
      });
    },
    [fileContents]
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  const filesUpload = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  const runAnalysis = async () => {
    setAnalysisState("Loading Models ...");
    let model = await use.load();
    let embeddings = await model.embed(fileContents);
    let values = embeddings.arraySync();
    let arr = Array.from(values);

    let output = [];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        setAnalysisState(
          `Analyzing ${filesUpload[i]} and ${filesUpload[j]} ...`
        );
        let csd = similarity(arr[i], arr[j]);
        let jwd = natural.JaroWinklerDistance(fileContents[i], fileContents[j]);
        output.push([
          filesUpload[i],
          filesUpload[j],
          csd,
          jwd,
          fileContents[i],
          fileContents[j]
        ]);
      }
    }
    setAnalysis(output);
    setAnalysisState("DONE");
  };

  return (
    <div className="TopLevelDisplay">
      <h1>Multi Text Analysis</h1>
      <div className="dropdown-container">
        <section className="container">
          <StyledDiv {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </StyledDiv>
          <aside className="MultiTxt__aside">
            <h4>Uploaded Files</h4>
            <ul>{filesUpload}</ul>
          </aside>
        </section>
      </div>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={4}>
            <Button onClick={() => runAnalysis()}>Analyze</Button>
          </Col>
        </Row>
      </Container>
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
      {analysis.length > 0 && (
        <Container className="MultiTxt__analysisContainer">
          <Row className="justify-content-md-center">
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th>Text</th>
                    <th>Text</th>
                    <th>Cosine Similarity</th>
                    <th>Jaro Winkler Similarity</th>
                    <th>Two Text Analysis</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.map((an, i) => (
                    <tr key={i}>
                      <td>{an[0]}</td>
                      <td>{an[1]}</td>
                      <td>{Math.round(an[2] * 100)}%</td>
                      <td>{Math.round(an[3] * 100)}%</td>
                      <td>
                        <Link
                          to={{
                            pathname: "/SpeechBuddyJS/two_txt_plag",
                            multTextProps: {
                              txt1: an[4],
                              txt2: an[5]
                            }
                          }}>
                          Analyze
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default MultiText;
