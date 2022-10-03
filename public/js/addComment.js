const AddComment = async (event) => {
  event.preventDefault();
  const new_c_body_text = document.querySelector("#comment-input").value.trim();
  const id = event.target.getAttribute("data-id");
  console.log("DID SOMETHING", new_c_body_text, id);
  // const new_c_body_text = document.getElementById('#comment-input').innerHTML;

  if (new_c_body_text) {
    const response = await fetch(`/api/comment`, {
      method: "POST",
      body: JSON.stringify({ new_c_body_text, id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert("Failed to create comment");
    }
  }
};

document.querySelector(".new-comment-form").addEventListener("submit", AddComment);



const editArea = document.getElementById("addingComment");
const normalArea = document.getElementById("justTheButton");
editArea.style.display = "none";

const WritingComment = async (event) => {
  normalArea.style.display = "none";
  editArea.style.display = "block";;
};

var startWritingButton = document.querySelector("#start-writing-comment");

if (startWritingButton) {
  startWritingButton.addEventListener("click", WritingComment);
}