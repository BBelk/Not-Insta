const imageUploadEl = document.querySelector('#image');
const captionEl = document.querySelector('#body-post');
// still in progress
// const uploadFormHandler = async (event) => {
//   event.preventDefault();
//   const 
// }

imageUploadEl.addEventListener('change', async (event) => {
  const newCaption = captionEl.value;
  if(newCaption === ""){
    alert("Please input a caption");
    return;
  }
  const file = event.target.files[0];
  if(file.size > 10000000){
    alert("File too large, limit 10mb");
    return;
  }
  const formData = new FormData();
  const config = { withCredentials: true };
  formData.append('file', file);
  const item = await axios.post(`/api/upload/${newCaption}`, formData, config);
  if (item) {
    let newId = item.data.id;
    // will need this in form submit
    window.location.replace(`/post/${newId}`);
  }
});