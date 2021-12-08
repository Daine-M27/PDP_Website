



//----------------------------- initial choice loaded on page load -----------------------------//
window.onload = async () => { 

  try {
    await $.get("/choices/firstChoice", (data) => {      
      console.log('quote js')
    });
  } catch (error) {
    // need to add client output message
    console.log(error)
  }
};