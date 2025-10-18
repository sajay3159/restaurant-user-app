import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getRecipes } from "../../api/recipes";
import { getCategories } from "../../api/categories";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import NotificationSnackbar from "../../components/Common/NotificationSnackbar";

const CategoryRecipesPage = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchData = async () => {
    try {
      const [allRecipes, allCategories] = await Promise.all([
        getRecipes(),
        getCategories(),
      ]);
      // Get the category name
      const category = allCategories.find((cat) => cat.name === categoryId);
      setCategoryName(category?.name || "Unknown Category");

      // Filter recipes by this category
      const filtered = allRecipes.filter(
        (recipe) => recipe.category === categoryId
      );
      setRecipes(filtered);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = useCallback(
    (recipe) => {
      try {
        dispatch(
          cartActions.addToCart({
            id: recipe.id,
            name: recipe.name,
            price: recipe.price,
            imageUrl: recipe.imageUrl,
          })
        );
        setSnackbar({
          open: true,
          message: "Added to cart",
          severity: "success",
        });
      } catch (error) {
        console.error("Failed to add to cart:", error);
        setSnackbar({
          open: true,
          message: "Failed to add item to cart",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {categoryName}
      </Typography>

      {recipes.length === 0 ? (
        <Typography>No recipes found for this category.</Typography>
      ) : (
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid key={recipe.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  image={recipe.imageUrl}
                  sx={{ width: 280, height: 200, objectFit: "cover" }}
                  alt={recipe.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {recipe.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    component="div"
                    sx={{ mb: 1 }}
                  >
                    <Box width={220}>Ingredients: {recipe.ingredient}</Box>
                  </Typography>
                  <Typography variant="subtitle2" color="text.primary">
                    Price: ${recipe.price}
                  </Typography>
                </CardContent>

                {/* Add to Cart */}
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleAddToCart(recipe)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Container>
  );
};

export default CategoryRecipesPage;
