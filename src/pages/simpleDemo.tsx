import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import superagent from "superagent";

export default function SimpleDemo() {
  const { ingestId, tenantId } = useParams();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();

  const handleFormSubmit = async () => {
    await superagent
      .post(`https://api.contactforms.app/ingest/${tenantId}/${ingestId}`)
      .set("content-type", "application/json")
      .send({
        email,
        name,
        additionalDetails: {
          phone,
        },
      });
    setName("");
    setEmail("");
    setPhone("");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "20px",
        }}
      >
        <p style={{ marginLeft: "30px" }}>
          demo app was configured with tenant {tenantId} and ingester {ingestId}
        </p>
        <p style={{ marginRight: "30px" }}>
          Check out the source code on{" "}
          <a
            style={{ textAlign: "center" }}
            href="https://github.com/contactformsapp/demo"
          >
            GitHub
          </a>
        </p>
      </div>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Welcome to Demo Company
      </h1>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item>
          <Box
            sx={{
              m: 2,
              display: "flex",
              flexDirection: "column",
              width: "400px",
            }}
          >
            <p style={{ textAlign: "center", fontSize: "30px" }}>
              Get In Contact:
            </p>
            <TextField
              id="outlined-basic"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ m: 2, marginTop: 1 }}
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ m: 2 }}
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ m: 2 }}
              fullWidth
            />
            <Button
              sx={{ m: 2, fontSize: "20px" }}
              onClick={handleFormSubmit}
              fullWidth
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
