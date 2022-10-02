const DeleteComment = async (event) =>{
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const postId = event.target.getAttribute('post-id');
    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert('Failed to delete comment');
    }
  }
};
document.querySelector('#delete-comment').addEventListener('click', DeleteComment);

///
// body_text: req.body.new_c_body_text,
//       user_id: req.session.user_id,
//       post_id: req.body.id
const editArea = document.getElementById('editingComment');
const normalArea = document.getElementById('normalComment');
editArea.style.display = 'none';

const EditComment = async (event) =>{
  normalArea.style.display = 'none';
  editArea.style.display = 'block';
  document.querySelector('#comment-input').value = document.querySelector('#actualComment').innerHTML;
  // document.getElementById("nameofid").value = "My value";
};

document.querySelector('#edit-comment').addEventListener('click', EditComment);

const ActuallyEditComment = async (event) =>{
if (event.target.hasAttribute('data-id')) {
  const id = event.target.getAttribute('data-id');
  const postId = event.target.getAttribute('post-id');
  const new_c_body_text = document.querySelector('#comment-input').value;
  const response = await fetch(`/api/comment/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ new_c_body_text, id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    // document.location.replace(`/post/${postId}`);
      normalArea.style.display = 'block';
      editArea.style.display = 'none';
      document.querySelector('#actualComment').innerHTML = document.querySelector('#comment-input').value;
  } else {
    alert('Failed to edit comment');
  }
}
};

document.querySelector('#finish-comment').addEventListener('click', ActuallyEditComment);