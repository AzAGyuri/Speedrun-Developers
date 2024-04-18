import "./Entry.css";
import { Typography, Avatar, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
  lineHeight: "1.6",
});

export function Entry({
  id,
  title,
  content,
  createdOn,
  authorId,
  currentUserId,
  authorName,
  authorBgColor,
  authorLogIn,
  authorLogOff,
  handleEntryClick,
  handleDeleteClick,
  handleAdminDeleteEntry,
  roles,
  tooltipTitle,
}) {
  const formattedCreatedOn = (
    <>
      <div>{createdOn.split(" ")[0]}</div>
      <div>{createdOn.split(" ")[1]}</div>
    </>
  );
  const statusColor =
    authorLogIn && !authorLogOff
      ? "blue"
      : authorLogIn && authorLogOff
      ? new Date(authorLogIn).getTime() > new Date(authorLogOff).getTime()
        ? "blue"
        : "red"
      : "red";
  const statusText =
    authorLogIn && !authorLogOff
      ? "Online"
      : authorLogIn && authorLogOff
      ? new Date(authorLogIn).getTime() > new Date(authorLogOff).getTime()
        ? "Online"
        : "Offline"
      : "Offline";

  return (
    <Tooltip title={tooltipTitle}>
      <StyledContainer style={{ backgroundColor: "#4caf50" }}>
        <div
          onClick={
            handleEntryClick
              ? () =>
                  handleEntryClick({
                    title,
                    content,
                    createdOn,
                    currentUserId,
                    authorId,
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
        </div>
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
          <div className="date-and-delete">
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
              {formattedCreatedOn}
            </Typography>
            {handleDeleteClick ? (
              Number(currentUserId) === authorId ? (
                <Tooltip title="Bejegyzés törlése">
                  <IconButton onClick={handleDeleteClick} color="inherit" id={id}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              ) : roles.includes("ROLE_ADMIN") && handleAdminDeleteEntry ? (
                <Tooltip title="Bejegyzés admin általi törlése">
                  <IconButton
                    onClick={handleAdminDeleteEntry}
                    color="error"
                    id={id}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </div>
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
                  border: `2px solid ${statusColor}`,
                }}
              >
                {authorName.charAt(0).toUpperCase()}
              </Avatar>
              <div style={{ border: "1px solid black", marginLeft: "10px" }}>
                <Typography
                  sx={{
                    borderBottom: `2px solid ${statusColor}`,
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  {authorName}
                </Typography>
                <Typography
                  sx={{
                    p: 0,
                    color:
                      statusColor === "blue"
                        ? "#00f"
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
    </Tooltip>
  );
}
