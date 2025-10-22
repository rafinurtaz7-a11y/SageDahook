
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the documents page
        page.goto("http://localhost:9002/documents")

        # Upload a file
        with page.expect_file_chooser() as fc_info:
            page.get_by_text("click to browse").click()
        file_chooser = fc_info.value
        file_chooser.set_files("README.md")

        # Click the upload button
        page.get_by_role("button", name="Upload").click()

        # Wait for the success toast to be visible
        expect(page.get_by_text("Successfully uploaded document.")).to_be_visible(timeout=10000)

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run_verification()
