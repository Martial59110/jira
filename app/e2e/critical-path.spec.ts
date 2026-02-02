import { test, expect } from "@playwright/test";

test.describe("Parcours critique du board", () => {
  test("peut créer un ticket et le déplacer vers En cours", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("textbox", { name: "Email" }).fill("marti@example.com");
    await page.getByRole("textbox", { name: "Mot de passe" }).fill("admin123");
    await page.getByRole("button", { name: "Se connecter" }).click();
    await expect(page.getByRole("heading", { name: "Tableau de bord" })).toBeVisible({
      timeout: 15000,
    });

    await page.getByRole("link", { name: "Board", exact: true }).click();
    await expect(page.getByRole("button", { name: "Nouveau ticket" })).toBeVisible({
      timeout: 15000,
    });

    await page.getByRole("button", { name: "Nouveau ticket" }).click();

    const ticketTitle = `Ticket DnD ${Date.now()}`;
    await page.getByRole("textbox", { name: "Titre" }).fill(ticketTitle);
    await page.getByRole("textbox", { name: "Assigné" }).fill("TestUser");
    await page.getByRole("button", { name: "Créer un ticket" }).click();

    await expect(page.getByText(ticketTitle)).toBeVisible({ timeout: 10000 });

    const ticket = page.getByText(ticketTitle);
    const targetColumn = page.locator("article").nth(1);

    const ticketBox = await ticket.boundingBox();
    const targetBox = await targetColumn.boundingBox();

    if (ticketBox && targetBox) {
      const startX = ticketBox.x + ticketBox.width / 2;
      const startY = ticketBox.y + ticketBox.height / 2;
      const endX = targetBox.x + targetBox.width / 2;
      const endY = targetBox.y + 100;

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(endX, endY, { steps: 20 });
      await page.mouse.up();
    }

    await page.waitForTimeout(2000);

    await expect(page.getByText(ticketTitle)).toBeVisible();
  });
});
