
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the documents page
        page.goto("http://localhost:9002/documents")

        # Click the test button
        page.get_by_role("button", name="Test Embed").click()

        # Wait for the page to reload
        page.wait_for_load_state("networkidle")

        browser.close()

if __name__ == "__main__":
    run_verification()
