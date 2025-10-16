import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/categories";
import NotificationSnackbar from "../../components/Common/NotificationSnackbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  //Fetch categories list
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to load categories",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <Container>
      <Typography variant="h4" component="div" mb={3}>
        Select a Category
      </Typography>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "80vh",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            {categories.map((cat) => (
              <Grid key={cat.id}>
                <Card sx={{ maxWidth: 250 }}>
                  <CardActionArea
                    onClick={() => navigate(`/category/${cat.name}`)}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 280, height: 200, objectFit: "cover" }}
                      image={cat.image}
                      alt={cat.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {cat.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <NotificationSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          />
        </>
      )}
    </Container>
  );
};

export default Home;
