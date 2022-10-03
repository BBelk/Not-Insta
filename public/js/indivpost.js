const DeletePost = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete posts");
    }
  }
};
var el = document.querySelector("#delete-post");
if (el) {
  el.addEventListener("click", DeletePost);
}

const DeleteComment = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const postId = event.target.getAttribute("post-id");
    const response = await fetch(`/api/comment/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert("Failed to delete comment");
    }
  }
};
var dl = document.querySelectorAll("#delete-comment");
dl.forEach(function (newDl) {
  newDl.addEventListener("click", DeleteComment);
});

///

const editArea = document.getElementById("editingPost");
const normalArea = document.getElementById("normalPost");
editArea.style.display = "none";

const EditPost = async (event) => {
  normalArea.style.display = "none";
  editArea.style.display = "block";
  document.querySelector("#post-input").value =
    document.querySelector("#actualPost").innerHTML;
  // document.getElementById("nameofid").value = "My value";
};
var editButton = document.querySelector("#edit-post");

if (editButton) {
  editButton.addEventListener("click", EditPost);
}

const ActuallyEditPost = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    // const postId = event.target.getAttribute('post-id');
    const new_body_text = document.querySelector("#post-input").value;
    const response = await fetch(`/api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({ new_body_text }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("HERE IT IS -------------------", new_body_text);

    if (response.ok) {
      // document.location.replace(`/post/${postId}`);
      normalArea.style.display = "block";
      editArea.style.display = "none";
      document.querySelector("#actualPost").innerHTML =
        document.querySelector("#post-input").value;
    } else {
      alert("Failed to edit post");
    }
  }
};

var finishButton = document.querySelector("#finish-post");
if (finishButton) {
  finishButton.addEventListener("click", ActuallyEditPost);
}
