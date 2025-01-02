/** @jsxRuntime classic */
/** @jsx jsx */
import { PlateEditor } from '@udecode/plate-common/react';
import { jsx } from '@udecode/plate-test-utils';
jsx;

export const recipeTemplate = (
  <fragment>
    <hh1>Recipe Title</hh1>
    <hp>Enter the title of the recipe here. Make it descriptive and clear.</hp>

    <hh2>Description</hh2>
    <hp>
      Provide a brief description of the recipe:{' '}
      <htext italic>What is the dish about?</htext>{' '}
      <htext italic>Where does it come from?</htext>{' '}
      <htext italic>
        Is it vegetarian, gluten-free, or any other notable characteristic?
      </htext>
    </hp>

    <hh2>Ingredients</hh2>
    <hp>
      List all ingredients used in this recipe. Include the exact quantity for
      each ingredient.
    </hp>
    <htable colSizes={[150, 150, 200]}>
      <htr>
        <hth>
          <hp>
            <htext bold>Ingredient</htext>
          </hp>
        </hth>
        <hth>
          <hp>
            <htext bold>Quantity</htext>
          </hp>
        </hth>
        <hth>
          <hp>
            <htext bold>Weight</htext>
          </hp>
        </hth>
        <hth>
          <hp>
            <htext bold>Notes</htext>
          </hp>
        </hth>
      </htr>
      <htr>
        <htd>
          <hp>Tomato</hp>
        </htd>
        <htd>
          <hp>2 medium</hp>
        </htd>
        <htd>
          <hp>250 g</hp>
        </htd>
        <htd>
          <hp>Fresh or canned?</hp>
        </htd>
      </htr>
    </htable>
    <hp>Make sure to list any optional ingredients or substitutions here.</hp>
    <hp>
      If applicable, include measurements and variations (e.g., cup, gram,
      tablespoon).
    </hp>

    <hh2>Nutritional Information (per serving)</hh2>
    <hp>Provide nutritional information for this recipe if possible:</hp>
    <htable colSizes={[150, 150]}>
      <htr>
        <hth>
          <hp>
            <htext bold>Nutrient</htext>
          </hp>
        </hth>
        <hth>
          <hp>
            <htext bold>Amount</htext>
          </hp>
        </hth>
      </htr>
      <htr>
        <htd>
          <hp>Calories</hp>
        </htd>
        <htd>
          <hp>[Amount] kcal</hp>
        </htd>
      </htr>
      <htr>
        <htd>
          <hp>Protein</hp>
        </htd>
        <htd>
          <hp>[Amount] g</hp>
        </htd>
      </htr>
      <htr>
        <htd>
          <hp>Carbs</hp>
        </htd>
        <htd>
          <hp>[Amount] g</hp>
        </htd>
      </htr>
      <htr>
        <htd>
          <hp>Fat</hp>
        </htd>
        <htd>
          <hp>[Amount] g</hp>
        </htd>
      </htr>
    </htable>
    <hp>
      Optional: Include any relevant dietary information (e.g., keto, vegan,
      etc.).
    </hp>

    <hh2>Instructions</hh2>
    <hp>List the step-by-step instructions for preparing the recipe:</hp>
    <hol>
      <hli>
        <hlic>Step 1: Prepare the ingredients and preheat the oven.</hlic>
      </hli>
      <hli>
        <hlic>
          Step 2: Provide detailed instructions for cooking, with timing and
          methods.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Step 3: Continue with clear, actionable steps to complete the recipe.
        </hlic>
      </hli>
      <hli>
        <hlic>Step 4: Include any tips for achieving the best results.</hlic>
      </hli>
    </hol>
  </fragment>
);
