import { Typography, Popover, Avatar, Tooltip } from "@mui/material";
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

const styles = {
  avatar: {
    width: "30px",
    height: "30px",
    margin: "20px auto",
    border: "4px solid #fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },
};

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

export function Entry({
  id,
  title,
  content,
  createdOn,
  authorName,
  authorBgColor,
  authorLogIn,
  authorLogOff,
  handleEntryClick,
}) {
  const statusColor =
    authorLogIn && authorLogOff
      ? new Date(authorLogOff) > new Date(authorLogIn)
        ? "green"
        : "red"
      : "red";

  const statusText =
    authorLogIn && authorLogOff
      ? new Date(authorLogOff).getMilliseconds() > new Date(authorLogIn).getMilliseconds()
        ? "Online"
        : "Offline"
      : "Offline";
console.log(authorLogIn,authorLogOff,new Date(authorLogOff), new Date(authorLogIn));
  return (
    <StyledContainer
      style={{ backgroundColor: "#4caf50" }}
      onClick={
        handleEntryClick
          ? () =>
              handleEntryClick({
                title,
                content,
                createdOn,
                authorName,
                authorBgColor,
                authorLogIn,
                authorLogOff,
                id,
              })
          : () => {
              alert("szia fanom, mi jót csinálsz?");
            }
      }
    >
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
          height: "auto",
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
            height: "auto",
            marginTop: "auto",
          }}
        >
          {createdOn}
        </Typography>
        
        <Tooltip
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          disableRestoreFocus
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                ...styles.avatar,
                backgroundColor: authorBgColor,
              }}
            >
              {authorName.charAt(0).toUpperCase()}
            </Avatar>
            <div style={{ marginLeft: "10px" }}>
              <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>{authorName}</Typography>
              <Typography
                sx={{
                  p: 0,
                  color:
                    statusColor === "green"
                      ? "#4caf50"
                      : statusColor === "red"
                      ? "#f44336"
                      : "#f44336",
                }}
              >
                {statusText}
              </Typography>
            </div>
          </div>
        </Tooltip>
      </div>
    </StyledContainer>
  );
}
