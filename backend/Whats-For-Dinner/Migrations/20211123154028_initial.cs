using Microsoft.EntityFrameworkCore.Migrations;

namespace Whats_For_Dinner.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Instructions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RecipeTags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecipeId = table.Column<int>(type: "int", nullable: false),
                    TagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecipeTags_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RecipeTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "Description", "Instructions", "Name" },
                values: new object[,]
                {
                    { 1, "What an easy way to transform a simple peach that can then be used in all types of dishes to bring interest and flavor.", "1. Heat a grill to medium-high. 2. Brush a very light layer of olive oil on each side of the cut side of each peach half. 3. Put the peaches face down on the grill and brush the skin side with olive oil. 4. Grill peaches 4 to 5 minutes, undisturbed, until there are distinct grill marks on the peaches. 5. Flip the peaches and allow then to grill on the skin side until they are charred, warmed through and tender, but not mushy.  4 - 5 minutes.", "Grilled Peaches with Balsamic Vinegar" },
                    { 2, "Our vanilla balsamic chicken uses rich vanilla balsamic vinegar and a touch of orange juice to create the traditional sweet and sour flavor combo that is so wonderful on chicken.", "1. Preheat oven to 450*. 2. Combine the vinegar, chicken broth, shallot, orange zest, and juice, and simmer until mixture is reduced to half a cup (about 20 minutes). Add half a teaspoon of salt and set aside. 3. While the sauce is reducing, combine half a teaspoon salt and pepper in a small bowl. Season chicken on all sides, and set aside in a single layer in a roasting pan that has been coated with the olive oil. 4. Bake in preheated oven for 10 minutes. 5. Brush half of the reduced broth mixture over chicken. Bake 5 minutes more, then brush on the remaining broth mixture. 6. Bake approximately 15 more minutes, or until internal temperature reaches at least 165*. 7. Serve over noodles, rice, or quinoa.", "Vanilla Balsamic Chicken" },
                    { 3, "Spicy olive oil & Italian sausage pair with sweet balsamic vinegar & squash for a filling meal or a hearty side dish. The combination of nutty, sweet and spicy, makes this recipe irresistible.", "1. Preheat oven to 375°. 2. Optional step to make cutting the squash easier: using a fork, poke each squash 5 - 6 times so steam can escape.Put in microwave on high for 2 minutes.Remove carefully and let cool a couple of minutes. 3. Halve the squash down the middle, and remove the seeds.Cut a thin slice off the round bottom side of each squash half to create a stable base for when filling and broiling the squash.Score the inside of the squash with a sharp knife and brush each half with 1 / 2 tablespoon of oil and 1 / 2 tablespoon of vinegar.Allow to sit upright for 5 minutes for the oil and vinegar to penetrate the scoring.Sprinkle squash with salt and pepper. 4. Coat a foil - lined baking sheet with cooking spray, place squash flesh side down and bake until golden and tender, 30 - 40 minutes. Remove from oven; flip squash and set aside. 5. While the squash is cooking: Heat 1 tablespoon olive oil in a large nonstick skillet over medium heat. Cook the sausage through, breaking into pieces(about 6 minutes), and transfer to a paper towel-lined dish to drain. 6. Add final tablespoon of olive oil to the same pan and cook the onions until soft, about 3 minutes.Add the garlic and cook until fragrant, about 30 seconds.Add kale and combine. Add the chicken stock and 1 tablespoon balsamic vinegar.Cook until kale is tender, about 5 minutes, Stir in sausage and remove from heat. 7. When the filling is cooked and the squash is done roasting, divide the filling between the squash \"bowls.\" 8. Combine the nuts, Parmesan, panko breadcrumbs, and the nut oil of choice in a small bowl.Sprinkle evenly over squash. 9. Place in oven and roast 5 minutes. 10. Leave squash in the oven and turn oven to broil, and broil the squash an additional 2 - 3 minutes until the topping is golden brown, about 2 minutes. 11. Let cool 5 minutes and drizzle remaining Black Currant Balsamic Vinegar over the finished squash before serving. If serving 4, cut each half into half again at the table.", "Hearty Stuffed Autumn Squash" }
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "dessert" },
                    { 2, "fruit" },
                    { 3, "grill" },
                    { 4, "vegan" },
                    { 5, "entree" },
                    { 6, "chicken" },
                    { 7, "sweet and sour" },
                    { 8, "beef" },
                    { 9, "vegetable" },
                    { 10, "spicy" },
                    { 11, "Italian" }
                });

            migrationBuilder.InsertData(
                table: "RecipeTags",
                columns: new[] { "Id", "RecipeId", "TagId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 1, 2 },
                    { 3, 1, 3 },
                    { 4, 1, 4 },
                    { 5, 2, 5 },
                    { 8, 3, 5 },
                    { 6, 2, 6 },
                    { 7, 2, 7 },
                    { 9, 3, 8 },
                    { 10, 3, 9 },
                    { 11, 3, 10 },
                    { 12, 3, 11 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_RecipeTags_RecipeId",
                table: "RecipeTags",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeTags_TagId",
                table: "RecipeTags",
                column: "TagId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RecipeTags");

            migrationBuilder.DropTable(
                name: "Recipes");

            migrationBuilder.DropTable(
                name: "Tags");
        }
    }
}
