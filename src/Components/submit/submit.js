import React from "react";
import "./submit.css";
import fetch from "cross-fetch";

const Submit = (props) => {
  const handleRun = (e) => {
    e.preventDefault();
    fetch("http://15.207.111.86:3001/codeupload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: props.code,
        input: props.input,
        langid: props.language,
      }),
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        if (result.stdout) {
          props.changeRes(result.stdout);
        } else if (result.stderr) {
          props.changeRes(result.stderr);
        } else {
          props.changeRes("No Output");
        }
      })
      .catch((err) => {
        props.changeRes("Something went Wrong");
        console.log(err);
      });
  };

  const content = (
    <button id="submit" onClick={handleRun}>
      RUN CODE
    </button>
  );

  return content;
};

export default Submit;
