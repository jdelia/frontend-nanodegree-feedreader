/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
       */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length > 0).toBe(true);
      });

      /* Loop through each feed in the allFeeds object and ensure
       * it has a URL defined and that the URL is not empty.
       */
      it("urls are defined and not empty", function() {
        for (let feed of allFeeds) {
          expect(feed.url).toBeDefined();
          expect(feed.url.length > 0).toBe(true);
        }
      });

      /* Loop through each feed in the allFeeds object and ensure
       * name is defined and that the name is not empty.
       */

      it("names are defined and not empty", function() {
        for (let feed of allFeeds) {
          expect(feed.name).toBeDefined();
          expect(feed.name.length > 0).toBe(true);
        }
      });
    });

    describe("The menu", function() {
      /* Test that the menu element is hidden by default. */
      it("menu hidden by default", function() {
        const body = document.querySelector("body");
        // we are expecting to find the menu-hidden class on the body element.
        expect(body.classList.contains("menu-hidden")).toBe(true);
      });

      /* Test that the menu changes visibility when the menu icon is clicked.
       * Test that menu is visible when clicked and hidden when clicked again.
       */

      it("menu toggles on/off when clicked", function() {
        const body = document.querySelector("body");
        const menu = document.querySelector(".menu-icon-link");
        // perform a menu click
        menu.click();
        expect(body.classList.contains("menu-hidden")).toBe(false);
        // perform a menu click
        menu.click();
        expect(body.classList.contains("menu-hidden")).toBe(true);
      });
    });

    describe("Initial Entries", function() {
      /* Test that ensures when the loadFeed function is called
       * and completes its work, there is at least
       * a single .entry element within the .feed container.
       */

      // passing done to beforeEach to signal it has finished before proceeding with the test

      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it("work completed", function() {
        // get feed container
        const feedEntries = document.querySelectorAll(".feed .entry");
        // check length - it should be greater than 0
        expect(feedEntries.length > 0).toBe(true);
      });
    });

    describe("New Feed Selection", function() {
      /* Test when a new feed is loaded by the loadFeed function
       * that the content actually changes.
       */
      let feedAfterFirstLoad;
      let feedAfterSecondLoad;

      const feedContainer = document.querySelector(".feed");

      beforeEach(function(done) {
        // First load initial feed
        loadFeed(0, function() {
          // Store the innerHTML of feedContainer
          feedAfterFirstLoad = feedContainer.innerHTML;
          loadFeed(1, function() {
            // Store the innerHTML of feedContainer
            feedAfterSecondLoad = feedContainer.innerHTML;
            done();
          });
        });
      });

      it("the content changes", function() {
        // compare the contents of two feeds we created in beforeEach - they should be equal.
        expect(feedAfterFirstLoad).not.toEqual(feedAfterSecondLoad);
      });
    });
  })()
);
