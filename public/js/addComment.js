

const AddComment = async (event) => {
  const new_c_body_text = document.querySelector('#comment-input').value;
  console.log("DID SOMETHING", new_c_body_text);
  const id = event.target.getAttribute('data-id');
  // const new_c_body_text = document.getElementById('#comment-input').innerHTML;
  
  if (new_c_body_text) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ new_c_body_text, id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert('Failed to create comment');
    }
  }
  };
  
  document.querySelector('#add-comment').addEventListener('click', AddComment);