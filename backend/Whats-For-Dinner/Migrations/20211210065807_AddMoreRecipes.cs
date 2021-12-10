using Microsoft.EntityFrameworkCore.Migrations;

namespace Whats_For_Dinner.Migrations
{
    public partial class AddMoreRecipes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "Description", "Ingredients", "Instructions", "Name" },
                values: new object[,]
                {
                    { 4, "Easy delicious breakfast the entire family will love.", "1½ cups all-purpose flour|;|3½ teaspoons baking powder|;|¼ teaspoon salt, or more to taste|;|1 tablespoon white sugar|;|1¼ cups milk|;|1 egg|;|3 tablespoons butter, melted", "1. In a large bowl, sift together the flour, baking powder, salt and sugar. Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.|:| 2. Heat a lightly oiled griddle or frying pan over medium-high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.", "Old Fashioned Pancakes" },
                    { 5, "This Taco Soup is a zero point Freestyle Weight Watchers recipe. This healthy recipe is loaded with incredible flavor. It's really easy to make and so satisfying! Make this nutritious soup for lunch or pop it in the freezer for a quick meal during busy weeks!", "1 lb Ground beef, chicken or turkey, lean|;|1 can Black beans|;|1 cup Corn|;|2 cloves Garlic|;|1 can Kidney beans|;|1 Onion|;|3 cups Chicken broth|;|2 cans Rotel tomatoes with chili|;|1 packet Taco seasonings", "Add ground turkey or chicken.|:|Cook on high until meat is no longer pink.|.|Drain meat.|:|Add garlic and onion. |:|Continue cooking for 1-2 minutes until meat is crumbled and brown.|:|Add in your beans, corn, tomatoes, and chicken broth.|:|Cook on High heat for 1 hour.|:|Serve with your favorite toppings.", "Healthy Taco Soup" },
                    { 6, "A fun holiday treat to make with your children to leave out for Santa,(and Mom and Dad too)", "1 box of white cake mix|;|2 large egg whites|;|2 tbsp flour|;|1/2 cup vegetable oil|;|1/4 cup white chocolate chips|;|1/4 cup milk OR dark chocolate chips|;|1/4 cup of your favorite holiday-colored sprinkles", "Combine cake mix, egg whites, flour and oil in a large bowl.|:|Add in the 1/4 cup of both chocolate chips and 1/4 cup of holiday sprinkles and gently fold in|:|Bake at 350 degrees for 8-10 minutes|:|Enjoy!", "Cake Mix Santa Cookies" },
                    { 7, "A sweet and satisfying start to your day. Makes enough to last for four breakfasts, which is nice when you are busy!", "1 cup steel cut oats|;|2 cups water |;|2 cups non-dairy milk, such as almond or soy |;|2 teaspoons cinnamon |;|2 teaspoons vanilla extract |;|2 tablespoons ground flax seed |;|2 large apples, medium dice", "Place all ingredients into a large pot and bring to a boil.|:|Simmer for 40 minutes, stirring occasionally.|:|Take off heat and let sit for 5 minutes. Divide evenly into 4 bowls. Refrigerate leftovers.", "Almost Apple Pie" },
                    { 8, "Simply delicious creamy tomato soup", "1 tablespoon unsalted butter or margarine|;|1 tablespoon olive oil|;|1 onion, thinly sliced|;|2 large garlic cloves, peeled and crushed|;|2 (28 ounce) cans whole peeled tomatoes|;|1 cup water|;|1 tablespoon sugar|;|1 teaspoon salt, plus more to taste|;|freshly ground black pepper to taste|;|1 pinch red pepper flakes|;|¼ teaspoon celery seed|;|¼ teaspoon dried oregano", "Heat butter and olive oil in a large saucepan over medium-low heat and cook onion and garlic until onion is soft and translucent, about 5 minutes.|:| Add tomatoes, water, sugar, salt, pepper, red pepper flakes, celery seed, and oregano.|:|Bring to a boil. Reduce heat, cover, and simmer for 15 minutes.|:|Remove from heat and puree with an immersion blender. Reheat soup until warm and season with more salt and pepper if desired.", "Simple Tomato Soup" },
                    { 9, "It's the dish everyone's expecting on the holidays, but it's so easy to make, you can serve it any day.What makes our green bean casserole so good? (secret ingredient - cream of mushroom soup).", "1  can (10 3/4 ounces) Campbell's Condensed Cream of Mushroom Soup |;|1 cup Milk |;|1  tsp.  soy sauce |;|Dash ground black pepper |;|4  cups cooked cut green beans |;|1  cup  French's French Fried Onions|;| |;| |;| |;| |;| |;| |;| |;| |;| |;| |;| ", "Mix soup, milk, soy, black pepper, beans and <b>2/3 cup</b> onions in 1 1/2-qt. casserole.|:|Bake at 350°F. for 25 min. or until hot.|:|Stir . Sprinkle with remaining onions. Bake 5 min.|:|Tip: Use <b>1 bag</b> (16 to 20 oz.) frozen green beans, <b>2 pkg.</b> (9 oz. <b>each</b>) frozen green beans, <b>2 cans</b> (about 16 oz. <b>each</b>) green beans <b>or</b> about <b>1 1/2 lb.</b> fresh green beans for this recipe.|:|Tip: For a change of pace, substitute <b>4 cups</b> cooked broccoli flowerets for the green beans.|:|Tip: For a creative twist, stir in <b>1/2 cup</b> shredded Cheddar cheese with soup. Omit soy sauce. Sprinkle with <b>1/4 cup</b> additional Cheddar cheese when adding the remaining onions.|:|Tip: For a festive touch, stir in <b>1/4 cup</b> chopped red pepper with soup.|:|Tip: For a heartier mushroom flavor, substitute Campbell's® Condensed Golden Mushroom Soup for Cream of Mushroom Soup. Omit soy sauce. Stir in <b>1/4 cup</b> chopped red pepper with green beans.", "Classic Green Bean Casserole" },
                    { 10, "There is nothing like a Rib Eye: it is the most flavorful steak you can buy. The thin streams of fat running through this cut of steak create outstanding flavor. You'll only need to season this with salt and pepper, because we're going to make a shallot-and-herb butter to slap on top of this baby once it's off the grill. As with any good steak, let this one rest for a few minutes before digging in. It will be moist and tender. SERVES 4 GENEROUSLY ", "Olive oil|;|Four 12-ounce rib-eye steaks, bone in, about 1 1/2 inch thick |;|Kosher salt and freshly ground black pepper |;|For Roasted Shallot and Herb Butter Sauce:|;|1 medium shallot, peeled |;|1 tablespoon olive oil|;|1 stick salted butter, room temperature|;|1 tablespoon finely chopped fresh parsley |;|1 tablespoon finely chopped fresh basil|;|1 tablespoon finely chopped fresh tarragon |;|1 teaspoon grated lemon zest |;|Pinch of crushed red-pepper flakes |;| |;| |;| |;| |;| |;| ", "Take your steaks out of the fridge 30 minutes before you want to start grilling, so they can come to room temperature. Prepare the charcoal grill to medium-high heat on one side of your grill, and medium-low heat on the other. You will need just a few briquettes on the cooler side of the grill to maintain the low heat. (If using a gas grill, heat one side of the grill to medium-high heat and the other to low.)|:|When the grill is hot and ready to go, brush the grill grates with some olive oil. Season the steaks generously with salt and pepper. Place the steaks on the hot side of the grill for 3 to 4 minutes, then flip and grill for another 4 minutes. Once the steaks have a nice caramelized crust, move them to the cooler part of the grill, and continue cooking for 6 to 7 minutes for medium rare, or 8 to 9 minutes for medium. Remove the steaks from grill, and tent loosely with foil to keep warm. Let the steaks rest for 5 minutes, so the juices can redistribute throughout the meat. Spread steaks with the roasted shallot and herb butter.|:|ROASTED SHALLOT AND HERB BUTTER: |:| Roasting the shallot gives it a deep, sweet flavor, and the lemon zest lightens the whole thing up. This butter would also be an excellent topping for fish or chicken. |:| Preheat the oven to 350 degrees F. Place the shallot on a square of foil, drizzle lightly with olive oil, and season with salt and pepper. Fold up the foil into a little packet, and place in the oven for 1 hour. Let cool completely. Pulse the roasted shallot and remaining ingredients in a food processor until combined but still coarse. Scrape the butter onto a piece of plastic wrap, spread it across lengthwise, and roll into a log. Twist the ends to seal. Place in the fridge to firm up for at least 35 minutes before serving. |:| When you're grilling such a thick piece of meat, it's best to cook at a high temperature, to sear the outside nicely, then move to the cooler side of the grill, to give the inside of the steak a moment to catch up. This is especially important if you like your steaks the way Pat does, more on the medium side than medium rare.", "Char-Grilled Rib Eye with Roasted Shallot and Herb Butter" }
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 12, "breakfast" },
                    { 13, "dairy" },
                    { 14, "soup" },
                    { 15, "Mexican" },
                    { 16, "Weight Watchers" },
                    { 17, "Kid Friendly Fun" },
                    { 18, "contains apple" },
                    { 19, "sauce" },
                    { 20, "steak" }
                });

            migrationBuilder.InsertData(
                table: "RecipeTags",
                columns: new[] { "Id", "RecipeId", "TagId" },
                values: new object[,]
                {
                    { 17, 6, 1 },
                    { 18, 7, 1 },
                    { 20, 8, 9 },
                    { 22, 9, 9 },
                    { 13, 4, 12 },
                    { 14, 5, 14 },
                    { 21, 8, 14 },
                    { 15, 5, 15 },
                    { 16, 6, 17 },
                    { 19, 7, 18 },
                    { 23, 10, 20 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "RecipeTags",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "RecipeTags",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "RecipeTags",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "RecipeTags",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "RecipeTags",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "RecipeTags",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "RecipeTags",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "RecipeTags",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "RecipeTags",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "RecipeTags",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "RecipeTags",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 20);
        }
    }
}
