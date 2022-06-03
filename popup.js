// Initialize button with user's preferred color

let runOnScite = document.getElementById("ThisScite");

let c_url = "none";

chrome.storage.sync.get("current_url", ({ current_url }) => {
  runOnScite.innerText = current_url;
  c_url = current_url;
  chrome.storage.sync.get("allowed_url", ({ allowed_url }) => {
    console.log("ransssss0");
    if (allowed_url[c_url] == 1) {
      runOnScite.style.background = "chartreuse";
    }
    else {
      runOnScite.style.background = "white";
    }
  });
});



runOnScite.addEventListener("click", async () => {
  if (c_url === "invalid url") {
    return;
  }
  chrome.storage.sync.get("allowed_url", ({ allowed_url }) => {
    if (allowed_url[c_url] != 1) {
      allowed_url[c_url] = 1;
      runOnScite.style.background = "chartreuse";
    }
    else {
      allowed_url[c_url] = 0;
      runOnScite.style.background = "white";
    }
    
    chrome.storage.sync.set({allowed_url});
    //console.log(allowed_url);
  });
});