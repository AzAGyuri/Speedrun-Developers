import { Typography } from "@mui/material";
import { Container, styled } from "@mui/system";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  marginTop: "20px",
  backgroundColor: "#4caf50",
  color: "#333",
  borderRadius: "10px",
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  marginBottom: "20px",
  border: "2.5px solid #2f3826",
});

const Title = styled(Typography)({
  marginBottom: (theme) => theme.spacing(2),
  fontSize: "2rem",
  marginTop: (theme) => theme.spacing(1),
  fontWeight: "bold",
});

const LargeText = styled(Typography)({
  marginBottom: (theme) => theme.spacing(1),
  fontSize: "1.5rem",
  textAlign: "justify",
  lineHeight: "1.6",
});

export function Entry({ title, content, date, author }) {
  return (
    <StyledContainer style={{ backgroundColor: "#4caf50" }}>
      <Title variant="h4">{title}</Title>
      <LargeText style={{ paddingBottom: "5px" }}>{content}</LargeText>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          borderTop: "2px solid #2f3826",
          marginTop: "auto",
          paddingRight: "16px",
          paddingLeft: "16px",
          paddingTop: "5px",
        }}
      >
        <Typography
          variant="body2"
          style={{
            padding: "7px 5px",
            backgroundColor: "#ba8d63",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {new Date(date).toLocaleDateString()}
        </Typography>
        <Typography
          variant="body2"
          style={{
            padding: "7px 4px",
            backgroundColor: "#6384ba",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "bold",
            marginLeft: "10px",
          }}
        >
          {author}
        </Typography>
      </div>
    </StyledContainer>
  );
}
