/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { SelectPatientId } from "./components";

const App = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}
  >
    <Typography variant="h4">Welcome to my Allison-AI-assessment!</Typography>
    <SelectPatientId />
  </div>
);

export default App;
