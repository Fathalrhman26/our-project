// RecipeCard.js

import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    IconButton,
} from '@mui/material';
import { Favorite, Share } from '@mui/icons-material';
import { useStyles } from '../styles/globalStyles';

/**
 * RecipeCard component that displays individual recipe details.
 * Used in MyRecipes and SearchRecipes components.
 * @param {Object} props - Contains recipe data.
 */
const RecipeCard = ({ recipe }) => {
    // Use custom styles from globalStyles.js
    const classes = useStyles();

    return (
        <Card className={classes.recipeCard}>
            {/* Recipe image */}
            <CardMedia
                className={classes.recipeMedia}
                image={recipe.imageUrl}
                title={recipe.title}
            />
            {/* Recipe content */}
            <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {recipe.description}
                </Typography>
            </CardContent>
            {/* Recipe actions */}
            <CardActions disableSpacing>
                {/* Favorite button */}
                <IconButton aria-label="add to favorites">
                    <Favorite />
                </IconButton>
                {/* Share button */}
                <IconButton aria-label="share">
                    <Share />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default RecipeCard;
