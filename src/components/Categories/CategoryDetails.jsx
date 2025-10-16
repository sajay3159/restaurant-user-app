import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
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
                    onClick={() => console.log("Add to cart:", recipe.name)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CategoryDetails;
