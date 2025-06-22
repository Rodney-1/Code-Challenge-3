const origUrl = "https://localhost:3000/posts";

const form = document.getElementById("new-post-form");
const postsList = document.getElementById("posts");

// Function to fetch and display posts
function displayPosts() {
    fetch(origUrl)
        .then(response => response.json())
        .then(posts => {
            postsList.innerHTML = ""; // Clear existing posts
            posts.forEach(post => {
                const postTitle = document.createElement("li");
                postTitle.textContent = post.title;

                // Add click event to each post title
                postTitle.addEventListener("click", () => {
                    showPostDetails(post);
                });
                postsList.appendChild(postTitle);
            });
        });
}
// Function to show post details
function showPostDetails(post) {
    postDetails.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
}

// Function to add new post
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents from refreshing the page
    const newPost = {
        title: document.getElementById("post-title").value,
        content: document.getElementById("post-content").value
    };

    fetch(origUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    })
    .then(response => response.json())
    .then(() => {
        displayPosts(); // Refresh the posts list
        form.reset(); // Reset the form
    });
});

// Call displayPosts on page load
document.addEventListener("DOMContentLoaded", () => {
    displayPosts();
});
