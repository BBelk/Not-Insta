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
      alert('Failed to delete posts');
    }
  }
};
document.querySelector('#delete-comment').addEventListener('click', DeleteComment);