// const imageUploadEl = document.querySelector('#image');
// const captionEl = document.querySelector('#body-post');
const imageUploadEl = document.querySelector('#toUploadImage');
if(imageUploadEl) {
  imageUploadEl.addEventListener('change', async (event) => {
    const userId = document.querySelector('#userIdStorage').innerHTML;
    console.log("HELLO WORLD", userId);
    // return;
    const file = event.target.files[0];
    if(file.size > 10000000){
      alert("File too large, limit 10mb");
      return;
    }
    const formData = new FormData();
    const config = { withCredentials: true };
    formData.append('file', file);
    const item = await axios.post(`/api/upload/p/${userId}`, formData, config);
    if (item) {
      // let newId = item.data.id;
      // console.log("HERES THE ITEM", item);
      window.location.replace(`/profile`);
    }
  });
}


// const ProfilePicUpload = async (event) =>{
//   const userId = document.querySelector('#userIdStorage').innerHTML;
//   console.log("HELLO WORLD", userId);
//   // return;
//   // const newCaption = captionEl.value;
//   const file = event.target.files[0];
//   if(file.size > 10000000){
//     alert("File too large, limit 10mb");
//     return;
//   }
//   const formData = new FormData();
//   const config = { withCredentials: true };
//   formData.append('file', file);
//   const item = await axios.post(`/api/upload/p/${newCaption}`, formData, config);
//   if (item) {
//     // let newId = item.data.id;
//     window.location.replace(`/profile`);
//   }
// };

// var el = document.querySelector('#uploadClicker'); 
// if(el){
// el.addEventListener('click', ProfilePicUpload);
// }